import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const merriweather = Merriweather({ 
  weight: ["400", "700"], 
  subsets: ["latin"],
  variable: "--font-merriweather" 
});

export const metadata: Metadata = {
  title: "MySock | Digital Growth & AI Solutions",
  description: "AI-powered digital growth and business scaling solutions for forward-thinking enterprises in Maharashtra, India.",
  keywords: "digital growth, AI solutions, business automation, Maharashtra, India",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${merriweather.variable}`}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
