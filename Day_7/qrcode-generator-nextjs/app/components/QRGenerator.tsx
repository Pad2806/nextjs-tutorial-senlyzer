// "use client";

// import { useRef, useState } from "react";

// export default function QrGenerator() {
//   const [text, setText] = useState("");
//   const [color, setColor] = useState("#000000");
//   const [bg, setBg] = useState("#ffffff");

//   const imgRef = useRef<HTMLImageElement>(null);

//   const qrUrl = `${
//     process.env.NEXT_PUBLIC_BASE_URL
//   }/img?content=${encodeURIComponent(text)}`;
//   const apiUrl = `/api/qr?content=${encodeURIComponent(
//     text
//   )}&color=${encodeURIComponent(color)}&bg=${encodeURIComponent(bg)}`;

//   async function handleCopy() {
//     if (!imgRef.current) return;

//     const res = await fetch(apiUrl);
//     const blob = await res.blob();

//     await navigator.clipboard.write([
//       new ClipboardItem({
//         "image/png": blob,
//         "text/plain": qrUrl,
//       }),
//     ]);

//     alert("Copied QR successfully");
//   }

//   function handleDownload() {
//     const a = document.createElement("a");
//     a.href = apiUrl;
//     a.download = "qr.png";
//     a.click();
//   }

//   return (
//     <div style={{ maxWidth: 400 }}>
//       <input
//         placeholder="Nhập text hoặc link"
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//       />

//       <div>
//         <label>QR Color</label>
//         <input
//           type="color"
//           value={color}
//           onChange={(e) => setColor(e.target.value)}
//         />
//       </div>

//       <div>
//         <label>Background</label>
//         <input
//           type="color"
//           value={bg}
//           onChange={(e) => setBg(e.target.value)}
//         />
//       </div>

//       {text && (
//         <>
//           <img ref={imgRef} src={apiUrl} alt="QR Code" />
//           <div>
//             <button onClick={handleDownload}>Download</button>
//             <button onClick={handleCopy}>Copy</button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

"use client";

import { useEffect, useRef, useState } from "react";

export default function QrGenerator() {
  const [text, setText] = useState("");
  const [color, setColor] = useState("#000000");
  const [bg, setBg] = useState("#ffffff");
  const [origin, setOrigin] = useState("");

  const imgRef = useRef<HTMLImageElement>(null);

  // 🔑 SET origin SAU KHI MOUNT
  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const qrUrl = origin
    ? `${origin}/img?content=${encodeURIComponent(text)}`
    : "";

  const apiUrl = `/api/qr?content=${encodeURIComponent(
    text
  )}&color=${encodeURIComponent(color)}&bg=${encodeURIComponent(bg)}`;

  async function handleCopy() {
    if (!imgRef.current || !qrUrl) return;

    const res = await fetch(apiUrl);
    const blob = await res.blob();

    await navigator.clipboard.write([
      new ClipboardItem({
        "image/png": blob,
        "text/plain": qrUrl,
      }),
    ]);

    alert("Copied QR successfully");
  }

  function handleDownload() {
    const a = document.createElement("a");
    a.href = apiUrl;
    a.download = "qr.png";
    a.click();
  }

  return (
    <div style={{ maxWidth: 400 }}>
      <input
        placeholder="Nhập text hoặc link"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div>
        <label>QR Color</label>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </div>

      <div>
        <label>Background</label>
        <input
          type="color"
          value={bg}
          onChange={(e) => setBg(e.target.value)}
        />
      </div>

      {text && (
        <>
          <img ref={imgRef} src={apiUrl} alt="QR Code" />
          <div>
            <button onClick={handleDownload}>Download</button>
            <button onClick={handleCopy} disabled={!origin}>
              Copy
            </button>
          </div>
        </>
      )}
    </div>
  );
}
