import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserApi from "@/api/userApi";
import { Carousel, Button, Typography } from "@material-tailwind/react";
import AuctionApi from "@/api/auctionApi";
import CreateBid from "@/components/bid/createBid";
import ProductApi from "@/api/productApi";
import BidApi from "@/api/bidApi";
import jwt_decode from "jwt-decode";
import { useFormik } from "formik";
import * as Yup from "yup";
import HistoryBidByAuction from "../bid/historyBidByAuction";
import { Footer } from "@/widgets/layout";
import HighBid from "../bid/highBid";

function AuctionDetail() {
  const [user, setUser] = useState([]);
  const [auction, setAuction] = useState([]);
  const [product, setProduct] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const { id } = useParams();
  const [isBid, setIsBid] = useState(false);
  const token = localStorage.getItem("token");
  const decoded = jwt_decode(token);
  const userId = decoded.id;

  const [timeLeft, setTimeLeft] = useState(null);
  const calculateTimeLeft = () => {
    const now = new Date();
    const timeDifference = auctionEnd - now;
    if (timeDifference > 0) {
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    } else {
      // Phiên đấu giá đã kết thúc
      setTimeLeft(null);
    }
  };

  useEffect(() => {
    const timer = setInterval(calculateTimeLeft, 1000);

    // Đảm bảo rằng bạn xóa timer khi component bị unmount
    return () => {
      clearInterval(timer);
    };
  }, [status]);

  const renderTimeLeft = () => {
    if (timeLeft) {
      return (
        <div>
          {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m{" "}
          {timeLeft.seconds}s
        </div>
      );
    } else {
      return <div>Auction is closed</div>;
    }
  };

  const now = new Date();
  const auctionEnd = new Date(auction.auction_end);
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

  const validationSchema = Yup.object().shape({
    bid_amount: Yup.number().required("Bid amount is required"),
  });

  const formik = useFormik({
    initialValues: {
      auction: id,
      user: userId,
      bid_amount: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (data, { setSubmitting, setStatus }) => {
      try {
        await BidApi.createBid(data);
        setStatus("success");
        alert("Create bid successfully");
      } catch (error) {
        console.error("Error:", error);
        alert("Bid amount must be greater than current bid");
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    ProductApi.getProductById(auction.product)
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [status]);

  useEffect(() => {
    UserApi.getUserById(auction.owner)
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [status]);

  useEffect(() => {
    if (status === "idle") {
      // Chỉ gửi yêu cầu khi trạng thái là 'idle' (chưa gửi yêu cầu trước đó)
      setStatus("pending");

      AuctionApi.getAuctionById(id)
        .then((data) => {
          setAuction(data);
          setStatus("success");
        })
        .catch((error) => {
          setError(error);
          setStatus("error");
        });
    }
  }, [status]);

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
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="pt-6">
            {/* Image gallery */}

            <Carousel className="rounded-xl">
              <img
                src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
                alt="image 1"
                className="h-full w-full object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
                alt="image 2"
                className="h-full w-full object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
                alt="image 3"
                className="h-full w-full object-cover"
              />
            </Carousel>
          </div>

          <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
            <div className="lg:col-span-1 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {auction.name}
              </h1>
              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Details</h2>
                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600" key={auction.product}>
                    {product.description}
                  </p>
                </div>
              </div>
              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Seller</h2>
                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600 " key={auction.owner}>
                    {user.fullname}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-12 lg:row-span-2 lg:mt-0">
              <div>
                <h2 className="text-sm font-medium text-gray-900">Status</h2>
                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600">
                    <span
                      className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${badgeClass}`}
                    >
                      {badgeText}
                    </span>
                  </p>
                </div>
              </div>
              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Time</h2>
                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600">
                    {formatDateToDdMmYyyy(auction.auction_start)} -{" "}
                    {formatDateToDdMmYyyy(auction.auction_end)}
                  </p>
                </div>
              </div>

              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">
                  Current Bid
                </h2>
                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600">
                    {formatBidAmount(auction.starting_price)}
                  </p>
                </div>
              </div>
            </div>

            <div className=" mt-4 lg:row-span-3 lg:mt-0">
              {}
              {isBid ? (
                <div>
                  <form onSubmit={formik.handleSubmit}>
                    <div className="">
                      <h2 className="text-sm font-medium text-gray-900">Bid</h2>
                      <div className="mt-4 space-y-6">
                        <input
                          type="number"
                          name="bid_amount"
                          id="bid_amount"
                          onChange={formik.handleChange}
                          value={formik.values.bid_amount}
                          placeholder="Enter bid amount"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                        />
                        {formik.errors.bid_amount &&
                        formik.touched.bid_amount ? (
                          <div>{formik.errors.bid_amount}</div>
                        ) : null}
                      </div>
                      <div className="mt-4 flex justify-between">
                        <Button
                          color="black"
                          className="w-80 max-w-screen-lg font-bold sm:w-96"
                          type="submit"
                        >
                          <Typography color="white">Place Bid</Typography>
                        </Button>
                      </div>
                    </div>
                  </form>
                </div>
              ) : (
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                    {auction.currentBid}
                  </h1>
                </div>
              )}
              <div className="mt-4 flex justify-between">
                {isBid ? (
                  <Button
                    color="red"
                    className="w-80 max-w-screen-lg font-bold sm:w-96"
                    onClick={() => setIsBid(false)}
                  >
                    <Typography color="white">Cancel</Typography>
                  </Button>
                ) : (
                  <div>
                    {auctionClosed ? (
                      <div className="justify-between">
                        <Button
                          color="black"
                          className="w-80 max-w-screen-lg font-bold sm:w-96"
                          disabled
                        >
                          <div className="space-y-6">{renderTimeLeft()}</div>
                          <Typography color="white">Place Bid</Typography>
                        </Button>
                        <Button
                          color="green"
                          className="mt-2 w-80 max-w-screen-lg font-bold sm:w-96"
                          
                          >
                            <HighBid/>
                          </Button>
                      </div>
                    ) : (
                      <Button
                        color="black"
                        className="w-80 max-w-screen-lg font-bold sm:w-96"
                        onClick={() => setIsBid(true)}
                      >
                        <div className="space-y-6">{renderTimeLeft()}</div>
                        <Typography color="white">Place Bid</Typography>
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <Typography
          variant="h4"
          color="blue-gray"
          className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8"
        >
          History Bid
        </Typography>
        <HistoryBidByAuction />
        <Footer />
      </div>
    );
  }
}
export default AuctionDetail;
