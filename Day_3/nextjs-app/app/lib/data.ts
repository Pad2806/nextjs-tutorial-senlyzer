import { Blog } from "./definitions";
const blogs: Blog[] = [
  { id: 1, name: "Blog 1", likes: 12 },
  { id: 2, name: "Blog 2", likes: 123 },
  { id: 3, name: "Blog 3", likes: 456 },
];

export async function getBlogs(): Promise<Blog[]> {
  return blogs;
}

export async function getBlogById(id: string): Promise<Blog | undefined> {
  return blogs.find((b) => b.id.toString() === id);
}
