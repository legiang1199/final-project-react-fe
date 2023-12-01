import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import AuctionApi from "@/api/auctionApi";
import ProductApi from "@/api/productApi";
import jwt_decode from "jwt-decode";
import CategoryApi from "@/api/categoryApi";

export function CreateAuction() {
  const token = localStorage.getItem("token");
  const decoded = jwt_decode(token);
  const userId = decoded.id;
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    starting_price: Yup.number().required("Starting price is required"),
    product: Yup.string().required("Product is required"),
    auction_end: Yup.date().required("Auction end is required"),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      product: "",
      starting_price: "",
      auction_end: "",
      owner: userId,
      category: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (data, { setSubmitting, setStatus }) => {
      try {
        await AuctionApi.createAuction(data);
        setStatus("success");
        alert("Create auction successfully");
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setSubmitting(false);
        window.location.href = "/profile";
      }
    },
  });
  const [products, setProducts] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ProductApi.getProductByUserId(userId);
        const category = await CategoryApi.getAllCategories();
        console.log(response);
        setCategories(category);
        setProducts(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  function formatDateToDdMmYyyy(date) {
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
    return new Date(date).toLocaleDateString("en-GB", options);
  }
  return (
    <>
      <div className="container mx-auto h-full px-4">
        <div className="flex h-full content-center items-center justify-center">
          <div className="w-full px-4 lg:w-4/12">
            <div className="relative mb-6 flex w-full min-w-0 flex-col break-words rounded-lg border-0 bg-gray-300 shadow-lg">
              <div className="mb-0 rounded-t px-6 py-6">
                <div className="mb-3 text-center">
                  <h6 className="text-sm font-bold text-gray-600">
                    Create Auction
                  </h6>
                </div>
                <hr className="border-b-1 mt-6 border-gray-400" />
              </div>
              <div className="flex-auto px-4 py-10 pt-0 lg:px-10">
                <form onSubmit={formik.handleSubmit}>
                  <div className="relative mb-3 w-full">
                    <label
                      className="mb-2 block text-xs font-bold uppercase text-gray-700"
                      htmlFor="grid-password"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      onChange={formik.handleChange}
                      value={formik.values.name}
                      placeholder="Name"
                      className="focus:shadow-outline w-full rounded bg-white px-3 py-3 text-sm text-gray-700 placeholder-gray-400 shadow transition-all duration-150 ease-linear focus:outline-none"
                    />
                    {formik.errors.name && formik.touched.name && (
                      <p className="text-xs italic text-red-500">
                        {formik.errors.name}
                      </p>
                    )}
                  </div>

                  <div className="relative mb-3 w-full">
                    <label
                      className="mb-2 block text-xs font-bold uppercase text-gray-700"
                      htmlFor="grid-password"
                    >
                      Starting price
                    </label>
                    <input
                      type="number"
                      name="starting_price"
                      onChange={formik.handleChange}
                      value={formik.values.starting_price}
                      placeholder="Starting price"
                      className="focus:shadow-outline w-full rounded bg-white px-3 py-3 text-sm text-gray-700 placeholder-gray-400 shadow transition-all duration-150 ease-linear focus:outline-none"
                    />
                    {formik.errors.starting_price &&
                      formik.touched.starting_price && (
                        <p className="text-xs italic text-red-500">
                          {formik.errors.starting_price}
                        </p>
                      )}
                  </div>

                  <div className="relative mb-3 w-full">
                    <label
                      className="mb-2 block text-xs font-bold uppercase text-gray-700"
                      htmlFor="grid-password"
                    >
                      Product
                    </label>
                    <select
                      type="text"
                      name="product"
                      onChange={formik.handleChange}
                      value={formik.values.product}
                      placeholder="Product"
                      className="focus:shadow-outline w-full rounded bg-white px-3 py-3 text-sm text-gray-700 placeholder-gray-400 shadow transition-all duration-150 ease-linear focus:outline-none"
                    >
                      <option value="">Select product</option>
                      {products.map((product) => (
                        <option key={product.id} value={product._id}>
                          {product.name}
                        </option>
                      ))}
                    </select>

                    {formik.errors.product && formik.touched.product && (
                      <p className="text-xs italic text-red-500">
                        {formik.errors.product}
                      </p>
                    )}
                  </div>

                  <div className="relative mb-3 w-full">
                    <label
                      className="mb-2 block text-xs font-bold uppercase text-gray-700"
                      htmlFor="grid-password"
                    >
                      Category
                    </label>
                    <select
                      type="text"
                      name="category"
                      onChange={formik.handleChange}
                      value={formik.values.category}
                      placeholder="Category"
                      className="focus:shadow-outline w-full rounded bg-white px-3 py-3 text-sm text-gray-700 placeholder-gray-400 shadow transition-all duration-150 ease-linear focus:outline-none"
                    >
                      <option value="">Select category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category._id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="relative mb-3 w-full">
                    <label
                      className="mb-2 block text-xs font-bold uppercase text-gray-700"
                      htmlFor="grid-password"
                    >
                      Auction Start
                    </label>
                    {formatDateToDdMmYyyy(Date.now())}
                  </div>

                  <div className="relative mb-3 w-full">
                    <label
                      className="mb-2 block text-xs font-bold uppercase text-gray-700"
                      htmlFor="grid-password"
                    >
                      Auction end
                    </label>
                    <input
                      type="date"
                      name="auction_end"
                      onChange={formik.handleChange}
                      value={formik.values.auction_end}
                      placeholder="Auction end"
                      className="focus:shadow-outline w-full rounded bg-white px-3 py-3 text-sm text-gray-700 placeholder-gray-400 shadow transition-all duration-150 ease-linear focus:outline-none"
                    />
                    {formik.errors.auction_end &&
                      formik.touched.auction_end && (
                        <p className="text-xs italic text-red-500">
                          {formik.errors.auction_end}
                        </p>
                      )}
                  </div>

                  <div className="mt-6 text-center">
                    <button
                      className="mb-1 mr-1 w-full rounded bg-gray-900 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-gray-700"
                      type="submit"
                    >
                      Create
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* <FooterSmall absolute /> */}
      </div>
    </>
  );
}

export default CreateAuction;
