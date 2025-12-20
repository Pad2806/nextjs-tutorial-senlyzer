import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;

      const existing = await sql`SELECT id FROM users WHERE email = ${user.email}`;

      if (existing.length === 0) {
        await sql`
          INSERT INTO users (name, email, password, phone)
          VALUES (${user.name ?? ""}, ${user.email}, 'google', 'google')
        `;
      }

      return true;
    },
  },
};
