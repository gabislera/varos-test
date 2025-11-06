import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VAROS",
  description: "Sistema de gestão de consultores e clientes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="dark" lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <header className="w-full border-b border-[#222729] py-6 px-8 flex items-center justify-between sticky top-0 bg-background">
          <Link href="/dashboard">
            <h1 className="text-2xl font-bold">VAROS</h1>
          </Link>
        </header>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
