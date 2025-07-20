// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { RecurringProvider } from "@/context/RecurringContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Recurring Date Picker",
  description: "A comprehensive recurring date picker built with Next.js 14, TypeScript, and Tailwind CSS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RecurringProvider>
          {children}
        </RecurringProvider>
      </body>
    </html>
  );
}
