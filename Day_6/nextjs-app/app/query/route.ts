import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

async function listUsers() {
  const data = await sql`
    SELECT id, name, email
    FROM users
    `;
  return data;
}
export async function GET() {
  try {
    return Response.json(await listUsers());
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
