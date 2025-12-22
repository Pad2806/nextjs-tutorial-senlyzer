import postgres from "postgres";
import { clinics, services } from "@/app/lib/placeholder-data";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

async function seedAll() {

  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await sql`
    CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone TEXT,
  email TEXT NOT NULL UNIQUE,
  password TEXT,
  provider TEXT NOT NULL DEFAULT 'credentials',
  provider_id TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
  `;
await sql`
  CREATE UNIQUE INDEX IF NOT EXISTS users_provider_unique
  ON users (provider, provider_id)
  WHERE provider_id IS NOT NULL;
`;

  await sql`
    CREATE TABLE IF NOT EXISTS clinics (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name TEXT NOT NULL,
      address TEXT,
      email TEXT NOT NULL UNIQUE,
      phone TEXT NOT NULL UNIQUE,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS services (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name TEXT NOT NULL UNIQUE,
      price INTEGER,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS bookings (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id UUID REFERENCES users(id),
      clinic_id UUID REFERENCES clinics(id),
      service_id UUID REFERENCES services(id),
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT NOT NULL,
      amount INTEGER NOT NULL,
      status TEXT DEFAULT 'pending',
      payment_code TEXT UNIQUE,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS payments (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      booking_id UUID REFERENCES bookings(id) UNIQUE,
      amount INTEGER NOT NULL,
      method TEXT,
      status TEXT DEFAULT 'pending',
      created_at TIMESTAMP DEFAULT NOW()
    );
  `;

  await Promise.all(
    clinics.map((clinic) =>
      sql`
        INSERT INTO clinics (name, address, phone, email)
        VALUES (
          ${clinic.name},
          ${clinic.address},
          ${clinic.phone},
          ${clinic.email}
        )
        ON CONFLICT (email) DO NOTHING;
      `
    )
  );

  await Promise.all(
    services.map((service) =>
      sql`
        INSERT INTO services (name, price)
        VALUES (${service.name}, ${service.price})
        ON CONFLICT (name) DO NOTHING;
      `
    )
  );
}

export async function GET() {
  try {
    if (process.env.NODE_ENV === "production") {
      return Response.json(
        { message: "Seed disabled in production" },
        { status: 403 }
      );
    }

    await seedAll();

    return Response.json({
      message: "Database seeded successfully",
    });
  } catch (error) {
    console.error(error);
    return Response.json({ error }, { status: 500 });
  }
}
