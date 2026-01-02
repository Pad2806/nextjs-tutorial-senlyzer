import { supabase } from "@/app/lib/supabase";

export const getShops = async () => {
    const { data, error } = await supabase.from('shops').select('*');
    if (error) throw error;
    return data;
}

export const getCustomers = async (shopId: number) => {
    const { data, error } = await supabase.from('customers').select('*').eq('shop_id', shopId);
    if (error) throw error;
    return data;
}

export const getOrders = async (shopId: number) => {
    const { data, error } = await supabase.from('orders').select('*, customer:customers(name), items:order_items(*)').eq('shop_id', shopId);
    if (error) throw error;
    return data;
}
