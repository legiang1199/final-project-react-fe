import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import BidApi from "@/api/bidApi";
import UserApi from "@/api/userApi";
import AuctionApi from "@/api/auctionApi";

function HighBid() {
  const { id } = useParams();
  const [bids, setBids] = useState([]);
  const [auction, setAuction] = useState([]);
  const [user, setUser] = useState([]);


  useEffect(() => {

    AuctionApi.getAuctionById(id)
      .then((data) => {
        setAuction(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });

    UserApi.getUserById(auction.owner)
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id, auction.owner]);


  return (
    <div className="high-bid">
        <Link to={`/profile/${user._id}`}>
      <h2>High Bid</h2>
      <p>High Bidder: {user.fullname}</p>
      </Link>
    </div>
  );
}

export default HighBid;
