import { Home, Profile, SignIn, SignUp} from "@/pages";
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
import LogOut from "./components/logOut";
import CreateProduct from "./components/product/createProduct";
import AuctionDetail from "./components/auction/auctionDetail";
import ProductByUser from "./components/product/productByUser";
import CreateAuction from "./components/auction/createAuction";
import EditProfile from "./components/user/editProfile";
import AuctionByUser from "./components/auction/auctionByUser";
import Search from "./pages/search";
import Admin from "./pages/admin";
import AboutUs from "./pages/aboutUs";



export const routes = [
  
  {
    name: "Auction",
    icon: GlobeAltIcon,
    path: "/auction",
    element: <Auction />,
  },
  {
    name: "About Us",
    icon: UserCircleIcon,
    path: "/about-us",
    element: <AboutUs />,
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
    path: "/home",
    element: <Home />,
  },
  {
    path: "/product/:id",
    element: <ProductDetail />,
  },
  {
    path: "/auction/:id",
    element: <AuctionDetail />,
  },
  {
    path:"/logout",
    element: <LogOut/>,
  },
  {
    path: "product/create",
    element: <CreateProduct />,
  },
  {
    path: "product/user/:userId",
    element: <ProductByUser />,
  },
  {
    path: "/auction/create",
    element: <CreateAuction />,
  },
  {
    path: "/profile/view",
    element: <EditProfile />,
  },
  {
    path: ":/auction/user/:userId",
    element: <AuctionByUser />,
  },
  {
    path: "/profile/admin",
    element: <Admin />,
  },
  {
    path:"/search",
    element: <Search />
  }
];

export default routes;
