import { Settings } from "lucide-react";

import { Heading } from "@/components/heading";

const SettingsPage = async () => {

  return ( 
    <div>
      <Heading
        title="Settings"
        description="Manage account settings."
        icon={Settings}
        iconColor="text-gray-700"
        bgColor="bg-gray-700/20"
      />
      <div className="px-4  lg:px-8 space-y-4">
      </div>
    </div>
   );
}
 
export default SettingsPage;
