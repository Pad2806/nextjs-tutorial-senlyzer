export default function ImgPage({
  searchParams,
}: {
  searchParams: { content?: string };
}) {
  const target = searchParams.content
    ? decodeURIComponent(searchParams.content)
    : "/";

  return Response.redirect(target, 302);
}
