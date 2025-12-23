"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export function useRequireAuth(redirectTo: string) {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push(`/login?next=${redirectTo}`);
    }
  }, [status, router, redirectTo]);

  return {
    isLoading: status === "loading",
    isAuthenticated: status === "authenticated",
  };
}
