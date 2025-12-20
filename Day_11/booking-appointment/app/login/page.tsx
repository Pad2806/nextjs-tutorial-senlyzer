"use client";

import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export default function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8 text-center space-y-6">
        <h1 className="text-2xl font-semibold text-slate-900">Đăng nhập</h1>

        <p className="text-sm text-slate-500">
          Đăng nhập để đặt lịch nhanh hơn
        </p>

        <button
          onClick={() => signIn("google")}
          className="w-full flex items-center justify-center gap-3 border border-slate-200 rounded-xl py-3 hover:bg-slate-50 transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            className="w-5 h-5"
          />
          <span className="text-sm font-medium text-slate-700">
            Đăng nhập với Google
          </span>
        </button>
      </div>
    </main>
  );
}
