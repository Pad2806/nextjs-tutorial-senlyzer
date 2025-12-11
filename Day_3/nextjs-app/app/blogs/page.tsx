import Link from "next/link";
import { getBlogs } from "@/app/lib/data";

export default async function BlogList() {
  const blogs = await getBlogs();

  return (
    <>
      <h1>Blog List</h1>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>{blog.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
