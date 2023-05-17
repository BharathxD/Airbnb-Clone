import Navbar from "../components/Navbar/Navbar";
import "./globals.css";
import { Nunito } from "next/font/google";
import RegisterModal from "@/components/Modals/RegisterModal";
import ToasterProvider from "../providers/ToasterProvider";
import LoginModal from "@/components/Modals/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";
import RentModal from "@/components/Modals/RentModal";

const inter = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "Airbnb",
  description: "This is an Airbnb Clone",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <ToasterProvider />
        <RegisterModal />
        <LoginModal />
        <RentModal />
        <Navbar currentUser={currentUser} />
        {children}
      </body>
    </html>
  );
}
