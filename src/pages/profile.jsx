import { Avatar, Typography, Button } from "@material-tailwind/react";
import {
  MapPinIcon,
  BriefcaseIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/solid";
import { Footer } from "@/widgets/layout";
import UserApi from "@/api/userApi";
import { useEffect, useState } from "react";
import ProductList from "@/components/product/productList";
import AuctionList from "@/components/auction/auctionList";
import ProductApi from "@/api/productApi";

export function Profile() {
  const [user, setUser] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [userProducts, setUserProducts] = useState([])
  const { id } = useParams();

  useEffect(() => {
    if (status === "idle") {
      setStatus("pending");

      UserApi.getUserById(id)
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
                        src="/img/team-2.jpg"
                        alt="Profile picture"
                        variant="circular"
                        className="h-full w-full shadow-xl"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-10 flex w-full justify-center px-4 lg:order-3 lg:mt-0 lg:w-4/12 lg:justify-end lg:self-center">
                  <Button className="rounded-full bg-blue-400">
                    <a href="/product/create">New</a>
                  </Button>
                </div>
                <div className="w-full px-4 lg:order-1 lg:w-4/12">
                  <div className="flex justify-center py-4 pt-8 lg:pt-4">
                    <div className="mr-4 p-3 text-center">
                      <Typography
                        variant="lead"
                        color="blue-gray"
                        className="font-bold uppercase"
                      >
                        22
                      </Typography>
                      <Typography
                        variant="small"
                        className="font-normal text-blue-gray-500"
                      >
                        Follows
                      </Typography>
                    </div>
                    <div className="mr-4 p-3 text-center">
                      {userProducts.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                          {userProducts.map((product) => (
                            <Typography
                            variant="small"
                            className="font-normal text-blue-gray-500" key={product.id}>
                            </Typography>
                          ))}
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
                      <Typography
                        variant="lead"
                        color="blue-gray"
                        className="font-bold uppercase"
                      >
                        {auctionCount}
                      </Typography>
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
                  {user.email}
                </Typography>
              </div>
              <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                <div className="mt-2 flex flex-wrap justify-center ">
                  <div className="flex w-full flex-col items-center px-4 lg:w-9/12">
                    {/* <AuctionList /> */}
                  </div>
                  <div className="flex w-full flex-col items-center px-4 lg:w-9/12">
                    <ProductList />
                  </div>
                </div>
              </div>
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
