import React, { useState, useEffect } from "react";
import AuctionApi from "@/api/auctionApi";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Typography,
  Button,
  Tooltip,
  Avatar,
  Input,
} from "@material-tailwind/react";

function Search() {
  const [auctions, setAuctions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredAuctions, setFilteredAuctions] = useState([]);

  const [timeRemaining, setTimeRemaining] = useState({});
  const calculateTimeRemaining = () => {
    const now = new Date();
    const remaining = {};
    auctions.forEach((auction) => {
      if (now < new Date(auction.auction_start)) {
        // Auction hasn't started
        remaining[auction._id] = "Auction hasn't started yet";
      } else if (now > new Date(auction.auction_end)) {
        // Auction has ended
        remaining[auction._id] = "Auction has ended";
      } else {
        // Calculate time remaining
        const end = new Date(auction.auction_end);
        const diff = end - now;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        remaining[auction._id] = `${days}d ${hours}h ${minutes}m ${seconds}s`;
      }
    });
    setTimeRemaining(remaining);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Update the time remaining for each auction
      const updatedAuctions = auctions.map((auctionId) => ({
        ...auctionId,
        timeRemaining: calculateTimeRemaining(auctionId),
      }));
      setAuctions(updatedAuctions);
    }, 1000); // Update every second

    return () => {
      clearInterval(intervalId); // Cleanup on unmount
    };
  }, [auctions]);

  function formatStartingPrice(starting_price) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(starting_price);
  }

  useEffect(() => {
    AuctionApi.getAllAuctions()
      .then((data) => {
        setAuctions(data);
      })
      .catch((error) => {
        console.error("Error fetching auctions: ", error);
      });
  }, []);

  useEffect(() => {
    const lowerCaseSearchQuery = searchQuery.toLowerCase();
    const filtered = auctions.filter((auction) => {
      if (auction && auction.name) {
        // Verify that auction and auction.name are defined
        return auction.name.toLowerCase().includes(lowerCaseSearchQuery);
      }
      return false;
    });
    setFilteredAuctions(filtered);
  }, [auctions, searchQuery]);

  return (
    <div>
      <section className="relative block h-20">
        <div className="absolute top-0 h-full w-full bg-black bg-cover bg-center" />
      </section>
      <div className="">
        <h1 className=" text-center mt-6 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Search
        </h1>

        <div>
        <Input
          type="text"
          color="lightBlue"
          size="regular"
          outline={true}
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        </div>
        <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {filteredAuctions.map((auction) => (
            <Card key={auction.id} className="shadow-lg shadow-gray-500/10">
              <CardHeader>
                <img
                  alt="Card Image"
                  src="/img/teamwork.jpeg"
                  className="h-full w-full"
                />
              </CardHeader>
              <CardBody className="grid grid-cols-6 gap-4">
                <Typography
                  variant="h5"
                  color="blue-gray"
                  className="col-span-4 col-start-2 mb-3 truncate font-bold"
                >
                  {auction.name}
                </Typography>
                <Tooltip>
                  <Avatar
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1061&q=80"
                    className="col-start-1 col-end-3 hover:z-10"
                    variant="rounded"
                  />
                </Tooltip>
                <div className="col-span-3 col-end-7">
                  <Typography className="truncate text-right font-normal text-black">
                    {formatStartingPrice(auction.starting_price)}
                  </Typography>
                  <Typography className="text-right font-normal text-black">
                    Current
                  </Typography>
                </div>
              </CardBody>
              <Link to={`/auction/${auction._id}`}>
                <CardFooter>
                  <div className="grid">
                    <Button className="px-auto">Place Bid</Button>
                    <div className="text-center font-normal text-black">
                      {timeRemaining[auction._id]}
                    </div>
                  </div>
                </CardFooter>
              </Link>
            </Card>
          ))}
          <p>
            {filteredAuctions.length === 0
              ? "No auctions found."
              : null}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Search;
