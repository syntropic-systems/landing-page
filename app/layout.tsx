import type { Metadata } from "next";
import {
  Rethink_Sans,
  Hedvig_Letters_Serif,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";
import { ClientLayoutWrapper } from "./client-layout-wrapper";

// Configure the fonts
const rethinkSans = Rethink_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const hedvigLettersSerif = Hedvig_Letters_Serif({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cloud Glance",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${rethinkSans.variable} ${hedvigLettersSerif.variable} ${jetbrainsMono.variable}`}
    >
      <body className={rethinkSans.className}>
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </body>
    </html>
  );
}
