import React, { useEffect, useState } from "react";
import AuctionApi from "@/api/auctionApi";
import jwt_decode from "jwt-decode";
import ProductApi from "@/api/productApi";
import CategoryApi from "@/api/categoryApi";
import { Link } from "react-router-dom";

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
            <div className="flex flex-wrap -mx-4">
                {displayedAuctions.map((auction) => (
                    <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-4 mb-8" key={auction._id}>
                        <Link to={`/auction/${auction._id}`}>

                        <div className="relative">
                            <div className="relative w-full h-56 rounded overflow-hidden">
                                <img
                                    src="/public/img/teamwork.jpeg"
                                    alt={auction.name}
                                    className="absolute inset-0 w-full h-full object-cover object-center"
                                />
                            </div>
                            <div className="relative px-4 -mt-16">
                                <div className="bg-white p-6 rounded-lg shadow-lg">
                                    <div className="flex items-baseline">
                                        <span key={auction.category} className="inline-block px-2 py-1 leading-none bg-teal-200 text-teal-800 rounded-full font-semibold uppercase tracking-wide text-xs">
                                            {category.map((cate) => {
                                                if (cate._id === auction.category) {
                                                    return cate.name;
                                                }
                                            }
                                            )}
                                        </span>
                                        <div className="ml-2 text-gray-600 uppercase text-xs font-semibold tracking-wider">
                                            {auction.status}
                                        </div>
                                    </div>
                                    <h4 className="mt-1 text-gray-900 font-semibold text-lg leading-tight truncate">
                                        {auction.name}
                                    </h4>
                                    <div className="mt-1 truncate">
                                        {formatStartingPrice(auction.starting_price)} VNĐ
                                    </div>
                                    <div className="mt-4">
                                        <span className="text-teal-600 text-md font-semibold">
                                            {auction.currentPrice} VNĐ
                                        </span>
                                        <span className="ml-1 text-sm text-gray-600">
                                            /bid
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </Link>
                    </div>
                ))}
            
            </div>
        );
    }
}

export default AuctionByUser;