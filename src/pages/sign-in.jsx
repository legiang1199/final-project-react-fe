import { Link, Navigate } from "react-router-dom";
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
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserApi from "../api/userApi";
import { useFormik } from "formik";
import * as Yup from "yup";

export const SignIn = () => {
  const googleAuth = () => {
		window.open(
			"http://localhost:3000/auth/google/",
			"_self"
		);
	};

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (data, { setSubmitting, setStatus }) => {
      try {
        const response = await UserApi.login(data);
        setStatus("success");
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
        alert("Login successfully");
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
      <Card className="absolute left-2/4 top-2/4 w-full max-w-[24rem] -translate-x-2/4 -translate-y-2/4">
        <CardHeader
          variant="gradient"
          color="blue"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Sign In
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <form onSubmit={formik.handleSubmit}>
            <div>
              <Input
                required
                variant="standard"
                name="email"
                type="email"
                label="Email"
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
            <Button variant="gradient" fullWidth type="submit">
              Sign In
            </Button>
            <p className="text-center">Or</p>
            <Button variant="gradient" fullWidth onClick={googleAuth}>
              Sign In with Google
            </Button>
          </form>
        </CardBody>
        <CardFooter className="pt-0">
          <Typography variant="small" className="mt-6 flex justify-center">
            Don't have an account?
            <Link to="/sign-up">
              <Typography
                as="span"
                variant="small"
                color="blue"
                className="ml-1 font-bold"
              >
                Sign up
              </Typography>
            </Link>
          </Typography>
          
        </CardFooter>
      </Card>

      <div className="container absolute bottom-6 left-2/4 z-10 mx-auto -translate-x-2/4 text-white">
        <SimpleFooter />
      </div>
    </>
  );
};

export default SignIn;
