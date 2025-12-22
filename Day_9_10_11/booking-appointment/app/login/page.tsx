"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);
  const handleGoogleLogin = async () => {
    setIsLoading(true);
    await signIn("google");
  };
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 px-4 relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-40" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-200 rounded-full blur-3xl opacity-40" />

      <div className="relative w-full max-w-lg">
        <div className="bg-white rounded-3xl shadow-xl p-10 text-center space-y-8">
          <div className="space-y-3">
            <div className="mx-auto w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">
              <ShieldCheck className="w-7 h-7 text-blue-600" />
            </div>

            <h1 className="text-3xl font-bold text-slate-900">Đăng nhập</h1>

            <p className="text-slate-600">
              Đăng nhập để đặt lịch khám nhanh chóng và an tâm hơn
            </p>
          </div>

          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-4 border border-slate-200 rounded-xl py-4
             transition-all font-medium text-slate-700 shadow-sm
             hover:bg-slate-50 hover:shadow-md
             disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <span className="w-5 h-5 border-2 border-slate-300 border-t-blue-600 rounded-full animate-spin" />
                <span>Đang chuyển hướng...</span>
              </>
            ) : (
              <>
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="w-5 h-5"
                />
                <span>Đăng nhập với Google</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-4 text-slate-400 text-xs">
            <div className="flex-1 h-px bg-slate-200" />
            <span>An toàn & bảo mật</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          <p className="text-xs text-slate-500 leading-relaxed">
            Chúng tôi chỉ sử dụng thông tin cơ bản từ Google để xác thực tài
            khoản. Dữ liệu của bạn được bảo mật theo tiêu chuẩn quốc tế.
          </p>
        </div>
      </div>
    </main>
  );
}
