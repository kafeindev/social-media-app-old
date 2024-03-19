import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import SideNav from "@/components/side-nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Social Media",
  description: "Social Media App",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex flex-row">
          <SideNav />
          {children}
        </main>
      </body>
    </html>
  );
}
