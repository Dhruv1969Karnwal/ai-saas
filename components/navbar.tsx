import { MobileSidebar } from "@/components/mobile-sidebar";

import { SafeUser } from "@/lib/safeUser";
import { NavbarTop } from "@/components/navbar-top";
import { getApiLimitCount } from "@/lib/api-limit";

interface NavbarProps {
  currentUser?: SafeUser | null;
}

export async  function Navbar({ currentUser }: NavbarProps) {
  const apiLimitCount = await getApiLimitCount();
  return (
    <div className="flex items-center p-4 justify-between">
      <MobileSidebar apiLimitCount={apiLimitCount} />
      <NavbarTop currentUser={currentUser} />
    </div>
  );
}
