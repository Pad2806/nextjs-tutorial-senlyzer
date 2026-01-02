import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pancake POS - Phần mềm quản lý bán hàng đa kênh",
  description: "Phần mềm quản lý bán hàng đa kênh chuyên nghiệp, hiệu quả.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`} >
        {children}
      </body>
    </html>
  );
}
