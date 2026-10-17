import type { Metadata } from "next";
import { Fredoka, Inter } from "next/font/google";
import "@/app/globals.css";

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-fredoka",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Learn · Physics & Maths Teacher",
  description: "Student classroom for Manzi Delick — Physics & Mathematics tutoring, Kampala.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fredoka.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}