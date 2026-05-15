import "./globals.css";
import { CookieBanner } from "./components/CookieBanner";

export const metadata = {
  metadataBase: new URL("https://playsonline.live"),
  title: "PlaysOnline | Авторские песни для мероприятий",
  description:
    "Яркий сайт студии, которая создает персональные песни для свадеб, дней рождения, корпоративов и любых важных событий.",
  openGraph: {
    title: "PlaysOnline | Авторские песни для мероприятий",
    description:
      "Персональная песня с вашим сюжетом, вокалом и студийным звучанием для события, которое хочется запомнить.",
    images: ["/song-studio-stage.png"],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru" dir="ltr" suppressHydrationWarning>
      <body>
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
