import { Outfit, Ovo } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "./components/toast/ToastProvider";
import { THEME_IDS } from "./(site)/components/theme/themes";

const outfit = Outfit({
  subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-outfit-raw"
});


const ovo = Ovo({
  subsets: ["latin"], weight: ["400"], variable: "--font-ovo-raw",
});

const themeBootstrap = `(()=>{try{const v=${JSON.stringify(THEME_IDS)},s=localStorage.getItem('theme'),t=v.includes(s)?s:(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'),d=t==='dark'||t==='spiderman',r=document.documentElement;r.dataset.theme=t;r.dataset.colorScheme=d?'dark':'light';r.classList.toggle('dark',d);r.style.colorScheme=d?'dark':'light'}catch{}})()`;


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
    <html
      lang="en"
      className="scroll-smooth"
      data-theme="light"
      data-color-scheme="light"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      </head>
      <body
        className={`${outfit.variable} ${ovo.variable} antialiased leading-8 overflow-x-hidden`}
      >
        <ToastProvider>
        {children}
        </ToastProvider>
      </body>
    </html>
  );
}
