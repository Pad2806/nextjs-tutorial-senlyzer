import Link from "next/link";

export default function DocsPage() {
  return (
    <div style={{ padding: 24 }}>
      <hr style={{ margin: "20px 0" }} />
      <section style={{ marginBottom: 32 }}>
        <h2>1. Loading UI theo segment</h2>
        <ul>
          <li>
            Demo Customers: <Link href="/customers">/customers</Link>
          </li>
          <li>
            Demo Feed Loading: <Link href="/feed">/feed</Link>
          </li>
        </ul>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2>2. Dynamic Routes</h2>
        <ul>
          <li>
            Demo Blog dynamic segment:
            <br />
            <p>[slug]</p>
            <Link href="/blog/123">/blog/123</Link>
            <br />
            <Link href="/customers">/customers</Link>
          </li>
          <li>
            Demo Customers Optional Catch-all segments:
            <br />
            <p>[[...slug]]</p>
            <Link href="/customers/a/b/c">/customers/a/b/c</Link>
            <br />
            <Link href="/customers">/customers</Link>
          </li>
          <li>
            Demo Shop cacth-all segments:
            <br />
            <p>[...slug]</p>
            <Link href="/shop/iphone/macbook">/shop/iphone/macbook</Link>
          </li>
        </ul>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2>3. Error Handling</h2>
        <p>
          Demo:
          <Link href="/dashboard/error">/error-demo</Link>
        </p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2>4. Server Component và Client Components</h2>
        <ul>
          <li>
            <strong>Server Components</strong>: Fetch data, xử lý async
            <p>
              Demo Counter:
              <Link href="/dashboard">Dashboard</Link>
            </p>
          </li>
          <li>
            <strong>Client Components</strong>: Tương tác người dùng
            <p>
              Demo Counter:
              <Link href="/">Home</Link>
            </p>
          </li>
        </ul>
      </section>
      <section style={{ marginBottom: 32 }}>
        <h2>5. Loading UI</h2>
        <p>
          Demo:
          <Link href="/feed">/feed</Link>
        </p>
      </section>
      <section style={{ marginBottom: 32 }}>
        <h2>6. NotFound UI</h2>
        <p>
          Demo:
          <Link href="/customers">/customers</Link>
        </p>
      </section>
      <section style={{ marginBottom: 32 }}>
        <h2>7. Suspense Rendering</h2>
        <p>
          Sử dụng <code>&lt;Suspense&gt;</code> để render song song Feed &
          Weather, mỗi phần có fallback riêng.
        </p>
        <p>
          Demo:
          <Link href="/dashboard">/dashboard</Link>
        </p>
      </section>
    </div>
  );
}
