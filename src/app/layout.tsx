import type { Metadata } from "next";
import Link from "next/link";
import { Inter } from "next/font/google";
import "./globals.css";

import XIcon from '@mui/icons-material/X';
import GitHubIcon from '@mui/icons-material/GitHub';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "びぼうログ",
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
          <div className="grow flex justify-end mr-10">
            <Link href="https://twitter.com/saitotm4423" className="px-2">
              <XIcon />
            </Link>
            <Link href="https://github.com/saitotm" className="px-2">
              <GitHubIcon />
            </Link>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
