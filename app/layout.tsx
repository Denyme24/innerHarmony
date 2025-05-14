import type { Metadata } from "next";
import { Nunito_Sans, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Chatbot from "@/components/Chatbot";

const nunito = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
  weight: ["300", "400", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "InnerHarmony | Mental Well-being Platform for Women",
  description:
    "A safe space for women's mental health with guided therapy, AI counseling and a supportive community.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} ${cormorant.variable}`}>
        {children}
        <Chatbot />
      </body>
    </html>
  );
}
