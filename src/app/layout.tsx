import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { authOptions } from "@/shared/authOptions";
import Provider from "../context/client-provider";
import { getServerSession } from "next-auth";
import { Toaster } from "sonner";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Clothes E-commerce",
    template: "%s | Clothes E-commerce",
  },
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <Provider session={session}>
        <body className={inter.className}>{children}</body>
        <Toaster position="top-right" />
      </Provider>
    </html>
  );
}
