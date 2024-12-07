import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { SidebarProvider } from "@/components/ui/sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StackFlex - ERP",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "../../public/dark-icon.png",
        href: "../../public/dark-icon.png",
      },
      {
        media: "(prefers-color-scheme: dark)",
        href: "../../public/light-icon.png",
        url: "../../public/light-icon.png",
      },
      {
        pathname: "/app/*",
        href: "./icon.png",
        url: "./icon.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning suppressContentEditableWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Toaster />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
