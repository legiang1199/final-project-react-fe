import { useState, useEffect } from "react";
import ProductApi from "@/api/productApi";
import { useParams } from "react-router-dom";

function ProductDetail() {
  const [product, setProduct] = useState([]);
  const [owner, setOwner] = useState([]);
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
          const ownerName = data.owner;
          ProductApi.getOwnerByName(ownerName)
            .then((data) => {
              setOwner(data);
              setStatus("success");
            })
            .catch((error) => {
              setError(error);
              setStatus("error");
            });
        })
        .catch((error) => {
          setError(error);
          setStatus("error");
        });
    }
  }, [status]);

  let content;

  if (status === "idle" || status === "pending") {
    return <p>Loading...</p>;
  }

  if (status === "error") {
    return <p>Something went wrong: {error.message}</p>;
  }

  if (status === "success") {
    return (
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="pt-6">
            {/* Image gallery */}
            <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
              <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                <img
                  alt="Card Image"
                  src="/img/teamwork.jpeg"
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                  <img
                    alt="Card Image"
                    src="/img/teamwork.jpeg"
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                  <img
                    alt="Card Image"
                    src="/img/teamwork.jpeg"
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              </div>
              <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                <img
                  alt="Card Image"
                  src="/img/teamwork.jpeg"
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
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
                    {product.owner}{} <span className="text-gray-500"></span>
                  </p>
                </div>
                <button
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Add to bag
                </button>
              </form>
            </div>
            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              <div>
                <h3 className="">Description</h3>
                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {product.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ProductDetail;
