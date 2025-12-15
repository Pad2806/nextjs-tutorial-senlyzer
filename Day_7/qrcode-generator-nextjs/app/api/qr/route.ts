import QRCode from "qrcode";

export async function GET(req: Request) {
  const { searchParams, origin } = new URL(req.url);
  const content = searchParams.get("content") || "";

  let target: string;

  const decoded = decodeURIComponent(content);

  if (decoded.startsWith("http://") || decoded.startsWith("https://")) {
    target = decoded;
  } else {
    const google = new URL("https://www.google.com/search");
    google.searchParams.set("q", decoded);
    target = google.toString();
  }

  const buffer = await QRCode.toBuffer(target, {
    width: 512,
    margin: 2,
  });

  return new Response(new Uint8Array(buffer), {
    headers: { "Content-Type": "image/png" },
  });
}
