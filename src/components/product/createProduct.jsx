import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Input,
    Checkbox,
    Button,
    Typography,
  } from "@material-tailwind/react";
  import { useFormik } from "formik";
  import { Link } from "react-router-dom";
  import { UploadOutlined } from "@ant-design/icons";
  import { Upload } from "antd";
  import * as Yup from "yup";
  import ProductApi from "@/api/productApi";
  import UserApi from "@/api/userApi";
  import CategoryApi from "@/api/categoryApi";
  import { Footer } from "@/widgets/layout";
  import { useEffect } from "react";
  import { useState } from "react";
  
  export function CreateProduct() {
    const [owners, setOwners] = useState([]);
    const [categories, setCategories] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await UserApi.getAllUsers();
          const response2 = await CategoryApi.getAllCategories();
          console.log(response);
          console.log(response2);
          setOwners(response);
          setCategories(response2);
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
        owner: "",
        category: "",
      },
      validationSchema: validationSchema,
      onSubmit: async (data, { setSubmitting, setStatus }) => {
        try {
          await ProductApi.createProduct(data);
          setStatus("success");
        } catch (error) {
          console.error("Error:", error);
        } finally {
          setSubmitting(false);
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
          }
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
                      <CardBody className="flex flex-col gap-4">
                        <form onSubmit={formik.handleSubmit}>
                          <div>
                          <h1>Name</h1>
                            <Input
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
                          <h1>Image</h1>
                          <Input
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
                          <Upload {...props}>
                            <Button icon={<UploadOutlined />}>Upload</Button>
                          </Upload>
                          <div className="invalid-feedback">
                            {formik.errors.img && formik.touched.img
                              ? formik.errors.img
                              : null}
                          </div>
                          <h1>Description</h1>
                          <Input
  
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
                          <div className="invalid-feedback">
                            {formik.errors.owner && formik.touched.owner
                              ? formik.errors.owner
                              : null}
                          </div>
                          <label htmlFor="owner">Owner</label>
                          <select
                            required
                            className={
                              "form-control" +
                              (formik.errors.owner && formik.touched.owner
                                ? " is-invalid"
                                : "")
                            }
                            name="owner"
                            onChange={formik.handleChange}
                            value={formik.values.owner}
                            id="owner" // Thêm id cho lĩnh vực này
                          >
                            <option value="">Select an owner</option>
                            {owners.map((owner) => (
                              <option key={owner._id} value={owner._id}>
                                {owner.fullname}
                              </option>
                            ))}
                          </select>
                          <div className="invalid-feedback">
                            {formik.errors.category && formik.touched.category
                              ? formik.errors.category
                              : null}
                          </div>
                          <label htmlFor="owner">Category</label>
                          <select
                            required
                            className={
                              "form-control" +
                              (formik.errors.category && formik.touched.category
                                ? " is-invalid"
                                : "")
                            }
                            name="category"
                            onChange={formik.handleChange}
                            value={formik.values.category}
                            id="category" 
                          >
                            <option value="">Select an owner</option>
                            {categories.map((category) => (
                              <option key={category._id} value={category._id}>
                                {category.name}
                              </option>
                            ))}
                          </select>
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
  