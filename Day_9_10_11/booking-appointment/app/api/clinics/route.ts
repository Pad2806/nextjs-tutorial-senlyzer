import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

async function listClinics() {
  const clinics = await sql`
    SELECT id, name FROM clinics ORDER BY name
  `;
  return clinics;
}
export async function GET() {
  try {
    return Response.json(await listClinics());
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}