import ClientOnly from "@/components/clientOnly";
import  {Navbar}  from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { getApiLimitCount } from "@/lib/api-limit";
import  getCurrentUser  from "@/lib/session"
import { notFound } from "next/navigation"

interface DashboardLayoutProps {
  children?: React.ReactNode
}

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {

  const currentUser = await getCurrentUser();

  const apiLimitCount = await getApiLimitCount();


  if (!currentUser) {
    return notFound()
  }
  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-80 bg-gray-900">
        <ClientOnly>
          <Sidebar apiLimitCount={apiLimitCount}/>
        </ClientOnly>
      </div>
      <main className="md:pl-72 pb-10">
        <Navbar
          // user={{
          //   name: user.name,
          //   image: user.image,
          //   email: user.email,
          // }}
          currentUser={currentUser}
        />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
