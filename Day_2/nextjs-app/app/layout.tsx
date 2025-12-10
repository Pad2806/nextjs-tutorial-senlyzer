import Link from "next/link";
import Counter from "@/ui/counter";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <nav>
          {/* Prefetched when the link is hovered or enters the viewport */}
          <Link href="/">Home</Link>
          <br />
          <Counter />
        </nav>
        {children}
      </body>
    </html>
  );
}
