import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { TaxHarvestingProvider } from "@/context/TaxHarvestingContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KoinX - Tax Loss Harvesting",
  description: "Tax loss harvesting assignment for KoinX frontend intern role.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <TaxHarvestingProvider>
            {children}
          </TaxHarvestingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
