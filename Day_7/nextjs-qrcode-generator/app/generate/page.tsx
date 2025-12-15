// "use client";
// import React, { useState } from "react";
// import { useQRCode } from "next-qrcode";

// export default function Page() {
//   const { Image } = useQRCode();
//   const [value, setValue] = useState("");
//   const [qrColor, setQRColor] = useState("#000000");
//   const [bgColor, setBGColor] = useState("#ffffff");

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
//       <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6">
//         <h1 className="text-2xl font-semibold text-gray-900 text-center">
//           Generate QR Code
//         </h1>
//         <p className="text-gray-500 text-center mt-1 mb-6">
//           Enter any text or URL to generate QR code instantly
//         </p>

//         <input
//           className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black transition"
//           placeholder="Enter text or link..."
//           value={value}
//           onChange={(e) => setValue(e.target.value)}
//         />
//         <div className="flex items-center justify-between mt-6">
//           <div className="flex flex-col">
//             <label className="text-sm text-gray-700 mb-1">QR Color</label>
//             <input
//               type="color"
//               value={qrColor}
//               onChange={(e) => setQRColor(e.target.value)}
//               className="h-10 w-16 cursor-pointer rounded"
//             />
//           </div>

//           <div className="flex flex-col">
//             <label className="text-sm text-gray-700 mb-1">Background</label>
//             <input
//               type="color"
//               value={bgColor}
//               onChange={(e) => setBGColor(e.target.value)}
//               className="h-10 w-16 cursor-pointer rounded"
//             />
//           </div>
//         </div>
//         {/* QR PREVIEW */}
//         {value !== "" && (
//           <div className="mt-6 flex flex-col items-center">
//             <div className="bg-white p-4 rounded-xl shadow">
//               <Image
//                 text={value}
//                 options={{
//                   type: "image/png",
//                   margin: 2,
//                   scale: 6,
//                   width: 220,
//                   color: {
//                     dark: qrColor,
//                     light: bgColor,
//                   },
//                 }}
//               />
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import { useQRCode } from "next-qrcode";

// export default function Generate() {
//   const { Canvas } = useQRCode();
//   const [value, setValue] = useState("");

//   const [qrColor, setQrColor] = useState("#000000");
//   const [bgColor, setBgColor] = useState("#FFFFFF");

//   const canvasRef = useRef<HTMLCanvasElement | null>(null);

//   useEffect(() => {
//     const qrCanvas = document.querySelector("canvas");
//     if (qrCanvas instanceof HTMLCanvasElement) {
//       canvasRef.current = qrCanvas;
//     }
//   }, [value, qrColor, bgColor]);

//   const handleDownload = () => {
//     if (!canvasRef.current) return;

//     const link = document.createElement("a");
//     link.download = "qr-code.png";
//     link.href = canvasRef.current.toDataURL("image/png");
//     link.click();
//   };

//   const handleCopyImage = async () => {
//     if (!canvasRef.current) return;

//     canvasRef.current.toBlob(async (blob) => {
//       if (!blob) return;

//       try {
//         await navigator.clipboard.write([
//           new ClipboardItem({ "image/png": blob }),
//         ]);

//         alert("Copied QR as image! Paste now to see it.");
//       } catch (err) {
//         console.error("Copy failed", err);
//         alert("Your browser does not support copying images.");
//       }
//     });
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
//       <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6">
//         <h1 className="text-2xl font-semibold text-gray-900 text-center">
//           Generate QR Code
//         </h1>

//         <p className="text-gray-500 text-center mt-1 mb-6">
//           Enter content and customize your QR colors
//         </p>

//         <input
//           className="w-full border border-gray-300 rounded-lg px-4 py-2
//             focus:outline-none focus:ring-2 focus:ring-black transition"
//           placeholder="Enter text or link..."
//           value={value}
//           onChange={(e) => setValue(e.target.value)}
//         />

//         <div className="flex items-center justify-between mt-6">
//           <div className="flex flex-col">
//             <label className="text-sm text-gray-700 mb-1">QR Color</label>
//             <input
//               type="color"
//               value={qrColor}
//               onChange={(e) => setQrColor(e.target.value)}
//               className="h-10 w-16 cursor-pointer rounded"
//             />
//           </div>

//           <div className="flex flex-col">
//             <label className="text-sm text-gray-700 mb-1">Background</label>
//             <input
//               type="color"
//               value={bgColor}
//               onChange={(e) => setBgColor(e.target.value)}
//               className="h-10 w-16 cursor-pointer rounded"
//             />
//           </div>
//         </div>

//         {value !== "" && (
//           <div className="mt-8 flex flex-col items-center">
//             <div className="bg-white p-4 rounded-xl shadow">
//               <Canvas
//                 text={value}
//                 options={{
//                   type: "image/png",
//                   margin: 2,
//                   scale: 6,
//                   color: {
//                     dark: qrColor,
//                     light: bgColor,
//                   },
//                 }}
//               />
//             </div>

//             {/* Action Buttons */}
//             <div className="flex gap-4 mt-6">
//               <button
//                 onClick={handleDownload}
//                 className="px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition"
//               >
//                 Download
//               </button>

//               <button
//                 onClick={handleCopyImage}
//                 className="px-4 py-2 rounded-lg border border-gray-400 hover:bg-gray-100 transition"
//               >
//                 Copy QR
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import QRCode from "qrcode";
// import { useRouter, useSearchParams } from "next/navigation";

