import { notFound } from "next/navigation";

async function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export default async function CustomersPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;

  await sleep(1500);
  if (!slug || slug.length === 0) {
    notFound();
  }
  const normalized = slug ?? [];
  return (
    <div>
      <p>raw: {JSON.stringify(slug)}</p>
      <p>
        path: {normalized.length ? normalized.join("/") : "(customers root)"}
      </p>
    </div>
  );
}
