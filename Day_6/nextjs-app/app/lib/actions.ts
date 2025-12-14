"use server";
import { date, z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import postgres from "postgres";
import bcrypt from "bcryptjs";
const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

const FormSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8).nullable(),
  status: z.enum(["pending", "active"]),
  date: z.string().optional(),
});
const CreateUser = FormSchema.omit({ id: true, date: true });
const UpdateUser = FormSchema.omit({ id: true, date: true });
export async function createUser(formData: FormData) {
  const { name, email, password, status } = CreateUser.parse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    status: formData.get("status"),
  });

  if (!password) {
    throw new Error("Password is required");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const date = new Date().toISOString().split("T")[0];

  await sql`
    INSERT INTO users (name, email, password, status, date)
    VALUES (${name}, ${email}, ${hashedPassword}, ${status}, ${date})
  `;

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
}

export async function updateUser(id: string, formData: FormData) {
  const { name, email, password, status } = UpdateUser.parse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password") || null,
    status: formData.get("status"),
  });

  let hashedPassword: string | null = null;

  if (password !== null) {
    hashedPassword = await bcrypt.hash(password, 10);
  }

  await sql`
    UPDATE users
    SET
      name = ${name},
      email = ${email},
      password = COALESCE(${hashedPassword}, password),
      status = ${status}
    WHERE id = ${id}
  `;

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
}

export async function deleteUser(id: string) {
  await sql`DELETE FROM users WHERE id = ${id}`;
  revalidatePath("/dashboard/users");
}
