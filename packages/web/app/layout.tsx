import "./globals.css";

import { Navbar } from "@/components";
import Providers from "./Providers";
import { ModalsPortal } from "./ModalsPortal";
import { AlertsPortal } from "./AlertsPortal";
export const metadata = {
  title: "Youtube video sharing app",
  description: "Youtube video sharing app",
};
import { Montserrat } from "next/font/google";

// If loading a variable font, you don't need to specify the font weight
const montser = Montserrat({ subsets: ["latin"] });
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={montser.className + " " + "relative"}>
        <Providers>
          <Navbar />
          {children}
          <ModalsPortal></ModalsPortal>
          <AlertsPortal></AlertsPortal>
        </Providers>
      </body>
    </html>
  );
}
