import { SongLanding } from "./components/SongLanding";
import { getPageMetadata } from "./content";

export const metadata = getPageMetadata("ru");

export default function Home() {
  return <SongLanding localeId="ru" />;
}
