import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BidApi from "@/api/bidApi";

function CreateBid() {
    const { auctionId } = useParams();
    const [auction, setAuction] = useState(null);
    const [bidAmount, setBidAmount] = useState("");
    const [bidHistory, setBidHistory] = useState([]);

    useEffect(() => {
        BidApi.createBid(auctionId)
            .then((data) => {
                setAuction(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        if (auction) {
            BidApi.getBidHistory(auction.id)
                .then((data) => {
                    setBidHistory(data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }
    , [auction]);



    return (
        <div>
            {auction && (
                <div>
                    <h2>{auction.title}</h2>
                    <p>{auction.description}</p>
                    <p>Current bid: {auction.currentBid}</p>
                    <form onSubmit={handleBidSubmit}>
                        <label htmlFor="bidAmount">Bid amount:</label>
                        <input
                            type="number"
                            id="bidAmount"
                            value={bidAmount}
                            onChange={(event) => setBidAmount(event.target.value)}
                        />
                        <button type="submit">Place bid</button>
                    </form>
                    <h3>Bid history:</h3>
                    <ul>
                        {bidHistory.map(bid => (
                            <li key={bid.id}>{bid.amount}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default CreateBid;
