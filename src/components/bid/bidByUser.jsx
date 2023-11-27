import React, { useState, useEffect } from "react";
import AuctionApi from "@/api/auctionApi";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import BidApi from "@/api/bidApi";
import { Button } from "@material-tailwind/react";
function BidByUser() {
  const [bids, setBids] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const displayedBids = bids.slice(startIndex, endIndex);
  const [totalPages, setTotalPages] = useState(1);
  const token = localStorage.getItem("token");
  const decoded = jwt_decode(token);
  const userId = decoded.id;
  const [auctions, setAuctions] = useState([]);

  const now = new Date();
  const auctionEnd = new Date(auctions.auction_end);
  const auctionClosed = auctionEnd < now;
  const badgeClass = auctionClosed
    ? "bg-red-100 text-red-800"
    : "bg-green-100 text-green-800";
  const badgeText = auctionClosed ? "Closed" : "Open";

  function formatBidAmount(bid_amount) {
    return bid_amount.toLocaleString("vi", {
      style: "currency",
      currency: "VND",
    });
  }

  function formatDateToDdMmYyyy(date) {
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(date).toLocaleDateString("en-GB", options);
  }

  useEffect(() => {
    AuctionApi.getAllAuctions()
      .then((data) => {
        setAuctions(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [status]);

  useEffect(() => {
    const totalPages = Math.ceil(bids.length / limit);
    setTotalPages(totalPages);

    if (status === "idle") {
      // Only send a request when the status is 'idle' (not sent a request before)
      setStatus("pending");

      BidApi.getBidByUserId(userId)
        .then((data) => {
          setBids(data);
          setStatus("success");
        })
        .catch((error) => {
          setError(error);
          setStatus("error");
        });
    }
  }, [status]);

  return (
    <div className="-mx-4 flex flex-wrap">
      {displayedBids.map((bid) => (
        <div
          className="mb-8 w-full px-4 md:w-1/2 lg:w-1/3 xl:w-1/4"
          key={bid._id}
        >
          <div className="card mb-4">
            <div className="card-body flex flex-auto">
              <div>
                <p className="relative" key={bid.auction}>
                  {auctions.map((auctions) => {
                    if (auctions._id === bid.auction) {
                      return auctions.name;
                    }
                  })}
                </p>
                <p className="card-text">
                  Bid amount: {formatBidAmount(bid.bid_amount)}
                </p>
                <p className="card-text">
                  Bid time: {formatDateToDdMmYyyy(bid.bid_time)}
                </p>
              </div>
              <Link to={`/auction/${bid.auction}`}>
                <Button
                  className={`card-title ${badgeClass}`}
                  key={bid.auction}
                >
                  {auctions.map((auctions) => {
                    if (auctions._id === bid.auction  && auctions.auction_end > now) {
                      return auctions.auction_end
                    }
                  })}
                  {badgeText}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BidByUser;
