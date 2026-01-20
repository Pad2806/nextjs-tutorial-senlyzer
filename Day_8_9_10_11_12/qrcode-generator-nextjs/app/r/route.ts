export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const content = searchParams.get("content");

  if (!content) {
    return Response.redirect(new URL("/", req.url), 302);
  }

  const decoded = decodeURIComponent(content);

  if (decoded.startsWith("http://") || decoded.startsWith("https://")) {
    return Response.redirect(decoded, 302);
  }

  const googleSearchUrl = new URL("https://www.google.com/search");
  googleSearchUrl.searchParams.set("q", decoded);
  console.log(decoded);
  console.log(googleSearchUrl);
  return Response.redirect(googleSearchUrl.toString(), 302);
}
