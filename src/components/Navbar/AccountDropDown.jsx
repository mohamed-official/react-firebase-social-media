import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../../contexts/StateProvider";

const AccountDropDown = ({ logout }) => {
  const navigate = useNavigate();

  const [{ user }, dispatch] = useStateValue();

  return (
    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Menu.Items className="absolute top-14 -right-4 w-56 origin-top-right rounded-md bg-gray-200 shadow-lg">
        <Menu.Item>
          <button
            onClick={() => logout()}
            className="flex items-center border-b border-gray-300 text-red-600 w-full hover:bg-gray-100 p-2 transition-all duration-150 ease-in-out"
          >
            <BiLogOut size={20} className="mr-3" />
            Logout
          </button>
        </Menu.Item>
      </Menu.Items>
    </Transition>
  );
};

export default AccountDropDown;
