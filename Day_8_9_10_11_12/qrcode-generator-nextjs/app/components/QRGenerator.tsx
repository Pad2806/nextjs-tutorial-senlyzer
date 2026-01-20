"use client";

import { useEffect, useRef, useState } from "react";
import logo from "@/public/pad.png";
import Image from "next/image";

export default function QrGenerator() {
  const [text, setText] = useState("");
  const [color, setColor] = useState("#000000");
  const [bg, setBg] = useState("#ffffff");
  const [origin, setOrigin] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  useEffect(() => {
    setIsCopied(false);
  }, [text, color, bg]);

  const apiUrl = `/api/qr?content=${encodeURIComponent(
    text,
  )}&color=${encodeURIComponent(color)}&bg=${encodeURIComponent(bg)}`;

  const qrUrl = origin
    ? `${origin}/img?content=${encodeURIComponent(
        text,
      )}&color=${encodeURIComponent(color)}&bg=${encodeURIComponent(bg)}`
    : "";

  function isIOS() {
    if (typeof window === "undefined") return false;
    return /iPad|iPhone|iPod/.test(navigator.userAgent);
  }

  async function handleCopy() {
    try {
      if (isIOS()) {
        await navigator.clipboard.writeText(qrUrl);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
        return;
      }

      const res = await fetch(apiUrl);
      const blob = await res.blob();

      await navigator.clipboard.write([
        new ClipboardItem({
          "image/png": blob,
          "text/plain": qrUrl,
        }),
      ]);

      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error(err);
      alert("Trình duyệt không hỗ trợ thao tác copy này.");
    }
  }

  function handleDownload() {
    const a = document.createElement("a");
    a.href = apiUrl;
    a.download = `qr-code-${Date.now()}.png`;
    a.click();
  }

  return (
    <div className="relative min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 overflow-hidden font-sans text-slate-900">
      {/* 1. Background Ambient Gradients (Tạo nền mờ ảo) */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-300 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob"></div>
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-300 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-[500px] h-[500px] bg-pink-300 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob animation-delay-4000"></div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-5xl bg-white/60 backdrop-blur-xl rounded-[2.5rem] border border-white/50 shadow-2xl shadow-indigo-500/10 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
          {/* LEFT SIDE: INPUTS */}
          <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/50">
            <div>
              <div className="flex items-center gap-3 mb-10">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white p-2">
                  <Image
                    src={logo}
                    alt="pad"
                    width={32}
                    height={32}
                    className="w-full h-full object-contain brightness-0 invert"
                  />
                </div>
                <span className="font-bold text-xl tracking-tight text-slate-800">
                  QR Generator
                </span>
              </div>

              <div className="space-y-8">
                {/* Custom Input Field */}
                <div className="group">
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3 pl-1">
                    Nội dung
                  </label>
                  <div className="relative">
                    <textarea
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="Nhập liên kết hoặc văn bản..."
                      rows={4}
                      className="w-full bg-white rounded-2xl border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-indigo-500 p-5 text-base shadow-sm placeholder:text-slate-300 resize-none transition-all ease-in-out duration-200"
                    />
                  </div>
                </div>

                {/* Styled Color Pickers */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3 pl-1">
                    Giao diện
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {/* Foreground Color */}
                    <div className="bg-white p-3 rounded-2xl ring-1 ring-slate-200 shadow-sm flex items-center justify-between cursor-pointer hover:ring-indigo-300 transition-all relative overflow-hidden">
                      <div className="flex flex-col">
                        <span className="text-xs text-slate-400 font-medium">
                          Màu mã
                        </span>
                        <span className="text-xs font-mono font-bold text-slate-700 mt-0.5">
                          {color}
                        </span>
                      </div>
                      <div
                        className="w-8 h-8 rounded-full shadow-inner ring-1 ring-black/5"
                        style={{ backgroundColor: color }}
                      ></div>
                      <input
                        type="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      />
                    </div>

                    {/* Background Color */}
                    <div className="bg-white p-3 rounded-2xl ring-1 ring-slate-200 shadow-sm flex items-center justify-between cursor-pointer hover:ring-indigo-300 transition-all relative overflow-hidden">
                      <div className="flex flex-col">
                        <span className="text-xs text-slate-400 font-medium">
                          Màu nền
                        </span>
                        <span className="text-xs font-mono font-bold text-slate-700 mt-0.5">
                          {bg}
                        </span>
                      </div>
                      <div
                        className="w-8 h-8 rounded-full shadow-inner ring-1 ring-black/5"
                        style={{ backgroundColor: bg }}
                      ></div>
                      <input
                        type="color"
                        value={bg}
                        onChange={(e) => setBg(e.target.value)}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 lg:mt-0 pt-6 border-t border-slate-200/50">
              <p className="text-xs text-slate-400">
                Tạo mã QR miễn phí, nhanh chóng và bảo mật. <br />
                Dữ liệu được xử lý trực tiếp.
              </p>
            </div>
          </div>

          {/* RIGHT SIDE: PREVIEW */}
          <div className="lg:col-span-7 bg-white/40 p-8 sm:p-10 flex flex-col items-center justify-center relative">
            {/* Empty State / Loading State */}
            <div
              className={`absolute inset-0 flex flex-col items-center justify-center text-center p-10 transition-all duration-500 ${
                text
                  ? "opacity-0 scale-95 pointer-events-none"
                  : "opacity-100 scale-100"
              }`}
            >
              <div className="w-24 h-24 bg-white rounded-[2rem] shadow-xl shadow-indigo-100 mb-6 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-10 h-10 text-indigo-300"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 6.75h.75v.75h-.75v-.75ZM6.75 16.5h.75v.75h-.75v-.75ZM16.5 6.75h.75v.75h-.75v-.75ZM13.5 13.5h.75v.75h-.75v-.75ZM13.5 19.5h.75v.75h-.75v-.75ZM19.5 13.5h.75v.75h-.75v-.75ZM19.5 19.5h.75v.75h-.75v-.75ZM16.5 16.5h.75v.75h-.75v-.75Z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-700">
                Chưa có nội dung
              </h3>
              <p className="text-slate-400 text-sm mt-2 max-w-xs">
                Hãy nhập thông tin vào bảng bên trái để xem trước mã QR của bạn.
              </p>
            </div>

            {/* Active State */}
            <div
              className={`flex flex-col items-center w-full max-w-sm transition-all duration-700 cubic-bezier(0.34, 1.56, 0.64, 1) ${
                text
                  ? "opacity-100 translate-y-0 blur-0"
                  : "opacity-0 translate-y-10 blur-sm pointer-events-none"
              }`}
            >
              {/* Card Preview */}
              <div className="relative bg-white p-6 rounded-[2rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-slate-100 mb-8 group">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <img
                  src={apiUrl}
                  alt="QR Code"
                  className="w-64 h-64 object-contain relative z-10"
                  style={{ imageRendering: "pixelated" }}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex w-full gap-3">
                <button
                  onClick={handleDownload}
                  className="flex-1 flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 font-bold py-4 rounded-xl shadow-lg shadow-slate-200/50 transition-all active:scale-95 border border-transparent hover:border-slate-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 text-slate-400"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2.25a.75.75 0 01.75.75v11.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V3a.75.75 0 01.75-.75z"
                      clipRule="evenodd"
                    />
                    <path
                      fillRule="evenodd"
                      d="M2.25 13.5a.75.75 0 011.5 0V18a1.5 1.5 0 001.5 1.5h13.5A1.5 1.5 0 0020.25 18v-4.5a.75.75 0 011.5 0V18a3 3 0 01-3 3H5.25a3 3 0 01-3-3v-4.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Download
                </button>

                <button
                  onClick={handleCopy}
                  disabled={!origin}
                  className={`flex-1 flex items-center justify-center gap-2 font-bold py-4 rounded-xl shadow-lg transition-all active:scale-95 text-white
                      ${
                        isCopied
                          ? "bg-teal-500 shadow-teal-500/30"
                          : "bg-slate-900 hover:bg-slate-800 shadow-slate-900/30"
                      }
                      ${!origin && "opacity-50 cursor-not-allowed"}
                    `}
                >
                  {isCopied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
