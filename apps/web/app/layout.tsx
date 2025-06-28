import { Geist, Geist_Mono } from "next/font/google";

import { Providers } from "@/components/providers";
import { Metadata } from "next";

import "@workspace/ui/globals.css";

export const metadata: Metadata = {
  title: "EVM App Boilerplate",
  description: "A full stack boilerplate for building EVM apps",
};

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased `}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
