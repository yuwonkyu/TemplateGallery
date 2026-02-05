import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Template Gallery",
  description:
    "Next.js Template Gallery with TypeScript, Tailwind CSS, and FSD",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="antialiased">{children}</body>
    </html>
  );
}
