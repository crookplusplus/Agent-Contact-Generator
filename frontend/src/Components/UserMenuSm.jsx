import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { BiHome } from "react-icons/bi";
import { FaRegRectangleList } from "react-icons/fa6";
import { LuContact2 } from "react-icons/lu";
import { IoStorefrontOutline } from "react-icons/io5";
import CartIcon from '../Components/CartIcon'
import { Link } from "react-router-dom";

const UserMenuSm = (props) => {
  const location = useLocation();
  const [selected, setSelected] = useState(location.pathname);

  useEffect(() => {
    setSelected(location.pathname);
  }, [location]);


  return (
    <div className="sm:hidden w-full justify-evenly">
      <nav className=" bg-color2 rounded-lg">
        <div className="rounded bg-color3 flex flex-row justify-center items-center space-x-4">
          <ul className="flex flex-row justify-center items-center space-x-8 z-10">
            <li>
              <Link
                className={`flex items-center px-2 justify-center md:justify-start rounded-lg hover:bg-gray-50 ${selected === '/welcome' ? 'bg-color4' : ''}`}
                to="/welcome"
              >
                <BiHome className="w-6 h-6 flex-shrink-0 stroke-0 my-2 mx-auto md:mx-2 text-gray-800 dark:text-white" />
              </Link>
            </li>
            <li>
            <Link
                className={`flex items-center px-2 justify-center md:justify-start rounded-lg hover:bg-gray-50 ${selected === '/lists' ? 'bg-color4' : ''}`}
                to="/lists"
              >
                <FaRegRectangleList className="w-6 h-6 flex-shrink-0 my-2 mx-auto md:mx-2 text-gray-800 dark:text-white" />

              </Link>
            </li>
            <li>
            <Link
                className={`flex items-center px-2 justify-center md:justify-start rounded-lg hover:bg-gray-50 ${selected === '/contacts' ? 'bg-color4' : ''}`}
                to="/contacts"
              >
                <LuContact2 className="w-6 h-6 flex-shrink-0 stroke-2 my-2 mx-auto md:mx-2 text-gray-800 dark:text-white" />
              </Link>
            </li>
            <li>
            <Link
                className={`flex items-center px-2 justify-center md:justify-start rounded-lg hover:bg-gray-50 ${selected === '/products' ? 'bg-color4' : ''}`}
                to="/products"
              >
                <IoStorefrontOutline className="w-6 h-6 flex-shrink-0 stroke-0 my-2 mx-auto md:mx-2 text-gray-800 dark:text-white" />
              </Link>
            </li>
            <li>
            <Link
                className={`flex items-center px-2 justify-center md:justify-start rounded-lg hover:bg-gray-50 ${selected === '/cart' ? 'bg-color4' : ''}`}
                to="/cart"
              >
                <CartIcon iconColor="gray-800" badgeColor="color5" badgeText="gray-800"/>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default UserMenuSm;