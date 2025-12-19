import Link from "next/link";
import QrGenerator from "@/app/components/QRGenerator";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <Link href="/" className="font-black tracking-tight">QR.Social</Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <a href="#demo" className="hover:text-slate-900">Demo</a>
            <a href="#how" className="hover:text-slate-900">How it works</a>
            <a href="#pricing" className="hover:text-slate-900">Pricing</a>
            <a href="#faq" className="hover:text-slate-900">FAQs</a>
          </nav>
          <a
            href="#demo"
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
          >
            Get started
          </a>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 pt-16 pb-10">
        <div className="grid gap-8 lg:grid-cols-2 items-center">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
              QR Social
            </p>
            <h1 className="mt-4 text-4xl md:text-5xl font-black tracking-tight">
              Make QR codes that get scanned.
            </h1>
            <p className="mt-4 text-slate-600">
              Create QR from any text or link. Share a clean /img page, download PNG, or copy instantly.
            </p>
            <div className="mt-6 flex gap-3">
              <a href="#demo" className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white">
                Try it now
              </a>
              <a href="#how" className="rounded-xl border px-5 py-3 text-sm font-semibold">
                How it works
              </a>
            </div>
          </div>

          <div id="demo" className="rounded-3xl border bg-slate-50 p-3">
            <QrGenerator />
          </div>
        </div>
      </section>
    </div>
  );
}
