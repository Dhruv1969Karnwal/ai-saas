import prisma from "@/lib/db"
import { SearchInput } from "@/components/search-input"
import { Categories } from "@/components/categories"
interface RootPageProps {
  searchParams: {
    categoryId: string;
    name: string;
  };
};

const RootPage = async ({
  searchParams
}: RootPageProps) => {

  const categories = await prisma.category.findMany();

  return (
    <div className="h-full p-4 space-y-2">
      <SearchInput />
      <Categories data={categories} />
    </div>
  )
}

export default RootPage