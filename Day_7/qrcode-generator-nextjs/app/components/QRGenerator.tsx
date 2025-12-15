// "use client";

// import { useEffect, useRef, useState } from "react";
// import logo from "@/public/pad.png";
// import Image from "next/image";
// export default function QrGenerator() {
//   const [text, setText] = useState("");
//   const [color, setColor] = useState("#000000");
//   const [bg, setBg] = useState("#ffffff");
//   const [origin, setOrigin] = useState("");
//   const [isCopied, setIsCopied] = useState(false);

//   const imgRef = useRef<HTMLImageElement>(null);

//   useEffect(() => {
//     setOrigin(window.location.origin);
//   }, []);

//   useEffect(() => {
//     setIsCopied(false);
//   }, [text, color, bg]);

//   const apiUrl = `/api/qr?content=${encodeURIComponent(
//     text
//   )}&color=${encodeURIComponent(color)}&bg=${encodeURIComponent(bg)}`;

//   const qrUrl = origin
//     ? `${origin}/img?content=${encodeURIComponent(
//         text
//       )}&color=${encodeURIComponent(color)}&bg=${encodeURIComponent(bg)}`
//     : "";

//   async function handleCopy() {
//     if (!imgRef.current) return;

//     try {
//       const res = await fetch(apiUrl);
//       const blob = await res.blob();

//       await navigator.clipboard.write([
//         new ClipboardItem({
//           "image/png": blob,
//           "text/plain": qrUrl,
//         }),
//       ]);

//       setIsCopied(true);
//       setTimeout(() => setIsCopied(false), 2000);
//     } catch (err) {
//       console.error("Failed to copy", err);
//       alert("Không thể copy hình ảnh trên trình duyệt này.");
//     }
//   }

//   function handleDownload() {
//     const a = document.createElement("a");
//     a.href = apiUrl;
//     a.download = `qr-code-${Date.now()}.png`;
//     a.click();
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-slate-100 flex items-center justify-center p-4 sm:p-6">
//       <div className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white p-6 sm:p-8">
//         <div className="mb-8">
//           <h1 className="text-2xl font-bold text-slate-900 mb-2 flex items-center gap-2">
//             <Image
//               src={logo}
//               alt="pad"
//               width={32}
//               height={32}
//               className="w-8 h-8"
//             />
//             QR Generator
//           </h1>
//           <p className="text-slate-500 text-sm">
//             Tạo mã QR tùy chỉnh cho liên kết hoặc văn bản.
//           </p>
//         </div>

//         <div className="space-y-5">
//           <div>
//             <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 ml-1">
//               Nội dung
//             </label>
//             <div className="relative">
//               <input
//                 placeholder="https://example.com"
//                 value={text}
//                 onChange={(e) => setText(e.target.value)}
//                 className="w-full bg-slate-50 hover:bg-white focus:bg-white rounded-xl border border-slate-200 pl-10 pr-4 py-3 text-sm outline-none ring-offset-2 focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm"
//               />
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//                 className="w-5 h-5 absolute left-3 top-3 text-slate-400 pointer-events-none"
//               >
//                 <path d="M12.232 4.232a2.5 2.5 0 0 1 3.536 3.536l-1.225 1.224a.75.75 0 0 0 1.061 1.06l1.224-1.224a4 4 0 0 0-5.656-5.656l-3 3a4 4 0 0 0 .225 5.865.75.75 0 0 0 .977-1.138 2.5 2.5 0 0 1-.142-3.667l3-3Z" />
//                 <path d="M11.603 7.963a.75.75 0 0 0-.977 1.138 2.5 2.5 0 0 1 .142 3.667l-3 3a2.5 2.5 0 0 1-3.536-3.536l1.225-1.224a.75.75 0 0 0-1.061-1.06l-1.224 1.224a4 4 0 1 0 5.656 5.656l3-3a4 4 0 0 0-.225-5.865Z" />
//               </svg>
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 ml-1">
//                 Màu QR
//               </label>
//               <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl p-2 pr-3 cursor-pointer hover:border-slate-300 transition-colors group">
//                 <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-slate-200 shadow-sm flex-shrink-0">
//                   <input
//                     type="color"
//                     value={color}
//                     onChange={(e) => setColor(e.target.value)}
//                     className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] p-0 m-0 border-none cursor-pointer"
//                   />
//                 </div>
//                 <span className="text-xs font-mono text-slate-600 group-hover:text-slate-900">
//                   {color}
//                 </span>
//               </div>
//             </div>

