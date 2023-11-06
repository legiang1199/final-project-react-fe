import { Link } from "react-router-dom";
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
import { SimpleFooter } from "@/widgets/layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import UserApi from "../api/userApi";
import { notification } from "antd";



export function SignUp() {
  const validationSchema = Yup.object().shape({
    fullname: Yup.string().required("Full name is required"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
    // confirmPassword: Yup.string()
    //   .required("Confirm Password is required")
    //   .oneOf([Yup.ref("password"), null], "Confirm Password does not match"),
  });
  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      password: "",
      // confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (data, { setSubmitting, setStatus }) => {
      try {
        await UserApi.register(data);
        setStatus("success");
        alert("Register successfully");
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setSubmitting(false);
        window.location.href = "/";
      }
    },
  });


  return (
    <>
      <img
        src="/img/background-2.jpg"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
        <Card className="absolute left-2/4 top-2/4 w-full max-w-[24rem] -translate-x-2/4 -translate-y-2/4">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Sign Up
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <form onSubmit={formik.handleSubmit}>
              <div>
                <Input
                  required
                  variant="standard"
                  name="fullname"
                  type="text"
                  label="Full Name"
                  className={
                    "form-control" +
                    (formik.errors.fullname && formik.touched.fullname
                      ? " is-invalid"
                      : "")
                  }
                  onChange={formik.handleChange}
                  value={formik.values.fullname}
                />
                <div className="invalid-feedback">
                  {formik.errors.fullname && formik.touched.fullname
                    ? formik.errors.fullname
                    : null}
                </div>
              </div>
              <Input
                required
                variant="standard"
                type="email"
                label="Email"
                size="lg"
                name="email"
                className={
                  "form-control" +
                  (formik.errors.email && formik.touched.email
                    ? " is-invalid"
                    : "")
                }
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              <div className="invalid-feedback">
                {formik.errors.email && formik.touched.email
                  ? formik.errors.email
                  : null}
              </div>

                <Input
                  required
                  variant="standard"
                  type="password"
                  name="password"
                  label="Password"
                  size="lg"
                  className={
                    "form-control" +
                    (formik.errors.password && formik.touched.password
                      ? " is-invalid"
                      : "")
                  }
                  
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                <div className="invalid-feedback">
                  {formik.errors.password && formik.touched.password
                    ? formik.errors.password
                    : null}
                </div>
              <div className="-ml-2.5">
                <Checkbox label="I agree the Terms and Conditions" />
              </div>
              <Button variant="gradient" fullWidth type="submit">
                Sign Up
              </Button>
              <div>
                {formik.status === "success" && (
                  openNotification
                )}
              </div>
            </form>
          </CardBody>
          <CardFooter className="pt-0">
            <Typography variant="small" className="mt-6 flex justify-center">
              Already have an account?
              <Link to="/sign-in">
                <Typography
                  as="span"
                  variant="small"
                  color="blue"
                  className="ml-1 font-bold"
                >
                  Sign in
                </Typography>
              </Link>
            </Typography>
          </CardFooter>
        </Card>
      </div>
      <div className="container absolute bottom-6 left-2/4 z-10 mx-auto -translate-x-2/4 text-white">
        <SimpleFooter />
      </div>
    </>
  );
}

export default SignUp;