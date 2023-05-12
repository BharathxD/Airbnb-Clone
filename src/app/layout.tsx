import Navbar from "../components/Navbar/Navbar";
import "./globals.css";
import { Montserrat } from "next/font/google";
import RegisterModal from "@/components/Modals/RegisterModal";
import ToasterProvider from "../providers/ToasterProvider";

const inter = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Airbnb",
  description: "This is an Airbnb Clone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <ToasterProvider />
        <RegisterModal />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
