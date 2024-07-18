import React from 'react'; // Ensure React is imported when using JSX
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { AuthProvider } from '@/contexts/AuthContext';
import { ContextProvider } from "@/contexts/Context";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Supabase WP",
  description: "The fastest way to build apps with Next.js and Supabase",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <AuthProvider >
      <ContextProvider > 
        <html lang="en" className={GeistSans.className}>
          <body className="bg-zinc-200 dark:bg-primary text-primary dark:text-white">
            <main className="min-h-screen">
              {children}
            </main>
          </body>
        </html>
      </ContextProvider>
    </AuthProvider>
  );
}