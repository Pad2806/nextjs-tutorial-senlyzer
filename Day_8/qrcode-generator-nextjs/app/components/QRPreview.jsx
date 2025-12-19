import Image from "next/image";

export default function QrPreview() {
  return (
    <div className="relative">
      {/* glow */}
      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-violet-500/20 to-indigo-500/20 blur-2xl" />

      <div className="relative rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
        <div className="flex flex-col items-center gap-6">
          <div className="text-sm font-semibold text-slate-500">
            Live QR Preview
          </div>

          <div className="rounded-2xl border bg-slate-50 p-6">
            <Image
              src="/demo-qr.png" 
              alt="QR preview"
              width={220}
              height={220}
            />
          </div>

          <div className="text-center text-sm text-slate-500">
            https://your-link.com
          </div>
        </div>
      </div>
    </div>
  );
}
