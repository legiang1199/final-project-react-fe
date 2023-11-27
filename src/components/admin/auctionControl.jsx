import { useEffect } from "react";
import { useState } from "react";
import AuctionApi from "@/api/auctionApi";
import CategoryApi from "@/api/categoryApi";
import UserApi from "@/api/userApi";
import ProductApi from "@/api/productApi";
import { Button } from "antd";

export default function allAuctions() {
  const [auctions, setAuctions] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [category, setCategory] = useState([]);
  const [user, setUser] = useState([]);
  const [product, setProduct] = useState([]);

  useEffect(() => {
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
      CategoryApi.getAllCategories()
        .then((data) => {
          setCategory(data);
        })
        .catch((error) => {
          console.log(error);
        });
      UserApi.getAllUsers()
        .then((data) => {
          setUser(data);
        })
        .catch((error) => {
          console.log(error);
        });
      ProductApi.getAllProducts()
        .then((data) => {
          setProduct(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [status]);

  const formatStartingPrice = (starting_price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(starting_price);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Intl.DateTimeFormat("en-US", options).format(
      new Date(dateString)
    );
  };

  const filteredAuctions = auctions.filter(
    (auction) => new Date(auction.auction_end) < new Date()
  );
  const sendEmail = (id) => {
    AuctionApi.getAuctionById(id)
      .then((data) => {
        console.log(data);
        setStatus("success");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (status === "idle" || status === "pending") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>{error.message}</div>;
  }

  if (status === "success") {
    return (
      <div className="flex flex-auto gap-4">
        <table className="table-auto">
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Product</th>
            <th className="px-4 py-2">Owner</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Current Price</th>
            <th className="px-4 py-2">Auction Start</th>
            <th className="px-4 py-2">Auction End</th>
            <th className="px-4 py-2">View</th>
            <th className="px-4 py-2">Email Status</th>
            <th className="px-4 py-2">Send Email</th>
          </tr>
          {filteredAuctions.map((auction) => (
            <tbody key={auction._id}>
              <tr>
                <td className="border px-4 py-2">{auction.name}</td>
                <td className="border px-4 py-2" key={auction.product}>
                  {product.map((pro) => {
                    if (pro._id === auction.product) {
                      return pro.name;
                    }
                  })}
                </td>
                <td className="border px-4 py-2" key={auction.owner}>
                  {user.map((use) => {
                    if (use._id === auction.owner) {
                      return use.fullname;
                    }
                  })}
                </td>
                <td className="border px-4 py-2" key={auction.category}>
                  {category.map((cate) => {
                    if (cate._id === auction.category) {
                      return cate.name;
                    }
                  })}
                </td>
                <td className="border px-4 py-2">
                  {formatStartingPrice(auction.starting_price)}
                </td>
                <td className="border px-4 py-8">
                  {formatDate(auction.auction_start)}
                </td>
                <td className="border px-4 py-2">
                  {formatDate(auction.auction_end)}
                </td>
                <td className="border px-4 py-2">
                  <a href={`/auction/${auction._id}`}>View</a>
                </td>
                <td
                  className={`border px-4 py-2 ${
                    auction.emailSent ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {auction.emailSent ? "Sent" : "Not Sent"}
                </td>
                <td className="border px-4 py-2">
                  <Button onClick={() => sendEmail(auction._id)}>
                    Send Email
                  </Button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    );
  }

  return <div>Something unexpected happened</div>;
}
