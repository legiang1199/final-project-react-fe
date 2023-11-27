import {
  Avatar,
  Typography,
  Button,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,

} from "@material-tailwind/react";
import {
  MapPinIcon,
  BriefcaseIcon,
  BuildingLibraryIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import { Footer } from "@/widgets/layout";
import UserApi from "@/api/userApi";
import { useEffect, useState } from "react";
import ProductList from "@/components/product/productList";
import AuctionList from "@/components/auction/auctionList";
import ProductApi from "@/api/productApi";
import jwt_decode from "jwt-decode";
import React from "react";
import ProductByUser from "@/components/product/productByUser";
import EditProfile from "@/components/user/editProfile";
import AuctionByUser from "@/components/auction/auctionByUser";
import StatsApi from "@/api/statsApi";
import BidByUser from "@/components/bid/bidByUser";


export function Profile() {
  const [user, setUser] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [userProducts, setUserProducts] = useState([]);
  const [stats, setStats] = useState([]);
  const [statsA, setStatsA] = useState([]);
  // const { id } = useParams();
  const token = localStorage.getItem("token");
  const decoded = jwt_decode(token);
  const userId = decoded.id;
  const role = decoded.role;
  const data = [
    {
      label: "Profile",
      value: "profile",
      icon: UserCircleIcon,
      desc: <EditProfile />,
    },
    {
      label: "Products",
      value: "products",
      icon: BriefcaseIcon,
      desc: <ProductByUser />,
    },
    {
      label: "Auctions",
      value: "auctions",
      icon: BuildingLibraryIcon,
      desc: <AuctionByUser />,
    },
    {
      label: "Bids",
      value: "bids",
      icon: BuildingLibraryIcon,
      desc: <BidByUser />,
    },
  ];

useEffect(() => {
    StatsApi.statsProductByUser(userId)
      .then((data) => {
        setStats(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  , []);
  useEffect(() => {
    StatsApi.statsAuctionByUser(userId)
      .then((data) => {
        setStatsA(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  , []);

  useEffect(() => {
    if (status === "idle") {
      setStatus("pending");

      UserApi.getUserById(userId)
        .then((data) => {
          setUser(data);
          setStatus("success");
        })
        .catch((error) => {
          setError(error);
          setStatus("error");
        });
    }
  }, [status]);
  return (
    <>
      <section className="relative block h-[50vh]">
        <div className="bg-profile-background absolute top-0 h-full w-full bg-[url('/img/background-1.jpg')] bg-cover bg-center" />
        <div className="absolute top-0 h-full w-full bg-black/75 bg-cover bg-center" />
      </section>
      <section className="relative bg-blue-gray-50/50 px-4 py-16">
        <div className="container mx-auto">
          <div className="relative -mt-64 mb-6 flex w-full min-w-0 flex-col break-words rounded-3xl bg-white shadow-xl shadow-gray-500/5">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="flex w-full justify-center px-4 lg:order-2 lg:w-3/12">
                  <div className="relative">
                    <div className="-mt-20 w-40">
                      <Avatar
                        src={(user.imgUrl)? user.imgUrl : "/public/img/team-1.jpg" }
                        alt="Profile picture"
                        variant="circular"
                        className="h-full w-full shadow-xl"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-10 flex w-full justify-center px-4 lg:order-3 lg:mt-0 lg:w-4/12 lg:justify-end lg:self-center">
                  <Menu>
                    <MenuHandler>
                      <Button>Action</Button>
                    </MenuHandler>
                    <MenuList>
                      {role === "admin" ? (
                      <MenuItem><a href="/profile/admin">ADMIN</a></MenuItem>):(null)}
                      <MenuItem><a href="/product/create">Create Product</a></MenuItem>
                      <MenuItem><a href="/auction/create">Create Auction</a></MenuItem>
                    </MenuList>
                  </Menu>
                </div>
                <div className="w-full px-4 lg:order-1 lg:w-4/12">
                  <div className="flex justify-center py-4 pt-8 lg:pt-4">
   
                    <div className="mr-4 p-3 text-center">
                      {stats ? (
                        <div>
                          <Typography
                            variant="lead"
                            color="blue-gray"
                            className="font-bold uppercase"
                          >
                            {stats.totalProducts} 
                          </Typography>
                        </div>
                      ) : (
                        <Typography variant="paragraph" color="blue-gray">
                          ?
                        </Typography>
                      )}
                      <Typography
                        variant="small"
                        className="font-normal text-blue-gray-500"
                      >
                        Products
                      </Typography>
                    </div>
                    <div className="p-3 text-center lg:mr-4">
                    {statsA ? (
                        <div>
                          <Typography
                            variant="lead"
                            color="blue-gray"
                            className="font-bold uppercase"
                          >
                            {statsA.totalAuctions} 
                          </Typography>
                        </div>
                      ) : (
                        <Typography variant="paragraph" color="blue-gray">
                          ?
                        </Typography>
                      )}
                      <Typography
                        variant="small"
                        className="font-normal text-blue-gray-500"
                      >
                        Auctions
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
              <div className="my-8 text-center">
                <Typography variant="h2" color="blue-gray" className="mb-2">
                  {user.fullname}
                </Typography>
              </div>
              <Tabs value="profile" >
                <TabsHeader>
                  {data.map(({ label, value, icon }) => (
                    <Tab key={value} value={value}>
                      <div className="flex items-center gap-2">
                        {React.createElement(icon, { className: "w-5 h-5" })}
                        {label}
                      </div>
                    </Tab>
                  ))}
                </TabsHeader>
                <TabsBody>
                  {data.map(({ value, desc }) => (
                    <TabPanel key={value} value={value}>
                      {desc}
                    </TabPanel>
                  ))}
                </TabsBody>
              </Tabs>
            </div>
          </div>
        </div>
      </section>
      <div className="bg-blue-gray-50/50">
        <Footer />
      </div>
    </>
  );
}

export default Profile;
