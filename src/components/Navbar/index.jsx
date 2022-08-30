import { Menu } from "@headlessui/react";
import { motion } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";
import { MdMenu, MdNotifications, MdSearch } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../../contexts/StateProvider.js";
import Container from "../Container/index";
import AccountDropDown from "./AccountDropDown";

const backgrounds = [
  "bg-red-700",
  "bg-orange-700",
  "bg-amber-700	",
  "bg-yellow-700",
  "bg-green-700",
  "bg-emerald-800",
  "bg-teal-700",
  "bg-blue-700",
  "bg-indigo-700",
  "bg-pink-700",
  "bg-rose-700",
];

const Navbar = () => {
  const [{ user }, dispatch] = useStateValue(false);
  const navigate = useNavigate();

  return (
    <Menu as="nav" className="bg-white py-4 shadow-md">
      <Container className="flex items-center justify-between">
        <div
          className="transition-all duration-150 text-orange-500 hover:text-orange-400 uppercase text-2xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          Fakebook
        </div>
        <div className="hidden md:flex items-center gap-4 w-72 lg:w-auto bg-gray-200 p-3 rounded-2xl">
          <MdSearch size={25} className="text-gray-500" />
          <input
            type="text"
            className="bg-transparent outline-none placeholder:text-gray-500 text-gray-500"
            placeholder="Search..."
          />
        </div>
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <div className="transition-all duration-150 bg-gray-200 hover:bg-gray-300 p-3 rounded-full cursor-pointer">
                <MdNotifications size={25} />
              </div>
              <Menu.Button>
                <motion.div
                  whileTap={{ scale: 0.6 }}
                  className={`flex items-center justify-center text-white uppercase text-2xl w-12 h-12 relative rounded-full cursor-pointer ${
                    backgrounds[Math.floor(Math.random() * backgrounds.length)]
                  }`}
                >
                  <div>{user?.displayName.charAt(0)}</div>
                  <div className="bg-gray-300 rounded-full absolute bottom-0 -right-1">
                    <FiChevronDown size={20} />
                  </div>
                  {user && <AccountDropDown />}
                </motion.div>
              </Menu.Button>
            </>
          ) : (
            <>
              <motion.div
                whileTap={{ scale: 0.5 }}
                className="nav-auth-button"
                onClick={() => navigate("/signup")}
              >
                Sign up
              </motion.div>
              <motion.div
                whileTap={{ scale: 0.5 }}
                className="nav-auth-button"
                onClick={() => navigate("/login")}
              >
                Login
              </motion.div>
            </>
          )}
        </div>
        {/* Mobile Nav */}
        <div className="flex md:hidden cursor-pointer text-gray-700 hover:bg-gray-200 rounded-full p-2">
          <MdMenu size={30} />
        </div>
      </Container>
    </Menu>
  );
};

export default Navbar;
