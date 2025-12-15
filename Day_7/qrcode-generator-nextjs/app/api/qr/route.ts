import QRCode from "qrcode";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const content = searchParams.get("content") || "";
  const color = searchParams.get("color") || "#000000";
  const bg = searchParams.get("bg") || "#ffffff";

  const qrUrl = `${
    process.env.NEXT_PUBLIC_BASE_URL
  }/img?content=${encodeURIComponent(content)}`;

  const buffer = await QRCode.toBuffer(qrUrl, {
    color: {
      dark: color,
      light: bg,
    },
    width: 512,
    margin: 2,
  });

  // 🔑 FIX Ở ĐÂY
  const uint8Array = new Uint8Array(buffer);

  return new Response(uint8Array, {
    headers: {
      "Content-Type": "image/png",
    },
  });
}
