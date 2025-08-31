import "./globals.css";
import { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata = {
  title: "CRIT — Hit Your Mark",
  description: "Gamer-focused performance nutrition and accessories.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <html lang="en" className={inter.variable}>
        <body className="font-sans antialiased bg-white text-carbon">
          <div className="pointer-events-none fixed inset-0 -z-50 bg-[radial-gradient(ellipse_at_top_right,rgba(56,255,201,0.10),transparent_40%),radial-gradient(ellipse_at_bottom_left,rgba(125,249,255,0.10),transparent_35%)]" />
          <Navbar />
          <main className="min-h-[70vh]">{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
