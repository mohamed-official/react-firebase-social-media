import { Menu } from "@headlessui/react";
import { signOut } from "firebase/auth";
import { motion } from "framer-motion";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import {
  MdMenu,
  MdNotifications,
  MdOutlineCancel,
  MdSearch,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { actionType } from "../../contexts/reducer";
import { useStateValue } from "../../contexts/StateProvider.js";
import { auth } from "../../firebase";
import Container from "../Container/index";
import AccountDropDown from "./AccountDropDown";
import MobileNav from "./MobileNav.jsx";

const Navbar = () => {
  const [{ user }, dispatch] = useStateValue(false);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const logout = () => {
    signOut(auth).then(() => {
      localStorage.removeItem("user");
      dispatch({
        type: actionType.SET_USER,
        user: null,
      });
      navigate("/");
    });
  };

  return (
    <>
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
                    className="flex items-center justify-center text-white uppercase text-2xl w-12 h-12 relative rounded-full cursor-pointer bg-green-700"
                  >
                    <div>{user?.displayName.charAt(0)}</div>
                    <div className="bg-gray-300 rounded-full absolute bottom-0 -right-1">
                      <FiChevronDown size={20} />
                    </div>
                    {user && <AccountDropDown logout={logout} />}
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
          <div className="block md:hidden">
            <div
              className="cursor-pointer text-gray-700 hover:bg-gray-200 rounded-full p-2"
              onClick={() => setOpen(!open)}
            >
              {open ? (
                <motion.div whileTap={{ scale: 0 }}>
                  <MdOutlineCancel size={30} />
                </motion.div>
              ) : (
                <motion.div whileTap={{ scale: 0 }}>
                  <MdMenu size={30} />
                </motion.div>
              )}
            </div>
          </div>
        </Container>
      </Menu>
      <MobileNav open={open} setOpen={setOpen} logout={logout} />
    </>
  );
};

export default Navbar;
