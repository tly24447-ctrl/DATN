import { FirebaseProvider } from "@/src/presentation/context/FirebaseContext";
import { CartProvider } from "@/src/presentation/context/CartContext";
import { WebSettingProvider } from "@/src/presentation/context/WebSettingContext"; // New
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import React from "react";
import "./globals.css";
import { LanguageProvider } from "@/src/presentation/context/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BookHaven", // Default title
  description: "Your premium bookstore",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50`}>
        <React.StrictMode>
          <FirebaseProvider>
            <WebSettingProvider> {/* Wrapped settings here */}
              <CartProvider>
                <LanguageProvider>
                  {children}
                </LanguageProvider>
              </CartProvider>
            </WebSettingProvider>
          </FirebaseProvider>
        </React.StrictMode>
      </body>
    </html>
  );
}