import { getBlogById } from "@/app/lib/data";

export default async function BlogDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const blog = await getBlogById(id);

  if (!blog) return <h1>Blog not found</h1>;

  return (
    <>
      <h1>Blog Detail</h1>
      <p>Name: {blog.name}</p>
      <p>Likes: {blog.likes}</p>
    </>
  );
}
