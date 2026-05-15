import { SongLanding } from "../components/SongLanding";
import { getPageMetadata } from "../content";

export const metadata = getPageMetadata("en");

export default function EnglishHome() {
  return <SongLanding localeId="en" />;
}
