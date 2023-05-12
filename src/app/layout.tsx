import Navbar from "../components/Navbar/Navbar";
import "./globals.css";
import { Montserrat } from "next/font/google";
import RegisterModal from "@/components/Modals/RegisterModal";

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
      <body className={inter.className} suppressContentEditableWarning={true}>
        <RegisterModal />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
