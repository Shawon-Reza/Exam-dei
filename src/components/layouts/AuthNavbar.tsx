import { getCurrentUser } from "@/src/apis/auth/getCurrentUser";
import Navbar from "./Navbar";

export default async function AuthNavbar() {
  const user = await getCurrentUser();

  return <Navbar initialUser={user} />;
}
