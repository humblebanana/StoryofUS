import type { Metadata } from "next";
import { Geist, Geist_Mono, Libre_Baskerville, Noto_Serif_SC } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const libreBaskerville = Libre_Baskerville({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-libre-baskerville",
  subsets: ["latin"],
  display: "swap",
});

const notoSerifSC = Noto_Serif_SC({
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-serif-sc",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Story of Us | 我们的旅行故事",
  description: "记录旅途中遇见的每一个人，分享他们的故事，传递人与人之间的温暖。Recording every person we meet on our journey, sharing their stories.",
  keywords: ["travel", "stories", "China", "旅行", "故事", "成都", "重庆", "南京", "武汉"],
  authors: [{ name: "Story of Us" }],
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://storyofus.com",
    title: "Story of Us | 我们的旅行故事",
    description: "记录旅途中遇见的每一个人，分享他们的故事，传递人与人之间的温暖。",
    siteName: "Story of Us",
  },
  twitter: {
    card: "summary_large_image",
    title: "Story of Us | 我们的旅行故事",
    description: "记录旅途中遇见的每一个人，分享他们的故事，传递人与人之间的温暖。",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${libreBaskerville.variable} ${notoSerifSC.variable} antialiased min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
