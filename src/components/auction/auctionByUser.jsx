import React, { useEffect, useState } from "react";
import AuctionApi from "@/api/auctionApi";
import jwt_decode from "jwt-decode";
import ProductApi from "@/api/productApi";
import CategoryApi from "@/api/categoryApi";
import { Link } from "react-router-dom";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";


function AuctionByUser() {
  const [auctions, setAuctions] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const displayedAuctions = auctions.slice(startIndex, endIndex);
  const [totalPages, setTotalPages] = useState(1);
  const token = localStorage.getItem("token");
  const decoded = jwt_decode(token);
  const userId = decoded.id;
  const [category, setCategory] = useState([]);
  const [product, setProduct] = useState([]);

  function formatStartingPrice(starting_price) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(starting_price);
  }

  useEffect(() => {
    CategoryApi.getAllCategories()
      .then((data) => {
        setCategory(data);
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
  }, [status]);

  useEffect(() => {
    const totalPages = Math.ceil(auctions.length / limit);
    setTotalPages(totalPages);

    if (status === "idle") {
      // Chỉ gửi yêu cầu khi trạng thái là 'idle' (chưa gửi yêu cầu trước đó)
      setStatus("pending");

      AuctionApi.getAuctionByUserId(userId)
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
      <div className="-mx-4 flex flex-wrap">
        {displayedAuctions.map((auction) => (
          <div
            className="mb-8 w-full px-4 md:w-1/2 lg:w-1/3 xl:w-1/4"
            key={auction._id}
          >
            <Link to={`/auction/${auction._id}`}>
              <div className="relative">
                <div className="relative h-56 w-full overflow-hidden rounded">
                  {product.map((pro) => {
                    if (pro._id === auction.product) {
                      return (
                        <img
                          alt="Card Image"
                          key={auction.product}
                          src={pro.imgUrl}
                          className="h-full w-full"
                        />
                      );
                    }
                  })}
                </div>
                <div className="relative -mt-16 px-4">
                  <div className="rounded-lg bg-white p-6 shadow-lg">
                    <div className="flex items-baseline">
                      <span
                        key={auction.category}
                        className="inline-block rounded-full bg-teal-200 px-2 py-1 text-xs font-semibold uppercase leading-none tracking-wide text-teal-800"
                      >
                        {category.map((cate) => {
                          if (cate._id === auction.category) {
                            return cate.name;
                          }
                        })}
                      </span>
                      <div className="ml-2 text-xs font-semibold uppercase tracking-wider text-gray-600">
                        {auction.status}
                      </div>
                    </div>
                    <h4 className="mt-1 truncate text-lg font-semibold leading-tight text-gray-900">
                      {auction.name}
                    </h4>
                    <div className="mt-1 truncate">
                      {formatStartingPrice(auction.starting_price)} VNĐ
                    </div>
                    <div className="mt-4">
                      <span className="text-md font-semibold text-teal-600">
                        {auction.currentPrice} VNĐ
                      </span>
                      <span className="ml-1 text-sm text-gray-600">/bid</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
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

export default AuctionByUser;
