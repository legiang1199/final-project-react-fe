import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BidApi from "@/api/bidApi";
import UserApi from "@/api/userApi";

function HistoryBidByAuction() {
  const { id } = useParams();
  const [bids, setBids] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [isBid, setIsBid] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const displayedBid = bids.slice(startIndex, endIndex);
  const [totalPages, setTotalPages] = useState(1);
  const [user, setUser] = useState([]);
  

  function formatBidAmount(bid_amount) {
    return bid_amount.toLocaleString("vi", {
        style: "currency",
        currency: "VND",
        });
    }

  function formatDateToDdMmYyyy(date) {
    const options = { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" };
    return new Date(date).toLocaleDateString("en-GB", options);
  }
  useEffect(() => {
    UserApi.getAllUsers()
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [status]);

  useEffect(() => {
    if (status === "idle") {
      // Only send a request when the status is 'idle' (not sent a request before)
      setStatus("pending");

      BidApi.getBidByAuctionId(id)
        .then((data) => {
          setBids(data);
          const totalPages = Math.ceil(data.length / limit);
          setTotalPages(totalPages);
          setStatus("success");
        })
        .catch((error) => {
          setError(error);
          setStatus("error");
        });
    }
  }, [status, id, limit]);

  if (status === "idle" || status === "pending") {
    return (
      <div className="text-center">
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Loading
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Please wait a moment.
        </p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="text-center">
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Error
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Something went wrong: {error.message}
        </p>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="container mx-auto px-4">
        {bids.length === 0 ? (
          <div className="text-center">
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              No bid yet
            </h1>
            <p className="mt-6 text-base leading-7 text-gray-600">
              Be the first to bid
            </p>
          </div>
        ) 
        : (
        <div className="-mx-1 flex flex-wrap lg:-mx-4">
          {displayedBid.map((bid) => (
            <div
              key={bid.id}
              className="my-1 w-full px-1 md:w-1/2 lg:my-4 lg:w-1/2 lg:px-4"
            >
              <div className="overflow-hidden rounded-lg shadow-lg">
                <div className="px-6 py-4">
                  <div className="mb-2 text-xl font-bold" key={bid.user}>
                    {user.map((user) => {
                      if (user._id === bid.user) {
                        return user.fullname;
                      }
                    })}
                  </div>
                    <p className="text-gray-700 text-base">
                        {formatBidAmount(bid.bid_amount)}
                    </p>
                </div>
                <div className="px-6 pb-2 pt-4">
                  <span className="mb-2 mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
                    {formatDateToDdMmYyyy(bid.bid_time)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>)}
      </div>
    );
  }
}

export default HistoryBidByAuction;
