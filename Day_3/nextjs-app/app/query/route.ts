import { getBlogs } from "../lib/data";

export async function GET() {
  try {
    const blogs = await getBlogs;
    return Response.json(blogs);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
