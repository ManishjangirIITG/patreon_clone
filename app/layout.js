import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
// import dynamic from "next/dynamic";
import SessionWrapper from "@/components/SessionWrapper";

const inter = Inter({ subsets: ["latin"] });
// const Navbar = dynamic(()=>import('@/components/Navbar'))

export const metadata = {
  title: "Patreon Clone",
  description: "A patreon clone made with react nextjs express and mongodb. This is a crowdfunding website for creaters",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">
        <SessionWrapper>
          <Navbar />
          <main className="min-h-[calc(100vh-8rem)] bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px] text-white">
            {children}
          </main>
          <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}
