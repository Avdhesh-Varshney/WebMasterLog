import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MainContent from "../components/MainContent";
import { SidebarProvider } from "../context/SidebarContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Web Master Log | Your Web Dev Hub",
  description: "Web Master Log is a web development hub for web developers, designers, and webmasters. It provides resources, tools, and tutorials for web development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#000000] text-[#FFFFFF] overflow-x-hidden`}>
        <SidebarProvider>
          <MainContent>{children}</MainContent>
        </SidebarProvider>
      </body>
    </html>
  );
}
