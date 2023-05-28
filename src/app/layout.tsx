import "./globals.css";

import ClientOnly from "./components/ClientOnly";
import LoginModal from "./components/modals/LoginModal";
import Modal from "./components/modals/Modal";
import Navbar from "./components/navbar/Navbar";
import { Nunito } from "next/font/google";
import RegisterModal from "./components/modals/RegisterModal";
import RentModal from "./components/modals/RentModal/RentModal";
import ToastProvider from "./providers/ToastProvider";
import getCurrentUser from "./actions/getCurrentUser";

// const Navbar = dynamic(() => import("./components/navbar/Navbar"), {
//   ssr: false,
// });

const nunitoFont = Nunito({
  subsets: ["latin"],
});

export const metadata = {
  title: "Airbnb",
  description: "Airbnb Clone",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={nunitoFont.className}>
        <ClientOnly>
          <ToastProvider />
          <RentModal />
          <LoginModal />
          <RegisterModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
