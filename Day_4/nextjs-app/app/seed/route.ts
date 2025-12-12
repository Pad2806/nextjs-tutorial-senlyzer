import bcrypt from "bcryptjs";
import postgres from "postgres";
import { users } from "@/app/lib/placeholder-data";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

async function seedUsers() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      status VARCHAR(255) NOT NULL,
      date DATE NOT NULL,
      image_url TEXT NOT NULL
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return sql`
        INSERT INTO users (id, name, email, password, status, date, image_url)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword}, ${user.status}, ${user.date}, ${user.image_url})
        ON CONFLICT (id) DO NOTHING;
      `;
    })
  );

  return insertedUsers;
}
export async function GET() {
  try {
    const result = await sql.begin((sql) => [seedUsers()]);

    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
