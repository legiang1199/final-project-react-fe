import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
  IconButton,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { UsersIcon } from "@heroicons/react/24/solid";
import { PageTitle, Footer } from "@/widgets/layout";
import { FeatureCard, TeamCard } from "@/widgets/cards";
import { featuresData, teamData, contactData } from "@/data";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductList from "@/components/product/productList";
import AuctionList from "@/components/auction/auctionList";

export function Home() {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const url = `http://localhost:3000/auth/google/login/success`;
      const { data } = await axios.get(url, { withCredentials: true });
      setUser(data.user._json);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <div className="relative flex h-screen content-center items-center justify-center pb-32 pt-16">
        <div className="absolute top-0 h-full w-full bg-[url('/public/img/home.svg')] bg-cover bg-center" />
        <div className="absolute top-0 h-full w-full bg-black/75 bg-cover bg-center" />
        <div className="max-w-8xl container relative mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="ml-auto mr-auto w-full px-4 text-center lg:w-8/12">
              <Typography
                variant="h1"
                color="white"
                className="mb-6 font-black"
              >
                Bắt đầu với cuộc giao dịch của bạn
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <section className="-mt-32 bg-gray-50 px-4 pb-20 pt-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuresData.map(({ color, title, icon, description }) => (
              <FeatureCard
                key={title}
                color={color}
                title={title}
                icon={React.createElement(icon, {
                  className: "w-5 h-5 text-white",
                })}
                description={description}
              />
            ))}
          </div>
          <div className="mt-12 flex flex-wrap items-center">
            <section>
              <Card className=" mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <PageTitle heading="Auctions are going on"></PageTitle>
                <AuctionList />
              </Card>
            </section>
            <section>
              <Card className="max-w1xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <PageTitle heading="The product is being approved">
                  Will be auctioned in the near future
                </PageTitle>
                <ProductList />
              </Card>
            </section>
          </div>
        </div>
      </section>

      <div className="bg-blue-gray-50/50">
        <Footer />
      </div>
    </>
  );
}

export default Home;
