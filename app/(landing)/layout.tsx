import MainChatBot from "@/components/MainChatBot";

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-full bg-[#111827] overflow-auto">
      <div className="mx-auto max-w-screen-xl h-full w-full">
      <MainChatBot />
        {children}
        </div>
    </main>
  );
};

export default LandingLayout;
