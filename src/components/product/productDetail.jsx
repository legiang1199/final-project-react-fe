import { useState, useEffect } from "react";
import ProductApi from "@/api/productApi";
import { useParams } from "react-router-dom";
import UserApi from "@/api/userApi";
import { Carousel } from "@material-tailwind/react";

function ProductDetail() {
  const [user, setUser] = useState([]);
  const [product, setProduct] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (status === "idle") {
      // Chỉ gửi yêu cầu khi trạng thái là 'idle' (chưa gửi yêu cầu trước đó)
      setStatus("pending");

      ProductApi.getProductById(id)
        .then((data) => {
          setProduct(data);
          setStatus("success");
        })
        .catch((error) => {
          setError(error);
          setStatus("error");
        });
    }
  }, [status]);

  useEffect(() => {
    if (status === "success") {
      // Once you have the product details, fetch the owner's name
      UserApi.getUserById(product.owner)
        .then((userData) => {
          setUser(userData);
        })
        .catch((error) => {
          // Handle any errors
          console.error("Error fetching user data:", error);
        });
    }
  }, [status, product.owner]);

  let content;

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
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {product.name}
              </h1>
            </div>
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <form className="mt-10">
                <div>
                  <h3>Owner</h3>
                  <p className="text-3xl text-gray-900">
                    {user.fullname}
                    {} <span className="text-gray-500"></span>
                  </p>
                </div>
                <button className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  Add to bag
                </button>
              </form>
            </div>
            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Details</h2>
              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">{product.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ProductDetail;
