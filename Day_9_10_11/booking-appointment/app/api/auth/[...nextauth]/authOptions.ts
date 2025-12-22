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
  // callbacks: {
  // async signIn({ user }) {
  //   try {
  //     if (!user.email) return false;

  //     const existing = await sql`
  //       SELECT id FROM users WHERE email = ${user.email}
  //     `;

  //     if (existing.length === 0) {
  //       await sql`
  //         INSERT INTO users (name, email, password, phone)
  //         VALUES (${user.name ?? ""}, ${user.email}, 'google', NULL)
  //       `;
  //     }

  //     return true;
  //   } catch (error) {
  //     console.error("SIGNIN CALLBACK ERROR:", error);
  //     return false;
  //   }
  // },
  callbacks: {
  async signIn({ user, account, profile }) {
    try {
      if (!user.email || !account) return false;

      // Chỉ xử lý Google OAuth
      if (account.provider === "google") {
        const providerId = profile?.sub as string;

        if (!providerId) return false;

        await sql`
          INSERT INTO users (name, email, provider, provider_id)
          VALUES (
            ${user.name ?? ""},
            ${user.email},
            'google',
            ${providerId}
          )
          ON CONFLICT (provider, provider_id) DO NOTHING
        `;
      }

      return true;
    } catch (error) {
      console.error("SIGNIN CALLBACK ERROR:", error);
      return false;
    }
  },
},


};
