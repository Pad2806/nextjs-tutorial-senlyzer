// import GoogleProvider from "next-auth/providers/google";
// import type { NextAuthOptions } from "next-auth";
// import { supabaseAdmin } from "@/app/lib/supabase/admin";

// export const authOptions: NextAuthOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//   ],

//   callbacks: {
//     async signIn({ user, account, profile }) {
//       try {
//         if (!user.email || !account || account.provider !== "google") {
//           return false;
//         }

//         const providerId = profile?.sub;
//         if (!providerId) return false;

//         const { error } = await supabaseAdmin
//           .from("users")
//           .upsert(
//             {
//               name: user.name,
//               email: user.email,
//               provider: "google",
//               provider_id: providerId,
//               avatar_url: user.image,
//               is_active: true,
//             },
//             {
//               onConflict: "provider,provider_id",
//             }
//           );

//         if (error) {
//           console.error("Supabase signIn error:", error);
//           return false;
//         }

//         return true;
//       } catch (err) {
//         console.error("SIGNIN CALLBACK ERROR:", err);
//         return false;
//       }
//     },
//   },
// };

import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";
import { supabaseAdmin } from "@/app/lib/supabase/admin";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },

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

      const { error } = await supabaseAdmin
        .from("users")
        .upsert(
          {
            name: user.name,
            email: user.email,
            provider: "google",
            provider_id: providerId,
            avatar_url: user.image,
            is_active: true,
          },
          {
            onConflict: "provider,provider_id",
          }
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
      // Lần đầu login
      if (user?.email) {
        const { data } = await supabaseAdmin
          .from("users")
          .select("id")
          .eq("email", user.email)
          .single();

        if (data?.id) {
          token.userId = data.id;
        }
      }

      return token;
    },

    /* ======================
       SESSION
    ====================== */
    async session({ session, token }) {
      if (session.user && token.userId) {
        session.user.id = token.userId as string;
      }
      return session;
    },
  },
};
