import "./globals.css";
import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";

// const inter = Inter({ subsets: ["latin"] });
const roboto_mono = Roboto_Mono({
  weight: ["300", "500", "700"],
  subsets: ["latin"],
  // display: 'swap',
});

export const metadata: Metadata = {
  title: "TONexus",
  description: "The first social layer protocol network on Ton for humans ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={` ${roboto_mono.className} bg-black`}>{children}</body>
    </html>
  );
}
