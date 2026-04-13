import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { getSiteContent } from "@/lib/site-content";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bias Retail | Shaping the Future of Experiential Retail",
  description: "Discover Bias Retail's dynamic portfolio of premium brands including American Vintage, The Face Shop, and Alain Ducasse.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteContent = await getSiteContent();

  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <Navbar
          brandPrefix={siteContent.navbar.brandPrefix}
          brandAccent={siteContent.navbar.brandAccent}
          links={siteContent.navbar.links}
        />
        <main className="flex-grow">
          {children}
        </main>
        <Footer content={siteContent.footer} />
      </body>
    </html>
  );
}