// export default function Generate() {
//   const [value, setValue] = useState("");
//   const [qrColor, setQrColor] = useState("#000000");
//   const [bgColor, setBgColor] = useState("#FFFFFF");
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const url = `https://qrcode-generate-bot.vercel.app/`;

//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   useEffect(() => {
//     const v = searchParams.get("value");
//     const q = searchParams.get("qrColor");
//     const b = searchParams.get("bgColor");

//     if (v) setValue(v);
//     if (q) setQrColor(q);
//     if (b) setBgColor(b);
//   }, []);

//   useEffect(() => {
//     if (!value) return;

//     const params = new URLSearchParams({
//       value,
//       qrColor,
//       bgColor,
//     });

//     router.replace(`?${params.toString()}`, { scroll: false });
//   }, [value, qrColor, bgColor]);

//   useEffect(() => {
//     if (!canvasRef.current || !value) return;

//     QRCode.toCanvas(canvasRef.current, value, {
//       scale: 6,
//       margin: 2,
//       color: {
//         dark: qrColor,
//         light: bgColor,
//       },
//     });
//   }, [value, qrColor, bgColor]);

//   const handleDownload = () => {
//     if (!canvasRef.current) return;

//     const link = document.createElement("a");
//     link.download = "qr-code.png";
//     link.href = canvasRef.current.toDataURL("image/png");
//     link.click();
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
//       <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6">
//         <h1 className="text-2xl font-semibold text-gray-900 text-center">
//           Generate QR Code
//         </h1>

//         <input
//           className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-4"
//           placeholder="Enter text or link..."
//           value={value}
//           onChange={(e) => setValue(e.target.value)}
//         />

//         <div className="flex justify-between mt-6">
//           <input
//             type="color"
//             value={qrColor}
//             onChange={(e) => setQrColor(e.target.value)}
//           />
//           <input
//             type="color"
//             value={bgColor}
//             onChange={(e) => setBgColor(e.target.value)}
//           />
//         </div>

//         {value && (
//           <div className="mt-8 text-center">
//             <canvas
//               ref={canvasRef}
//               className="shadow p-4 bg-white rounded-xl"
//             />
//             <button
//               onClick={handleDownload}
//               className="px-4 py-2 mt-4 rounded-lg bg-black text-white"
//             >
//               Download
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState, useEffect, useRef } from "react";
import QRCode from "qrcode";
import { useRouter, useSearchParams } from "next/navigation";

export default function Generate() {
  const [value, setValue] = useState("");
  const [qrColor, setQrColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [copied, setCopied] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  /* ---------- Load from URL ---------- */
  useEffect(() => {
    const v = searchParams.get("value");
    const q = searchParams.get("qrColor");
    const b = searchParams.get("bgColor");

    if (v) setValue(v);
    if (q) setQrColor(q);
    if (b) setBgColor(b);
  }, []);

  /* ---------- Sync URL ---------- */
  useEffect(() => {
    if (!value) return;

    const params = new URLSearchParams({
      value,
      qrColor,
      bgColor,
    });

    router.replace(`?${params.toString()}`, { scroll: false });
  }, [value, qrColor, bgColor]);

  /* ---------- Render QR ---------- */
  useEffect(() => {
    if (!canvasRef.current || !value) return;

    QRCode.toCanvas(canvasRef.current, value, {
      scale: 6,
      margin: 2,
      color: {
        dark: qrColor,
        light: bgColor,
      },
    });
  }, [value, qrColor, bgColor]);

  /* ---------- Actions ---------- */
  const handleDownload = () => {
    if (!canvasRef.current) return;

    const link = document.createElement("a");
    link.download = "qr-code.png";
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  };

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleCopyImage = async () => {
    if (!canvasRef.current) return;

    canvasRef.current.toBlob(async (blob) => {
      if (!blob) return;

      try {
        await navigator.clipboard.write([
          new ClipboardItem({
            "image/png": blob,
          }),
        ]);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      } catch (err) {
        console.error("Copy image failed", err);
      }
    });
  };

  /* ---------- UI ---------- */
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-6 space-y-6">
        <h1 className="text-2xl font-semibold text-gray-900 text-center">
          QR Code Generator
        </h1>

        {/* Input */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Text / URL
          </label>
          <input
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-black focus:outline-none"
            placeholder="https://example.com"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        {/* Colors */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="text-sm font-medium text-gray-700">
              QR Color
            </label>
            <input
              type="color"
              value={qrColor}
              onChange={(e) => setQrColor(e.target.value)}
              className="w-full h-10 rounded-md cursor-pointer"
            />
          </div>

          <div className="flex-1">
            <label className="text-sm font-medium text-gray-700">
              Background
            </label>
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="w-full h-10 rounded-md cursor-pointer"
            />
          </div>
        </div>

        {/* QR */}
        {value && (
          <div className="space-y-4">
            <div className="flex justify-center p-4 bg-gray-50 rounded-xl">
              <canvas ref={canvasRef} />
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleDownload}
                className="flex-1 px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition"
              >
                Download
              </button>

              <button
                onClick={handleCopyImage}
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
              >
                {copied ? "Copied ✓" : "Copy QR"}
              </button>
            </div>

            {/* Share URL */}
            <div className="text-xs text-gray-500 break-all bg-gray-50 rounded-lg p-2">
              {shareUrl}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
