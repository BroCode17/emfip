import type { Metadata } from "next";
import { Inter } from "next/font/google";
import './globals.css'
import { ToastProvider } from "@/components/_context/toastcontext";
import { TProvider } from "@/components/_context/toast/toast";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { InViewContextProvider } from "@/components/inviewcontext";
import { AppContextProvider } from "@/components/_context/appcontext";

export const metadata = {
  title: 'Emfip',
  description: 'Emfip Wool Drayer Balls official website',
  
}
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-lightAlmond scroll-smooth custom-scrollbar`}>
        <TProvider>
            <AppContextProvider>
            {children}
            </AppContextProvider>
        </TProvider>
      </body>
    </html>
  )
}