//             <div>
//               <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 ml-1">
//                 Màu nền
//               </label>
//               <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl p-2 pr-3 cursor-pointer hover:border-slate-300 transition-colors group">
//                 <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-slate-200 shadow-sm flex-shrink-0">
//                   <input
//                     type="color"
//                     value={bg}
//                     onChange={(e) => setBg(e.target.value)}
//                     className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] p-0 m-0 border-none cursor-pointer"
//                   />
//                 </div>
//                 <span className="text-xs font-mono text-slate-600 group-hover:text-slate-900">
//                   {bg}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div
//           className={`mt-8 transition-all duration-500 ease-in-out ${
//             text
//               ? "opacity-100 translate-y-0"
//               : "opacity-0 translate-y-4 hidden"
//           }`}
//         >
//           <div className="relative group flex justify-center mb-6">
//             <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-2xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity"></div>
//             <div className="relative bg-white p-4 rounded-2xl border border-slate-100 shadow-lg">
//               <img
//                 ref={imgRef}
//                 src={apiUrl}
//                 alt="QR Code"
//                 className="w-48 h-48 object-contain"
//               />
//             </div>
//           </div>

//           <div className="flex gap-3">
//             <button
//               onClick={handleDownload}
//               className="flex-1 flex items-center justify-center gap-2 bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 font-semibold py-2.5 px-4 rounded-xl transition-all shadow-sm active:scale-95"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//                 className="w-5 h-5"
//               >
//                 <path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z" />
//                 <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
//               </svg>
//               Tải về
//             </button>

