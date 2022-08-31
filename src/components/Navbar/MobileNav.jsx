import { BiLogOut } from "react-icons/bi";
import { MdSearch } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../../contexts/StateProvider";
import Container from "../Container";

const MobileNav = ({ open, setOpen, logout }) => {
  const navigate = useNavigate();
  const [{ user }, dispatch] = useStateValue();

  return (
    <>
      {open && (
        <div className="block md:hidden py-4 bg-white border-t border-gray-300">
          <Container>
            <div className="flex items-center gap-4 w-auto bg-gray-200 p-3 rounded-2xl text-xs">
              <MdSearch size={15} className="text-gray-500" />
              <input
                type="text"
                className="bg-transparent outline-none placeholder:text-gray-500 text-gray-500"
                placeholder="Search..."
              />
            </div>
            <div className="mt-4 border-t border-gray-300">
              {user ? (
                <button
                  onClick={() => logout()}
                  className="flex items-center text-red-600 w-full hover:bg-gray-100 p-2 transition-all duration-150 ease-in-out"
                >
                  <BiLogOut size={20} className="mr-3" />
                  Logout
                </button>
              ) : (
                <div className="flex flex-col gap-4 mt-4">
                  <div
                    className="mobile-nav-auth-button"
                    onClick={() => navigate("/signup")}
                  >
                    Sign up
                  </div>
                  <div
                    className="mobile-nav-auth-button"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </div>
                </div>
              )}
            </div>
          </Container>
        </div>
      )}
    </>
  );
};

export default MobileNav;
