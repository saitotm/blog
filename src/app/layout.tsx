import type { Metadata } from "next";
import Link from "next/link";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "一切皆苦",
  description: "技術系のメモを書いておくブログ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="flex items-center bg-blue-200 h-[60px]">
          <Link href="/" className="text-3xl font-bold text-gray-800 pl-[50px]">
            {metadata.title as string}
           </Link>
        </header>
        {children}
      </body>
    </html>
  );
}
