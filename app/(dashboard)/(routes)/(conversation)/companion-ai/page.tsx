import { SearchInput } from "@/components/search-input"
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
      <SearchInput />
    </div>
  )
}

export default RootPage