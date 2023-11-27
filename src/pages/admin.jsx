import React from "react";
import { Tabs, TabsHeader, Tab } from "@material-tailwind/react";
import UserControl from "@/components/admin/userControl";
// import StatsAll from "@/components/admin/statsAll";
import AuctionControl from "@/components/admin/auctionControl";
import ProductByUser from "@/components/product/productByUser";
import EditProfile from "@/components/user/editProfile";
import { TabPanel, TabsBody } from "@material-tailwind/react";
import {
  BriefcaseIcon,
  BuildingLibraryIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
function Admin() {
  const data = [
    {
      value: "usercontrol",
      icon: UserCircleIcon,
      desc: <UserControl />,
    },
    {
      value: "auctionsControl",
      icon: BuildingLibraryIcon,
      desc: <AuctionControl />,
    },
    // {
    //   value: "stats",
    //   icon: BriefcaseIcon,
    //   desc: <StatsAll />,
    // }
  ];
  return (
  
      <div className="pt-28">
        <Tabs value="usercontrol">
          <TabsHeader className="w-auto">
            {data.map(({ label, value, icon }) => (
              <Tab key={value} value={value}>
                {React.createElement(icon, { className: "w-5 h-5" })}
                {label}
              </Tab>
            ))}
          </TabsHeader>
          <div class="flex justify-between sm:rounded-xl lg:flex-col lg:px-4 lg:py-10">
            <TabsBody>
              {data.map(({ value, desc }) => (
                <TabPanel key={value} value={value} className="py-0">
                  {desc}
                </TabPanel>
              ))}
            </TabsBody>
          </div>
        </Tabs>
        </div>
  );
}

export default Admin;
