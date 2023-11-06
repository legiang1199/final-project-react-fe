import React from "react";
import ProductApi from "@/api/productApi";
import { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  CardFooter,
  Avatar,
} from "@material-tailwind/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import UserApi from "@/api/userApi";
import CategoryApi from "@/api/categoryApi";
import { Tooltip } from "antd";
import jwt_decode from "jwt-decode";

function ProductByUser() {
  const [user, setUser] = useState([]);
  const [category, setCategory] = useState([]);
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const [totalPages, setTotalPages] = useState(1);
  const displayedProducts = products.slice(startIndex, endIndex);
  const token = localStorage.getItem("token");
  const decoded = jwt_decode(token);
  const userId = decoded.id;

  useEffect(() => {
    CategoryApi.getAllCategories()
      .then((data) => {
        setCategory(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const totalPages = Math.ceil(products.length / limit);
    setTotalPages(totalPages);

    if (status === "idle") {
      // Chỉ gửi yêu cầu khi trạng thái là 'idle' (chưa gửi yêu cầu trước đó)
      setStatus("pending");

      ProductApi.getProductByUserId(userId)
        .then((data) => {
          setProducts(data);
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
      <div>
        <div className="bg-white">
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {displayedProducts.length === 0 ? (
              <p>No products available</p>
            ) : (
              displayedProducts.map((product) => (
                <Link to={`/product/${product._id}`}>
                  <Card
                    key={product.id}
                    className="shadow-lg shadow-gray-500/10"
                  >
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
                        {product.name}
                      </Typography>
                      <div className="flex justify-between">
                        <Tooltip>
                          <Avatar
                            size="sm"
                            src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1061&q=80"
                            className="border-2 border-white hover:z-10"
                            variant="rounded"
                          />
                        </Tooltip>

                        <Typography className="font-normal text-blue-gray-500">
                          {product.description}
                        </Typography>
                      </div>
                    </CardBody>
                    <CardFooter>
                      <Typography
                        variant="h5"
                        color="blue-gray"
                        className="mb-3 font-bold"
                      >
                        {product.price}
                      </Typography>
                      <Typography
                        key={product.category}
                        className="font-normal text-blue-gray-500"
                      >
                        {category.map((cate) => {
                          if (cate._id === product.category) {
                            return cate.name;
                          }
                        })}
                      </Typography>
                    </CardFooter>
                  </Card>
                </Link>
              ))
            )}
          </div>
        </div>

        <div className="mt-4 flex justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
              <span className="font-medium">{endIndex}</span> of{" "}
              <span className="font-medium">{products.length}</span> results
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
                disabled={endIndex >= products.length}
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

export default ProductByUser;
