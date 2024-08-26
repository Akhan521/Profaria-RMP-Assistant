import { DM_Mono, DM_Serif_Text } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Home from "./pages/Home";


const dmSerif = DM_Serif_Text({ subsets: ["latin"], weight: '400', });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={dmSerif.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
