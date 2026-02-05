import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Portfolio Template Builder",
  description:
    "Build a portfolio without code, export HTML you fully own, and keep editing anytime.",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayout = async ({ children }: RootLayoutProps) => {
  // 미들웨어에서 전달한 로케일 값을 html lang에 반영
  const locale = (await headers()).get("x-next-intl-locale") ?? "ko";

  return (
    <html lang={locale}>
      <body className={`${spaceGrotesk.variable} antialiased`}>{children}</body>
    </html>
  );
};

export default RootLayout;
