export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section style={{ border: "1px solid red", padding: 20 }}>
      <h2>Blog Layout</h2>
      {children}
    </section>
  );
}
