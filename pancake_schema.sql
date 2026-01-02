-- Enable UUID extension for generating unique IDs
create extension if not exists "uuid-ossp";

-- 1. Shops / Pages
-- Stores information about the store or social page connected to Pancake
create table public.shops (
    id bigint primary key, -- Pancake Shop ID
    name text not null,
    avatar_url text,
    inserted_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Customers
-- Represents customers synced from Pancake
create table public.customers (
    id uuid primary key default uuid_generate_v4(), -- Our internal ID, Pancake uses separate IDs per shop usually, or might map to a social ID
    pancake_customer_id text, -- ID from Pancake (sometimes a string if from FB/Instagram)
    shop_id bigint references public.shops(id) on delete cascade,
    name text,
    gender text,
    phone_numbers jsonb, -- Storing array of phones: ["09123...", "0987..."]
    emails jsonb, -- Storing array of emails
    date_of_birth timestamp with time zone,
    address text,
    city text,
    district text,
    commune text,
    reward_point int default 0,
    level_id text,
    inserted_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);
create index idx_customers_shop_id on public.customers(shop_id);
create index idx_customers_phone on public.customers using gin (phone_numbers);

-- 3. Product Categories
create table public.categories (
    id bigint primary key, -- Pancake Category ID
    shop_id bigint references public.shops(id) on delete cascade,
    name text not null,
    parent_id bigint references public.categories(id),
    inserted_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Products
create table public.products (
    id bigint primary key, -- Pancake Product ID
    shop_id bigint references public.shops(id) on delete cascade,
    category_id bigint references public.categories(id),
    name text not null,
    description text,
    images jsonb, -- Array of image URLs
    inserted_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);
create index idx_products_shop_id on public.products(shop_id);

-- 5. Product Variations
-- Specific versions of a product (e.g., Size M, Red)
create table public.product_variations (
    id bigint primary key, -- Pancake Variation ID
    product_id bigint references public.products(id) on delete cascade,
    display_id text, -- Custom ID/Code used in shop
    name text,
    sku text,
    barcode text,
    price numeric(15, 2) default 0,
    retail_price numeric(15, 2) default 0,
    average_imported_price numeric(15, 2) default 0,
    attributes jsonb, -- e.g. {"Color": "Red", "Size": "M"}
    inserted_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);
create index idx_variations_product_id on public.product_variations(product_id);

-- 6. Orders
create table public.orders (
    id uuid primary key default uuid_generate_v4(),
    pancake_order_id text unique, -- Original ID from Pancake (might be string or big int)
    shop_id bigint references public.shops(id) on delete cascade,
    customer_id uuid references public.customers(id) on delete set null,
    
    -- Status
    status_code int, -- 1: New, 2: Confirmed, etc.
    status_name text, -- "Mới", "Đã xác nhận"
    
    -- Financials
    total_amount numeric(15, 2) default 0,
    subtotal_amount numeric(15, 2) default 0,
    discount_amount numeric(15, 2) default 0,
    shipping_fee numeric(15, 2) default 0,
    cod_amount numeric(15, 2) default 0,
    deposit_amount numeric(15, 2) default 0,
    
    -- Billing/Shipping Info snapshot (in case customer changes)
    shipping_name text,
    shipping_phone text,
    shipping_address text,
    
    -- Meta
    note text,
    warehouse_id bigint,
    inserted_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);
create index idx_orders_shop_id on public.orders(shop_id);
create index idx_orders_customer_id on public.orders(customer_id);

-- 7. Order Items
create table public.order_items (
    id uuid primary key default uuid_generate_v4(),
    order_id uuid references public.orders(id) on delete cascade,
    variation_id bigint references public.product_variations(id) on delete set null,
    product_name text,
    variation_name text,
    quantity int not null,
    price numeric(15, 2) not null,
    discount numeric(15, 2) default 0,
    total_price numeric(15, 2) generated always as (quantity * price - discount) stored,
    inserted_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 8. Customer Notes (Interaction History)
create table public.customer_notes (
    id serial primary key,
    customer_id uuid references public.customers(id) on delete cascade,
    shop_id bigint references public.shops(id) on delete cascade,
    content text,
    images jsonb,
    created_by_name text,
    created_by_id text,
    occurred_at timestamp with time zone default now()
);

-- 9. Tags (Labels)
create table public.tags (
    id serial primary key, -- or Pancake ID
    shop_id bigint references public.shops(id) on delete cascade,
    name text not null,
    color text,
    type text -- 'order' or 'customer' or 'conversation'
);

-- Join table for Order Tags
create table public.order_tags_map (
    order_id uuid references public.orders(id) on delete cascade,
    tag_id int references public.tags(id) on delete cascade,
    primary key (order_id, tag_id)
);

-- Join table for Customer Tags
create table public.customer_tags_map (
    customer_id uuid references public.customers(id) on delete cascade,
    tag_id int references public.tags(id) on delete cascade,
    primary key (customer_id, tag_id)
);

-- RLS Policies (Optional stub - Secure by default if enabled)
alter table public.shops enable row level security;
alter table public.customers enable row level security;
alter table public.orders enable row level security;
-- Add policies as needed for your app's auth logic
