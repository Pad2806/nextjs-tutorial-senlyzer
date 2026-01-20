import Link from "next/link";

export default async function ImgPage({
  searchParams,
}: {
  searchParams: Promise<{ content?: string; color?: string; bg?: string }>;
}) {
  const params = await searchParams;

  const content = params.content ? decodeURIComponent(params.content) : "";
  const color = params.color ? decodeURIComponent(params.color) : "#000000";
  const bg = params.bg ? decodeURIComponent(params.bg) : "#ffffff";

  const apiUrl = `/api/qr?content=${encodeURIComponent(
    content,
  )}&color=${encodeURIComponent(color)}&bg=${encodeURIComponent(bg)}`;

  if (!params.content) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 font-sans p-6 text-center">
        <div className="w-20 h-20 bg-slate-200 rounded-3xl flex items-center justify-center mb-6 animate-pulse">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10 text-slate-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-slate-800 mb-2">
          Không tìm thấy mã QR
        </h1>
        <p className="text-slate-500 mb-8">
          Liên kết này có thể bị lỗi hoặc thiếu dữ liệu.
        </p>
        <Link
          href="/"
          className="px-8 py-3 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-all"
        >
          Tạo mã mới
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F172A] p-6 font-sans relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-[128px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-screen filter blur-[128px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-xs sm:max-w-sm">
        <div className="bg-white/90 backdrop-blur-md p-2 rounded-[2rem] shadow-2xl shadow-indigo-500/20 ring-1 ring-white/20">
          <div className="bg-white border border-slate-100 rounded-[1.5rem] p-8 text-center">
            <div className="mb-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 rounded-full mb-4">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Ready to scan
                </span>
              </div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tighter">
                QR Code
              </h1>
            </div>

            <div className="relative mx-auto w-fit mb-8 p-4 rounded-2xl bg-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] ring-1 ring-slate-100">
              <img
                src={apiUrl}
                alt="QR Code"
                className="w-56 h-56 object-contain rounded-lg"
                style={{ imageRendering: "pixelated" }}
              />
              {/* Decor elements */}
              <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-slate-900 rounded-tl-sm"></div>
              <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-slate-900 rounded-tr-sm"></div>
              <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-slate-900 rounded-bl-sm"></div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-slate-900 rounded-br-sm"></div>
            </div>

            <div className="pt-6 border-t border-slate-100/80">
              <Link
                href="/"
                className="group inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-indigo-600 transition-colors"
              >
                <span className="group-hover:translate-x-[-2px] transition-transform">
                  ←
                </span>
                Create your own
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
