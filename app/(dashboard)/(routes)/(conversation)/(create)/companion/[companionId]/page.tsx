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

    const companion = await prisma.companion.findUnique({
        where: {
          id: params.companionId,
        }
      });
    
      const categories = await prisma.category.findMany();

  return ( 
     <CompanionForm initialData={companion} categories={categories} />
  );
}
 
export default CompanionIdPage;