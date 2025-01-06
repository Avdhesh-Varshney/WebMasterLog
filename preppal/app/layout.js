import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import Header from "./dashboard/_components/Header";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "PrepPal",
  description: "Prep with Prepal to ace your next interview!",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/logo1.png" />
        </head>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <Toaster />
          <Header />
          
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
