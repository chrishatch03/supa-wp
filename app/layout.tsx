import React from 'react'; // Ensure React is imported when using JSX
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { ContextProvider } from "@/contexts/Context";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Supabase WP",
  description: "The fastest way to build apps with Next.js and Supabase",
};

// Adjust the type definition to include initialUser
type RootLayoutProps = {
  children: React.ReactNode;
  initialUser: any; // Consider specifying a more precise type instead of 'any'
};

export default function RootLayout({
  children,
  initialUser,
}: RootLayoutProps) {
  return (
    // Pass initialUser to ContextProvider if it's needed there
    <ContextProvider initialUser={initialUser}> 
      <html lang="en" className={GeistSans.className}>
        <body className="bg-zinc-200 dark:bg-primary text-primary dark:text-white">
          <main className="min-h-screen">
            {children}
          </main>
        </body>
      </html>
    </ContextProvider>
  );
}