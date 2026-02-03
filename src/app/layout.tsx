import type { Metadata } from "next";
import { Inter, Poppins, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Savan Eats - Authentic African Cuisine",
  description: "Order delicious African meals from Savan Restaurant. delivered fresh to your door.",
  manifest: "/manifest.json",
};

import { SideNav } from "@/components/layout/side-nav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${poppins.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <div className="flex bg-white min-h-screen">
          <div className="flex-1 w-full transition-all duration-500">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
