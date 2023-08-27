import { redirect } from "next/navigation";
import getCurrentUser from "@/lib/session";
import prisma from "@/lib/db"
import { CompanionForm } from "./components/companion-form";



interface CompanionIdPageProps {
  params: {
    companionId: string;
  };
};

const CompanionIdPage = async ({
  params
}: CompanionIdPageProps) => {
    const currentUser = await getCurrentUser()
    const userId = currentUser?.userId


      const userIdType = typeof userId;

    if (!userId) {
      return redirect("/");
    }

    const companion = await prisma.companion.findUnique({
      where: {
        id: params.companionId,
        // userId,
        // username_email : { username, email },
      },
    });

    
    
      const categories = await prisma.category.findMany();

  return ( 
     <CompanionForm initialData={companion} categories={categories} />
  );
}
 
export default CompanionIdPage;