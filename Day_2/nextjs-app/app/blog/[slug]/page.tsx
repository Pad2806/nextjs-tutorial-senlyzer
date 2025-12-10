// export default async function Page({
//   params,
// }: {
//   params: Promise<{ slug: string }>;
// }) {
//   const { slug } = await params;
//   return <div>My Post: {slug}</div>;
// }
"use client";
import { use } from "react";

export default function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  return (
    <div>
      <p>{slug}</p>
    </div>
  );
}
