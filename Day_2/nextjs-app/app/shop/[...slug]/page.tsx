"use client";
import { use } from "react";

export default function ShopPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = use(params);

  return (
    <div>
      <p>slug array: {JSON.stringify({ slug })}</p>
    </div>
  );
}
