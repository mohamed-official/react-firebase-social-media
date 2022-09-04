import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { IoSettingsSharp } from "react-icons/io5";
import { MdEdit, MdVpnKey } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { ChangeUsernameModal, Container } from "../components";
import { useStateValue } from "../contexts/StateProvider";

const Settings = () => {
  const [openTab, setOpenTab] = useState(1);
  const [usernameTabOpen, setUsernameTabOpen] = useState(false);
  const [{ user }, dispatch] = useStateValue();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  return (
    <Container className="flex">
      {/* Side Bar */}
      <aside className="w-3/12 drop-shadow-xl bg-white text-gray-700 text-xl border border-gray-300 p-2 pt-8">
        <div
          className={`${
            openTab === 1 ? "bg-gray-100" : "bg-transparent"
          } flex items-center gap-4 text-gray-700 border-b border-t p-4 border-gray-300 w-full hover:bg-gray-100 transition-all duration-150 ease-in-out cursor-pointer`}
          onClick={() => setOpenTab(1)}
        >
          <IoSettingsSharp size={25} />
          <p>Account Settings</p>
        </div>
        <div
          className={`${
            openTab === 2 ? "bg-gray-100" : "bg-transparent"
          } flex items-center gap-4 text-gray-700 border-b p-4 border-gray-300 w-full hover:bg-gray-100 transition-all duration-150 ease-in-out cursor-pointer`}
          onClick={() => setOpenTab(2)}
        >
          <MdVpnKey size={25} />
          <p>Change Password</p>
        </div>
      </aside>
      {/* Account Settings */}
      <div className="bg-white w-9/12 pl-10 pt-8 pr-4 pb-4">
        {openTab === 1 && (
          <motion.div
            initial={{ opacity: 0, y: -200 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 200 }}
          >
            <h4 className="text-xl font-semibold pb-4 border-b border-gray-500">
              Your Account Settings
            </h4>
            <table className="table-auto mt-8 w-full text-center">
              <thead></thead>
              <tbody>
                <tr className="border-b border-gray-300">
                  <td className="border border-gray-300 p-2 font-semibold">
                    Username
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    {user?.displayName}
                  </td>
                  <td
                    className="flex items-center justify-center cursor-pointer border border-gray-300 p-2 h-14"
                    onClick={() => setUsernameTabOpen(!usernameTabOpen)}
                  >
                    <MdEdit size={25} className="text-blue-500" />
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 font-semibold">
                    Profile Photo
                  </td>
                  <td className="border border-gray-300 p-2">
                    <img
                      src={
                        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                      }
                      className="w-20 h-20 mx-auto"
                      alt="Profile Photo"
                    />
                    {user?.photoURL ? (
                      <img
                        src={user?.photoURL}
                        className="w-20 h-20 mx-auto"
                        alt="Profile Photo"
                      />
                    ) : null}
                  </td>
                  <td className="flex items-center justify-center cursor-pointer border border-gray-300 p-2 h-28">
                    <MdEdit size={25} className="text-blue-500" />
                  </td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="border border-gray-300 p-2 font-semibold">
                    Email
                  </td>
                  <td className="border border-gray-300 p-2">{user?.email}</td>
                  <td className="flex items-center justify-center cursor-pointer border border-gray-300 p-2 h-14">
                    {""}
                  </td>
                </tr>
              </tbody>
            </table>
            <ChangeUsernameModal
              open={usernameTabOpen}
              setOpen={setUsernameTabOpen}
            />
          </motion.div>
        )}
        {openTab === 2 && (
          <motion.div
            initial={{ opacity: 0, y: -200 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 200 }}
          >
            tab 2
          </motion.div>
        )}
      </div>
    </Container>
  );
};

export default Settings;
