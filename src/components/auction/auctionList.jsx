import React from "react";
import AuctionApi from "@/api/auctionApi";
import { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
  IconButton,
  Input,
  Textarea,
  CardFooter,
} from "@material-tailwind/react";
import { PageTitle } from "@/widgets/layout";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

function AuctionList() {
  const [auctions, setAuctions] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const displayedAuctions = auctions.slice(startIndex, endIndex);
  const [totalPages, setTotalPages] = useState(1);

  function formatDateToDdMmYyyy(date) {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(date).toLocaleDateString("en-GB", options);
  }
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
    const totalPages = Math.ceil(auctions.length / limit);
    setTotalPages(totalPages);



    if (status === "idle") {
      // Chỉ gửi yêu cầu khi trạng thái là 'idle' (chưa gửi yêu cầu trước đó)
      setStatus("pending");

      AuctionApi.getAllAuctions()
        .then((data) => {
          setAuctions(data);
          setStatus("success");
        })
        .catch((error) => {
          setError(error);
          setStatus("error");
        });
   
    }
  }, [status]);

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
  

  let content;

  if (status === "idle" || status === "pending") {
    return (
      <div className="text-center">
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Loading
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Just a moment, we're fetching that for you.
        </p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="text-center">
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Loading
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Something went wrong: {error.message}
        </p>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="bg-white">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {displayedAuctions.map((auction) => (
            <Link to={`/auction/${auction._id}`}>
              <Card key={auction.id} className="shadow-lg shadow-gray-500/10">
                <CardHeader>
                  <img
                    alt="Card Image"
                    src="/img/teamwork.jpeg"
                    className="h-full w-full"
                  />
                </CardHeader>
                <CardBody>
                  <Typography
                    variant="h5"
                    color="blue-gray"
                    className="mb-3 font-bold"
                  >
                    {auction.starting_price}
                  </Typography>
                  <Typography className="font-normal text-blue-gray-500">
                  {timeRemaining[auction._id]}
                  </Typography>
                </CardBody>
              </Card>
            </Link>
            
          ))}
        </div>
        
        <div className="mt-4 flex justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
              <span className="font-medium">{endIndex}</span> of{" "}
              <span className="font-medium">{auctions.length}</span> results
            </p>
          </div>
          <div>
            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-gray-600"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setPage(i + 1)}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold text-blue-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                    page === i + 1
                      ? "bg-blue-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                      : ""
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setPage(page + 1)}
                disabled={endIndex >= auctions.length}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-gray-600"
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    );
  }
}

export default AuctionList;
