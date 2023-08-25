
interface RootPageProps {
  searchParams: {
    categoryId: string;
    name: string;
  };
};

const RootPage = async ({
  searchParams
}: RootPageProps) => {

  return (
    <div className="h-full p-4 space-y-2">
    </div>
  )
}

export default RootPage