import { AdminSongs } from "./AdminSongs";
import { redirect } from "next/navigation";
import { isAdminCookieAuthorized } from "../lib/admin-auth";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "PlaysOnline Admin | MP3 examples",
  description: "Upload and manage seven MP3 examples for the PlaysOnline landing page.",
};

export default async function AdminPage() {
  if (!(await isAdminCookieAuthorized())) {
    redirect("/admin/login");
  }

  return <AdminSongs />;
}
