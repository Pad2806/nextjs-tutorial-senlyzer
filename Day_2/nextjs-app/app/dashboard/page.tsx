import { Suspense } from "react";

async function Feed() {
  await new Promise((r) => setTimeout(r, 1500));
  return <div>Feed done</div>;
}
async function Weather() {
  await new Promise((r) => setTimeout(r, 2500));
  return <div>Weather done</div>;
}

export default function Dashboard() {
  return (
    <section>
      <Suspense fallback={<p>Loading feed...</p>}>
        /* @ts-expect-error Server Component */
        <Feed />
      </Suspense>

      <Suspense fallback={<p>Loading weather...</p>}>
        /* @ts-expect-error Server Component */
        <Weather />
      </Suspense>
    </section>
  );
}
