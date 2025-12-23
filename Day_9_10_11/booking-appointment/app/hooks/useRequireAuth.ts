"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

type RequireAuthOptions = {
  redirectTo?: string;
  roles?: string[];
};

export function useRequireAuth(
  options?: RequireAuthOptions | string
) {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Backward compatible
  const redirectTo =
    typeof options === "string"
      ? options
      : options?.redirectTo ?? "/login";

  const allowedRoles =
    typeof options === "object" ? options.roles : undefined;

  useEffect(() => {
    if (status === "loading") return;

    // Chưa đăng nhập
    if (status === "unauthenticated") {
      router.push(`${redirectTo}?next=${location.pathname}`);
      return;
    }

    // Có yêu cầu role nhưng user không đủ quyền
    if (
      allowedRoles &&
      session?.user?.role &&
      !allowedRoles.includes(session.user.role)
    ) {
      router.push("/403");
    }
  }, [status, session, allowedRoles, router, redirectTo]);

  return {
    isLoading: status === "loading",
    isAuthenticated: status === "authenticated",
    user: session?.user as {
      id: string;
      role: string;
      clinic_id?: string;
      name?: string;
      email?: string;
    } | null,
  };
}
