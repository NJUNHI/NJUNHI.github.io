import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "南赫 Wiki｜学生共建",
    template: "%s｜南赫 Wiki",
  },
  description: "南赫同学一起维护的学院、课程与生活 Wiki。非官方网站。",
  metadataBase: new URL("https://njunhi.github.io"),
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://njunhi.github.io/",
    siteName: "南赫 Wiki",
    title: "南赫 Wiki｜学生共建",
    description: "学院信息、课程和生活经验，都在这里。",
    images: [{ url: "/og.png", width: 1672, height: 941, alt: "南赫 Wiki" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "南赫 Wiki｜学生共建",
    description: "学院信息、课程和生活经验，都在这里。",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
