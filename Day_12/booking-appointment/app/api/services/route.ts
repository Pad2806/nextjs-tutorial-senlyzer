import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

async function listServices() {
  const services = await sql`
    SELECT id, name FROM services ORDER BY name
  `;
  return services;
}
export async function GET() {
  try {
    return Response.json(await listServices());
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}