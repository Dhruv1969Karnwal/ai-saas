import getCurrentUser from "@/lib/session";



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

  return ( 
    <div>{userId}</div>
  );
}
 
export default CompanionIdPage;