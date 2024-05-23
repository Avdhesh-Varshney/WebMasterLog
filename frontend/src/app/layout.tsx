import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { DataProvider } from "@/context/dataContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hairify",
  description: "A one stop solution to all your hair problems",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#cde6e9" />
      </head>
      <body className={inter.className}>
        <DataProvider>
          <InnerLayer>{children}</InnerLayer>
        </DataProvider>
      </body>
    </html>
  );
}

function InnerLayer({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-[100vh] flex flex-col">
      <Header />
      {children}
    </div>
  );
}
