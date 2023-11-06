import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import { useFormik } from "formik";
import { Link, Navigate } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import * as Yup from "yup";
import ProductApi from "@/api/productApi";
import CategoryApi from "@/api/categoryApi";
import { Footer } from "@/widgets/layout";
import { useEffect } from "react";
import { useState } from "react";
import jwt_decode from "jwt-decode";

export function CreateProduct() {
  const [categories, setCategories] = useState([]);

  const token = localStorage.getItem("token");
  const decoded = jwt_decode(token);
  const userId = decoded.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await CategoryApi.getAllCategories();
        console.log(response);
        setCategories(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const validationSchema = Yup.object().shape({
    img: Yup.string().required("Image is required"),
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    owner: Yup.string().required("Owner is required"),
    category: Yup.string().required("Category is required"),
  });
  const formik = useFormik({
    initialValues: {
      img: "",
      name: "",
      description: "",
      owner: userId,
      category: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (data, { setSubmitting, setStatus }) => {
      try {
        await ProductApi.createProduct(data);
        setStatus("success");
        alert("Create product successfully");
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setSubmitting(false);
        window.location.href = "/";
      }
    },
  });
  const props = {
    name: "img",
    action: "http://localhost:3001/upload",

    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
        formik.setFieldValue("img", info.file.response.filename);
      }
      if (info.file.status === "done") {
        console.log(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        console.log(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <>
      <section className="relative block h-[50vh]">
        <div className="bg-profile-background absolute top-0 h-full w-full bg-[url('/img/background-1.jpg')] bg-cover bg-center" />
        <div className="absolute top-0 h-full w-full bg-black/75 bg-cover bg-center" />
      </section>
      <section className="relative bg-blue-gray-50/50 px-4 py-16">
        <div className="container mx-auto">
          <div className="relative -mt-64 mb-6 flex w-full min-w-0 flex-col break-words rounded-3xl bg-white shadow-xl shadow-gray-500/5">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="container mx-auto">
                  <Card>
                    <CardHeader
                      variant="gradient"
                      color="blue"
                      className="mb-4 grid h-28 place-items-center"
                    >
                      <Typography variant="h3" color="white">
                        Create Product
                      </Typography>
                    </CardHeader>
                    <CardBody>
                      <form
                        className="gap-6ç flex w-72 flex-col"
                        onSubmit={formik.handleSubmit}
                      >
                        <div className="">
                          <Input
                            label="Name"
                            variant="standard"
                            name="name"
                            type="text"
                            className={
                              "form-control" +
                              (formik.errors.name && formik.touched.name
                                ? " is-invalid"
                                : "")
                            }
                            onChange={formik.handleChange}
                            value={formik.values.name}
                          />
                          <div className="invalid-feedback">
                            {formik.errors.name && formik.touched.name
                              ? formik.errors.name
                              : null}
                          </div>
                        </div>
                        <Input
                          label="Image"
                          variant="standard"
                          type="img"
                          size="lg"
                          name="img"
                          className={
                            "form-control" +
                            (formik.errors.img && formik.touched.img
                              ? " is-invalid"
                              : "")
                          }
                          onChange={formik.handleChange}
                          value={formik.values.img}
                        />
                        <div className="invalid-feedback">
                          {formik.errors.img && formik.touched.img
                            ? formik.errors.img
                            : null}
                        </div>
                        {/* <Upload {...props}>
                          <Button icon={<UploadOutlined />}>Upload</Button>
                        </Upload> */}
                        <div className="invalid-feedback">
                          {formik.errors.img && formik.touched.img
                            ? formik.errors.img
                            : null}
                        </div>
                        <Input
                          label="Description"
                          variant="standard"
                          type="description"
                          size="lg"
                          name="description"
                          className={
                            "form-control" +
                            (formik.errors.description &&
                            formik.touched.description
                              ? " is-invalid"
                              : "")
                          }
                          onChange={formik.handleChange}
                          value={formik.values.description}
                        />
                        <div className="invalid-feedback">
                          {formik.errors.description &&
                          formik.touched.description
                            ? formik.errors.description
                            : null}
                        </div>
                        <select
                          label="Category"
                          variant="standard"
                          size="lg"
                          name="category"
                          className={
                            "form-control" +
                            (formik.errors.category && formik.touched.category
                              ? " is-invalid"
                              : "")
                          }
                          onChange={formik.handleChange}
                          value={formik.values.category}
                        ><option value="">Category</option>
                          {categories.map((category) => (
                            <option value={category._id}>
                              {category.name}
                            </option>
                          ))}
                        </select>


                        <div className="invalid-feedback">
                          {formik.errors.category && formik.touched.category
                            ? formik.errors.category
                            : null}
                        </div>
                        <Button variant="gradient" fullWidth type="submit">
                          Create
                        </Button>
                      </form>
                    </CardBody>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="bg-blue-gray-50/50">
        <Footer />
      </div>
    </>
  );
}

export default CreateProduct;
