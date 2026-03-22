import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WHOP Phone Screening",
  description: "Women's Hormone Health Program — Phone Pre-Screening Questionnaire",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-cream-50">
        {children}
      </body>
    </html>
  );
}
