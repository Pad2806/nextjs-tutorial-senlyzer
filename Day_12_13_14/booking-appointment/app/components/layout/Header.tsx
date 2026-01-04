"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

export default function Header() {
  const { data: session, status } = useSession();

  return (
    <header className="bg-white border-b border-slate-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-[1500px] mx-auto px-6 h-24 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
           <div className="relative w-48 h-16">
              <Image 
                src="/logo-new.png" 
                alt="Thien Nhan Hospital" 
                fill 
                className="object-contain object-left"
                priority
              />
           </div>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/#guide"
            className="text-sm text-slate-700 hover:text-blue-600"
          >
            Hướng dẫn đặt lịch
          </Link>

          {status === "loading" && (
            <div className="text-sm text-slate-400">...</div>
          )}
          {status === "unauthenticated" && (
            <Link
              href="/login"
              className="px-6 py-2.5 rounded-full border border-[#003B73] text-[#003B73] font-medium hover:bg-[#003B73] hover:text-white transition text-sm shadow-sm"
            >
              Đăng nhập
            </Link>
          )}
          {status === "authenticated" && session?.user && (
            <div className="flex items-center gap-3">
              {session.user.image && (
                <img
                  src={session.user.image}
                  alt="avatar"
                  className="w-9 h-9 rounded-full"
                />
              )}
              <span className="text-sm font-medium text-slate-700">
                {session.user.name}
              </span>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-sm text-slate-500 hover:text-red-500"
              >
                Đăng xuất
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
