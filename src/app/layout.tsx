import Navbar from "../components/Navbar/Navbar";
import "./globals.css";
import { Montserrat } from "next/font/google";
import RegisterModal from "@/components/Modals/RegisterModal";
import ToasterProvider from "../providers/ToasterProvider";
import LoginModal from "@/components/Modals/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";

const inter = Montserrat({ subsets: ["latin"] });

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
  console.log(currentUser);
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <ToasterProvider />
        <RegisterModal />
        <LoginModal />
        <Navbar currentUser={currentUser} />
        {children}
      </body>
    </html>
  );
}
