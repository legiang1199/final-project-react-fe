import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  Navbar as MTNavbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Menu,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon, BellIcon } from "@heroicons/react/24/outline";
import DropdownButton from "antd/es/dropdown/dropdown-button";
import Search from "antd/es/input/Search";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";

export function Navbar({ brandName, routes }) {
  const [openNav, setOpenNav] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

  const token = localStorage.getItem("token");
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    // Perform the search using the 'searchQuery' state.
    console.log("Search query: ", searchQuery);
    // You can send an API request to search for auctions using 'searchQuery' here.
  };

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const items = [
    {
      label: token ? (
        <a
          href="/profile/"
          className="'bg-gray-100' : '', 'block text-gray-700' px-4 py-2 text-sm"
        >
          Profile
        </a>
      ) : (
        <a
          href="/sign-in"
          className="'bg-gray-100' : '', 'block text-gray-700' px-4 py-2 text-sm"
        >
          Sign In
        </a>
      ),
    },
    {
      label: token ? (
        <a
          href="/logout"
          className="'bg-gray-100' : '', 'block text-gray-700' px-4 py-2 text-sm"
        >
          Log out
        </a>
      ) : (
        <a
          href="/sign-up"
          className="'bg-gray-100' : '', 'block text-gray-700' px-4 py-2 text-sm"
        >
          Sign Up
        </a>
      ),
    },
  ];

  const navList = (
    <div className="hidden bg-black sm:ml-6 sm:block">
      <div className="flex space-x-4">
        {routes.map(({ name, path, icon, href, target }) => (
          <Typography
            key={name}
            as="li"
            variant="gradient"
            color="inherit"
            className="capitalize"
          >
            {href ? (
              <a
                href={href}
                target={target}
                className="flex items-center gap-1 p-1 font-normal"
              >
                {icon &&
                  React.createElement(icon, {
                    className: "w-[18px] h-[18px] opacity-75 mr-1",
                  })}
                {name}
              </a>
            ) : (
              <Link
                to={path}
                target={target}
                className="flex items-center gap-1 p-1 font-normal"
              >
                {icon &&
                  React.createElement(icon, {
                    className: "w-[18px] h-[18px] opacity-75 mr-1",
                  })}
                {name}
              </Link>
            )}
          </Typography>
        ))}
      </div>
    </div>
  );

  return (
    <MTNavbar color="transparent" className="bg-black p-3">
      <div className="container mx-auto flex items-center justify-between text-white">
        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div className="flex flex-shrink-0 items-center">
            <Link to="/">
              <Typography className="ml-2 mr-4 cursor-pointer py-1.5 font-bold">
                {brandName}
              </Typography>
            </Link>
          </div>
        </div>
        <div className="hidden lg:block">{navList}</div>
        <div className="hidden gap-2 lg:flex ">
          <div className="flex items-center gap-2">
            <Search
              variant="gradient"
              size="sm"
              className="relative rounded-full"
              placeholder="Search Auction"
              value={searchQuery}
              onChange={handleSearchChange}
              onSearch={handleSearch}
              enterButton
            />

            <Button
              variant="gradient"
              size="sm"
              className="relative rounded-full"
            >
              <i className="fa-solid fa-bell mr-1 " />
            </Button>
            <Dropdown
              menu={{
                items,
              }}
              trigger={["click"]}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Button
                  variant="gradient"
                  size="sm"
                  className="relative rounded-full"
                >
                  <i className="fa-solid fa-user mr-1 " />
                </Button>
              </a>
            </Dropdown>
          </div>
        </div>

        <IconButton
          variant="text"
          size="sm"
          color="white"
          className="ml-auto text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon strokeWidth={2} className="h-6 w-6" />
          ) : (
            <Bars3Icon strokeWidth={2} className="h-6 w-6" />
          )}
        </IconButton>
      </div>
    </MTNavbar>
  );
}

Navbar.defaultProps = {
  brandName: "Auction App",
};

Navbar.propTypes = {
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Navbar.displayName = "/src/widgets/layout/navbar.jsx";

export default Navbar;
