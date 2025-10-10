import { Outfit, Ovo } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "./components/toast/ToastProvider";

const outfit = Outfit({
  subsets: ["latin"], weight: ["400", "500", "600", "700"]
});


const ovo = Ovo({
  subsets: ["latin"], weight: ["400"], variable: "--font-ovo-raw",
});


export const metadata = {
  title: "Portfolio - Ilija Chrchev",
  description: "",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${outfit.className} ${ovo.className} antialiased leading-8 overflow-x-hidden dark:bg-darkTheme dark:text-white`}
      >
        <ToastProvider>
        {children}
        </ToastProvider>
      </body>
    </html>
  );
}
