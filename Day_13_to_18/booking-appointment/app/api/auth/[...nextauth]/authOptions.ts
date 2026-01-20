// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import type { NextAuthOptions } from "next-auth";
// import { supabaseAdmin } from "@/app/lib/supabase/admin";

// export const authOptions: NextAuthOptions = {
//   session: { strategy: "jwt" },

//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//   ],

//   callbacks: {
//     async signIn({ user, account, profile }) {
//       if (!user.email || account?.provider !== "google") return false;

//       const providerId = profile?.sub;
//       if (!providerId) return false;

//       const { error } = await supabaseAdmin.from("users").upsert(
//         {
//           name: user.name,
//           email: user.email,
//           provider: "google",
//           provider_id: providerId,
//           avatar_url: user.image,
//           is_active: true,
//         },
//         { onConflict: "provider,provider_id" }
//       );

//       if (error) {
//         console.error("Supabase signIn error:", error);
//         return false;
//       }

//       return true;
//     },

//     async jwt({ token, user }) {
//       if (user?.email && !token.userId) {
//         const { data, error } = await supabaseAdmin
//           .from("users")
//           .select("id, role")
//           .eq("email", user.email)
//           .single();

//         if (error || !data) {
//           console.error("JWT callback error:", error);
//           return token;
//         }

//         token.userId = data.id;
//         token.role = data.role;
//       }

//       return token;
//     },

//     async session({ session, token }) {
//       if (session.user) {
//         session.user.id = token.userId as string;
//         session.user.role = token.role as
//           | "admin"
//           | "clinic_admin"
//           | "staff"
//           | "patient";
//       }
//       return session;
//     },
//   },
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };


import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";
import { supabaseAdmin } from "@/app/lib/supabase/admin";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    /* ======================
       SIGN IN
    ====================== */
    async signIn({ user, account, profile }) {
      if (!user.email || account?.provider !== "google") return false;

      const providerId = profile?.sub;
      if (!providerId) return false;

      const { error } = await supabaseAdmin.from("users").upsert(
        {
          name: user.name,
          email: user.email,
          provider: "google",
          provider_id: providerId,
          avatar_url: user.image,
          is_active: true,
        },
        { onConflict: "provider,provider_id" }
      );

      if (error) {
        console.error("Supabase signIn error:", error);
        return false;
      }

      return true;
    },

    /* ======================
       JWT
    ====================== */
    async jwt({ token, user }) {
      if (user?.email && !token.userId) {
        const { data, error } = await supabaseAdmin
          .from("users")
          .select("id, role")
          .eq("email", user.email)
          .single();

        if (error || !data) {
          console.error("JWT callback error:", error);
          return token;
        }

        token.userId = data.id;
        token.role = data.role; // admin | patient | ...
      }

      return token;
    },

    /* ======================
       SESSION
    ====================== */
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.userId as string;
        session.user.role = token.role as
          | "admin"
          | "clinic_admin"
          | "staff"
          | "patient";
      }
      return session;
    },
  },
};

