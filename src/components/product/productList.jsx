import React from "react";
import ProductApi from "@/api/productApi";
import { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
  IconButton,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { PageTitle } from "@/widgets/layout";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (status === "idle") {
      // Chỉ gửi yêu cầu khi trạng thái là 'idle' (chưa gửi yêu cầu trước đó)
      setStatus("pending");

      ProductApi.getAllProducts()
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
        <Card className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <PageTitle heading="The product is being approved">Will be auctioned in the near future</PageTitle>
        {/* <div className="mt-24 grid grid-cols-1 gap-12 gap-x-24 md:grid-cols-2 xl:grid-cols-4"> */}
          <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <div key={product.id} className="group relative">
                <CardHeader className="aspect-h-1 aspect-w-1 lg:aspect-none w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
                  <img
                    alt="Card Image"
                    src="/img/teamwork.jpeg"
                    className="h-full w-full"
                  />
                </CardHeader>
                <CardBody className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href={product.href}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.description}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {product.verified}
                  </p>
                </CardBody>
              </div>
            ))}
          </div>
        </Card>
      </div>
    );
  }
}

export default ProductList;

// export default function ProductList() {
//   return (
// <div className="bg-white">
//   <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
//     <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>

//     <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
//       {products.map((product) => (
//         <div key={product.id} className="group relative">
//           <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
//             <img
//               src={product.imageSrc}
//               alt={product.imageAlt}
//               className="h-full w-full object-cover object-center lg:h-full lg:w-full"
//             />
//           </div>
//           <div className="mt-4 flex justify-between">
//             <div>
//               <h3 className="text-sm text-gray-700">
//                 <a href={product.href}>
//                   <span aria-hidden="true" className="absolute inset-0" />
//                   {product.name}
//                 </a>
//               </h3>
//               <p className="mt-1 text-sm text-gray-500">{product.color}</p>
//             </div>
//             <p className="text-sm font-medium text-gray-900">{product.price}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   </div>
// </div>
//   )
// }

// ProductList.displayName = "ProductList"

// ProductList.propTypes = {}

// ProductList.defaultProps = {}

// ProductList.color = "light"

// ProductList.icon = "https://cdn.coin68.com/uploads/2022/04/STEPN-Binance-scaled.jpg"
