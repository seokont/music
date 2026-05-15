import { SongLanding } from "../components/SongLanding";
import { getPageMetadata } from "../content";

export const metadata = getPageMetadata("he");

export default function HebrewHome() {
  return <SongLanding localeId="he" />;
}
