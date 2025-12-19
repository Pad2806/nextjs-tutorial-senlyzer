import QRCode from "qrcode";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const content = searchParams.get("content") || "";
  const color = searchParams.get("color") || "#000000";
  const bg = searchParams.get("bg") || "#ffffff";

  const size = Number(searchParams.get("size") ?? 192);

  const decoded = decodeURIComponent(content);

  const target =
    decoded.startsWith("http://") || decoded.startsWith("https://")
      ? decoded
      : `https://www.google.com/search?q=${encodeURIComponent(decoded)}`;

  const buffer = await QRCode.toBuffer(target, {
    width: size,
    margin: 4,
    color: {
      dark: color,
      light: bg,
    },
  });

  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "no-store",
    },
  });
}
