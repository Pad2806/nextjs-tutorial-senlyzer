"use server";
import { date, z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import postgres from "postgres";
import bcrypt from "bcryptjs";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

const FormSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string().email(),
  image_url: z.string().nullable(),
  password: z.string().min(8).nullable(),
  status: z.enum(["pending", "active"]),
  date: z.string().optional(),
});
const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ id: true, date: true });
export async function createUser(formData: FormData) {
  const { name, email, password, status } = CreateInvoice.parse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    status: formData.get("status"),
    image_url: null,
  });

  if (!password) {
    throw new Error("Password is required");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const date = new Date().toISOString().split("T")[0];

  let image_url: string | null = null;
  const file = formData.get("image") as File | null;

  if (file && file.size > 0) {
    if (!file.type.startsWith("image/")) {
      throw new Error("Invalid image file");
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const uploadDir = path.join(process.cwd(), "public/uploads");
    await fs.mkdir(uploadDir, { recursive: true });

    const fileName = `${crypto.randomUUID()}-${file.name}`;
    await fs.writeFile(path.join(uploadDir, fileName), buffer);
    image_url = `/uploads/${fileName}`;
  }

  await sql`
    INSERT INTO users (name, email, password, image_url, status, date)
    VALUES (${name}, ${email}, ${hashedPassword}, ${image_url}, ${status}, ${date})
  `;

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
}

export async function updateUser(id: string, formData: FormData) {
  const { name, email, password, status } = UpdateInvoice.parse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password") || null,
    status: formData.get("status"),
    image_url: null,
  });

  let hashedPassword: string | null = null;

  if (password !== null) {
    hashedPassword = await bcrypt.hash(password, 10);
  }
  let image_url: string | null = null;
  const file = formData.get("image") as File | null;

  if (file && file.size > 0) {
    if (!file.type.startsWith("image/")) {
      throw new Error("Invalid image file");
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const uploadDir = path.join(process.cwd(), "public/uploads");
    await fs.mkdir(uploadDir, { recursive: true });

    const fileName = `${crypto.randomUUID()}-${file.name}`;
    await fs.writeFile(path.join(uploadDir, fileName), buffer);

    image_url = `/uploads/${fileName}`;
  }
  await sql`
    UPDATE users
    SET
      name = ${name},
      email = ${email},
      password = COALESCE(${hashedPassword}, password),
      image_url = COALESCE(${image_url}, image_url),
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
