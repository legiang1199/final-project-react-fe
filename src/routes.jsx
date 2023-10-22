import { Home, Profile, SignIn, SignUp} from "@/pages";
import  ForgotPassword  from "@/pages/forgetPassword";
import Product from "@/pages/product";
import Auction from "@/pages/auction";
import ProductDetail from "@/components/product/productDetail";
import {
  HomeIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
  DocumentTextIcon,
  GlobeAltIcon
} from "@heroicons/react/24/solid";

export const routes = [
  {
    name: "Product",
    icon: DocumentTextIcon,
    path: "/product",
    element: <Product />,
  },
  {
    name: "Auction",
    icon: GlobeAltIcon,
    path: "/auction",
    element: <Auction />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
   {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/product/:id",
    element: <ProductDetail />,
  }
];

export default routes;
