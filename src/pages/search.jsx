import React, { useState, useEffect } from "react";
import AuctionApi from "@/api/auctionApi";

function Search() {
  const [auctions, setAuctions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredAuctions, setFilteredAuctions] = useState([]);

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
      <input
        type="text"
        placeholder="Search for auctions..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div>
        {filteredAuctions.map((auction) => (
          <div key={auction.id}>
            <h3>{auction.name}</h3>
            {/* Display other auction details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
