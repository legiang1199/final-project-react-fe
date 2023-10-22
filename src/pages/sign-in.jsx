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
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserApi from "../api/userApi";
import { useFormik } from "formik";
import * as Yup from "yup";


export const SignIn = () => {
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
        await UserApi.login(data);
        setStatus("success");
        localStorage.setItem('true', true);
        navigate("/home");
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/users/login', user)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem('token', res.data.accessToken);
        navigate("/home");
      })
      .catch((error) => {
        console.log(error);
      });
  }



  return (
    <>
      <img
        src="/img/background-2.jpg"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <form className="container mx-auto p-4" onSubmit={handleSubmit} >
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
            <Input
              variant="standard"
              type="email"
              label="Email"
              size="lg"
              onChange={handleInput}
            />
            <Input
              variant="standard"
              type="password"
              label="Password"
              size="lg"
              onChange={handleInput}
            />
            <div className="-ml-2.5">
              <Checkbox label="Remember Me" />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" fullWidth type="submit">
              Sign In
            </Button>
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
      </form>
      <div className="container absolute bottom-6 left-2/4 z-10 mx-auto -translate-x-2/4 text-white">
        <SimpleFooter />
        
      </div>
    </>
  );
};

export default SignIn;
