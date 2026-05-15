import { redirect } from "next/navigation";
import { isAdminCookieAuthorized } from "../../lib/admin-auth";
import { AdminLogin } from "./AdminLogin";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "PlaysOnline Admin | Login",
  description: "Password-protected login for PlaysOnline MP3 examples admin.",
};

export default async function AdminLoginPage() {
  if (await isAdminCookieAuthorized()) {
    redirect("/admin");
  }

  return <AdminLogin />;
}
