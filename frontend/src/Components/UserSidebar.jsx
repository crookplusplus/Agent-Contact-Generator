import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { BiHome } from "react-icons/bi";
import { FaRegRectangleList } from "react-icons/fa6";
import { LuContact2 } from "react-icons/lu";
import { IoStorefrontOutline } from "react-icons/io5";
import { BsCart3 } from "react-icons/bs";
import { Link } from "react-router-dom";

const UserSidebar = (props) => {
  const location = useLocation();
  const [selected, setSelected] = useState(location.pathname);

  useEffect(() => {
    setSelected(location.pathname);
  }, [location]);


  return (
    <aside className="hidden sm:block">
      <nav className=" bg-color2 rounded-lg ">
        <div className="min-h-screen overflow-y-auto overflow-hidden rounded bg-color3 py-4 px-3">
          <ul className="space-y-2 ">
            <li>
              <Link
                className={`flex items-center justify-center md:justify-start rounded-lg hover:bg-gray-50 ${selected === '/welcome' ? 'bg-color4' : ''}`}
                to="/welcome"
              >
                <BiHome className="w-6 h-6 flex-shrink-0 stroke-0 my-2 mx-auto md:mx-2 text-gray-800 dark:text-white" />
                <span className="hidden md:inline-block md:pr-2">Home</span>
              </Link>
            </li>
            <li>
            <Link
                className={`flex items-center justify-center md:justify-start rounded-lg hover:bg-gray-50 ${selected === '/lists' ? 'bg-color4' : ''}`}
                to="/lists"
              >
                <FaRegRectangleList className="w-6 h-6 flex-shrink-0 my-2 mx-auto md:mx-2 text-gray-800 dark:text-white" />
                <span className="hidden md:inline-block md:pr-2">Lists</span>
              </Link>
            </li>
            <li>
            <Link
                className={`flex items-center justify-center md:justify-start rounded-lg hover:bg-gray-50 ${selected === '/contacts' ? 'bg-color4' : ''}`}
                to="/contacts"
              >
                <LuContact2 className="w-6 h-6 flex-shrink-0 stroke-2 my-2 mx-auto md:mx-2 text-gray-800 dark:text-white" />
                <span className="hidden md:inline-block md:pr-2">Contacts</span>
              </Link>
            </li>
            <li>
            <Link
                className={`flex items-center justify-center md:justify-start rounded-lg hover:bg-gray-50 ${selected === '/products' ? 'bg-color4' : ''}`}
                to="/products"
              >
                <IoStorefrontOutline className="w-6 h-6 flex-shrink-0 stroke-0 my-2 mx-auto md:mx-2 text-gray-800 dark:text-white" />
                <span className="hidden md:inline-block md:pr-2">Products</span>
              </Link>
            </li>
            <li>
            <Link
                className={`flex items-center justify-center md:justify-start rounded-lg hover:bg-gray-50 ${selected === '/cart' ? 'bg-color4' : ''}`}
                to="/cart"
              >
                <BsCart3 className="w-6 h-6 flex-shrink-0 stroke-0 my-2 mx-auto md:mx-2 text-gray-800 dark:text-white" />
                <span className="hidden md:inline-block md:pr-2">Cart</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  );
};

export default UserSidebar;
