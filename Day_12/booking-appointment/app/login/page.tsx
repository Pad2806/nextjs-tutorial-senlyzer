// "use client";

// import { signIn } from "next-auth/react";
// import { useSession } from "next-auth/react";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// export default function LoginPage() {
//   const { data: session } = useSession();
//   const router = useRouter();

//   useEffect(() => {
//     if (session) {
//       router.push("/");
//     }
//   }, [session, router]);
//   return (
//     <main className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
//       <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8 text-center space-y-6">
//         <h1 className="text-2xl font-semibold text-slate-900">Đăng nhập</h1>

//         <p className="text-sm text-slate-500">
//           Đăng nhập để đặt lịch nhanh hơn
//         </p>

//         <button
//           onClick={() => signIn("google")}
//           className="w-full flex items-center justify-center gap-3 border border-slate-200 rounded-xl py-3 hover:bg-slate-50 transition"
//         >
//           <img
//             src="https://www.svgrepo.com/show/475656/google-color.svg"
//             className="w-5 h-5"
//           />
//           <span className="text-sm font-medium text-slate-700">
//             Đăng nhập với Google
//           </span>
//         </button>
//       </div>
//     </main>
//   );
// }

"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 px-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-40" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-200 rounded-full blur-3xl opacity-40" />

      <div className="relative w-full max-w-lg">
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl p-10 text-center space-y-8">
          {/* Header */}
          <div className="space-y-3">
            <div className="mx-auto w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">
              <ShieldCheck className="w-7 h-7 text-blue-600" />
            </div>

            <h1 className="text-3xl font-bold text-slate-900">Đăng nhập</h1>

            <p className="text-slate-600">
              Đăng nhập để đặt lịch khám nhanh chóng và an tâm hơn
            </p>
          </div>

          {/* Login Button */}
          <button
            onClick={() => signIn("google")}
            disabled={status === "loading"}
            className="w-full flex items-center justify-center gap-4 border border-slate-200 rounded-xl py-4 hover:bg-slate-50 transition-all font-medium text-slate-700 shadow-sm hover:shadow-md disabled:opacity-60"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            {status === "loading"
              ? "Đang kiểm tra đăng nhập..."
              : "Đăng nhập với Google"}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 text-slate-400 text-xs">
            <div className="flex-1 h-px bg-slate-200" />
            <span>An toàn & bảo mật</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* Trust note */}
          <p className="text-xs text-slate-500 leading-relaxed">
            Chúng tôi chỉ sử dụng thông tin cơ bản từ Google để xác thực tài
            khoản. Dữ liệu của bạn được bảo mật theo tiêu chuẩn quốc tế.
          </p>
        </div>
      </div>
    </main>
  );
}