//             <button
//               onClick={handleCopy}
//               disabled={!origin}
//               className={`flex-1 flex items-center justify-center gap-2 font-semibold py-2.5 px-4 rounded-xl transition-all shadow-sm active:scale-95 text-white
//                 ${
//                   isCopied
//                     ? "bg-green-600 border border-green-600"
//                     : "bg-indigo-600 hover:bg-indigo-700 border border-transparent"
//                 }
//                 ${!origin && "opacity-50 cursor-not-allowed"}
//               `}
//             >
//               {isCopied ? (
//                 <>
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 20 20"
//                     fill="currentColor"
//                     className="w-5 h-5"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                   Đã copy!
//                 </>
//               ) : (
//                 <>
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 20 20"
//                     fill="currentColor"
//                     className="w-5 h-5"
//                   >
//                     <path d="M7 3.5A1.5 1.5 0 0 1 8.5 2h3.879a1.5 1.5 0 0 1 1.06.44l3.122 3.12A1.5 1.5 0 0 1 17 6.622V12.5a1.5 1.5 0 0 1-1.5 1.5h-1v-3.379a3 3 0 0 0-.879-2.121L10.5 5.379A3 3 0 0 0 8.379 4.5H7v-1Z" />
//                     <path d="M4.5 6A1.5 1.5 0 0 0 3 7.5v9A1.5 1.5 0 0 0 4.5 18h7a1.5 1.5 0 0 0 1.5-1.5v-5.879a1.5 1.5 0 0 0-.44-1.06L9.44 6.439A1.5 1.5 0 0 0 8.378 6H4.5Z" />
//                   </svg>
//                   Copy
//                 </>
//               )}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

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
    text
  )}&color=${encodeURIComponent(color)}&bg=${encodeURIComponent(bg)}`;

  const qrUrl = origin
    ? `${origin}/img?content=${encodeURIComponent(
        text
      )}&color=${encodeURIComponent(color)}&bg=${encodeURIComponent(bg)}`
    : "";
  function isIOS() {
    if (typeof window === "undefined") return false;
    return /iPad|iPhone|iPod/.test(navigator.userAgent);
  }

  async function handleCopy() {
    try {
      // iOS: chỉ copy LINK (Apple chặn copy image)
      if (isIOS()) {
        await navigator.clipboard.writeText(qrUrl);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
        return;
      }

      // Desktop / Android: copy BOTH image + link
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-slate-100 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white p-6 sm:p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-2 flex items-center gap-2">
            <Image
              src={logo}
              alt="pad"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            QR Generator
          </h1>
          <p className="text-slate-500 text-sm">
            Tạo mã QR tùy chỉnh cho liên kết hoặc văn bản.
          </p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 ml-1">
              Nội dung
            </label>
            <div className="relative">
              <input
                placeholder="https://example.com"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full bg-slate-50 hover:bg-white focus:bg-white rounded-xl border border-slate-200 pl-10 pr-4 py-3 text-sm outline-none ring-offset-2 focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 absolute left-3 top-3 text-slate-400 pointer-events-none"
              >
                <path d="M12.232 4.232a2.5 2.5 0 0 1 3.536 3.536l-1.225 1.224a.75.75 0 0 0 1.061 1.06l1.224-1.224a4 4 0 0 0-5.656-5.656l-3 3a4 4 0 0 0 .225 5.865.75.75 0 0 0 .977-1.138 2.5 2.5 0 0 1-.142-3.667l3-3Z" />
                <path d="M11.603 7.963a.75.75 0 0 0-.977 1.138 2.5 2.5 0 0 1 .142 3.667l-3 3a2.5 2.5 0 0 1-3.536-3.536l1.225-1.224a.75.75 0 0 0-1.061-1.06l-1.224 1.224a4 4 0 1 0 5.656 5.656l3-3a4 4 0 0 0-.225-5.865Z" />
              </svg>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 ml-1">
                Màu QR
              </label>
              <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl p-2 pr-3 cursor-pointer hover:border-slate-300 transition-colors group">
                <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-slate-200 shadow-sm flex-shrink-0">
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] p-0 m-0 border-none cursor-pointer"
                  />
                </div>
                <span className="text-xs font-mono text-slate-600 group-hover:text-slate-900">
                  {color}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 ml-1">
                Màu nền
              </label>
              <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl p-2 pr-3 cursor-pointer hover:border-slate-300 transition-colors group">
                <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-slate-200 shadow-sm flex-shrink-0">
                  <input
                    type="color"
                    value={bg}
                    onChange={(e) => setBg(e.target.value)}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] p-0 m-0 border-none cursor-pointer"
                  />
                </div>
                <span className="text-xs font-mono text-slate-600 group-hover:text-slate-900">
                  {bg}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`mt-8 transition-all duration-500 ease-in-out ${
            text
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4 hidden"
          }`}
        >
          <div className="relative group flex justify-center mb-6">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-2xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <div className="relative bg-white p-4 rounded-2xl border border-slate-100 shadow-lg">
              <img
                src={apiUrl}
                alt="QR Code"
                className="w-48 h-48 object-contain"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleDownload}
              className="flex-1 flex items-center justify-center gap-2 bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 font-semibold py-2.5 px-4 rounded-xl transition-all shadow-sm active:scale-95"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z" />
                <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
              </svg>
              Tải về
            </button>

            <button
              onClick={handleCopy}
              disabled={!origin}
              className={`flex-1 flex items-center justify-center gap-2 font-semibold py-2.5 px-4 rounded-xl transition-all shadow-sm active:scale-95 text-white
                ${
                  isCopied
                    ? "bg-green-600 border border-green-600"
                    : "bg-indigo-600 hover:bg-indigo-700 border border-transparent"
                }
                ${!origin && "opacity-50 cursor-not-allowed"}
              `}
            >
              {isCopied ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Đã copy!
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path d="M7 3.5A1.5 1.5 0 0 1 8.5 2h3.879a1.5 1.5 0 0 1 1.06.44l3.122 3.12A1.5 1.5 0 0 1 17 6.622V12.5a1.5 1.5 0 0 1-1.5 1.5h-1v-3.379a3 3 0 0 0-.879-2.121L10.5 5.379A3 3 0 0 0 8.379 4.5H7v-1Z" />
                    <path d="M4.5 6A1.5 1.5 0 0 0 3 7.5v9A1.5 1.5 0 0 0 4.5 18h7a1.5 1.5 0 0 0 1.5-1.5v-5.879a1.5 1.5 0 0 0-.44-1.06L9.44 6.439A1.5 1.5 0 0 0 8.378 6H4.5Z" />
                  </svg>
                  {isIOS() ? "Copy" : "Copy"}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
