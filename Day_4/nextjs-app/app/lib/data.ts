import postgres from "postgres";
import { User, UserField, UsersTable } from "@/app/lib/definition";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function fetchUser() {
  try {
    const data = await sql<UserField[]>`
      SELECT users.name, users.image_url, users.email, users.status
      FROM users
      ORDER BY name DESC
      LIMIT 5`;

    const users = data.map((user) => ({
      ...user,
    }));
    return users;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch the latest invoices.");
  }
}

export async function fetchCardData() {
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const userCount = sql`SELECT COUNT(*) FROM users`;
    const userActiveCount = sql`SELECT COUNT(*) FROM users where status = 'active'`;
    const userPendingCount = sql`SELECT COUNT(*) FROM users where status = 'pending'`;

    const data = await Promise.all([
      userCount,
      userActiveCount,
      userPendingCount,
    ]);
    const numberOfUsers = Number(data[0][0].count ?? "0");
    const numberOfActiveUsers = Number(data[1][0].count ?? "0");
    const numberOfPendingUsers = Number(data[2][0].count ?? "0");

    return {
      numberOfUsers,
      numberOfActiveUsers,
      numberOfPendingUsers,
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch card data.");
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredUsers(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await sql<UsersTable[]>`
      SELECT
        users.id,
        users.date,
        users.status,
        users.name,
        users.email,
        users.image_url
      FROM users
      WHERE
        users.name ILIKE ${`%${query}%`} OR
        users.email ILIKE ${`%${query}%`} OR
        users.date::text ILIKE ${`%${query}%`} OR
        users.status ILIKE ${`%${query}%`}
      ORDER BY users.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return invoices;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch invoices.");
  }
}

export async function fetchUsersPages(query: string) {
  try {
    const data = await sql`SELECT COUNT(*)
    FROM users
    WHERE
      users.name ILIKE ${`%${query}%`} OR
      users.email ILIKE ${`%${query}%`} OR
      users.date::text ILIKE ${`%${query}%`} OR
      users.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of invoices.");
  }
}
export async function fetchUserById(id: string) {
  try {
    const data = await sql<User[]>`
      SELECT
        users.id,
        users.date,
        users.status,
        users.name,
        users.email,
        users.image_url
      FROM users
      WHERE users.id = ${id};
    `;

    const user = data.map((user) => ({
      ...user,
    }));

    return user[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch invoice.");
  }
}
