import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faShoppingCart } from "@fortawesome/free-solid-svg-icons";

interface NavbarProps {}

const NavBar = (props: NavbarProps) => {
  return (
    <>
      <nav className="h-10 bg-blue-600 sticky top-0 left-0 w-full flex">
        <div className="flex-1 text-center flex items-center justify-center">
          <h4 className="text-white font-bold text-2xl">Eteration</h4>
        </div>
        <div className="flex-1 rounded-md flex items-center">
          <input
            type="text"
            placeholder="Search"
            className="border border-gray-300 rounded-md py-1 px-4 focus:outline-none w-full"
            onChange={() => {}}
          />
        </div>
        <div className="flex-1 text-center flex items-center justify-center flex-row">
          <div className="flex items-center">
            <FontAwesomeIcon
              icon={faShoppingCart}
              color="white"
              style={{ height: 16 }}
            />
            <span className="ml-3 total-price text-white font-bold">Price</span>
          </div>
          <div className="flex ml-5 items-center">
            <FontAwesomeIcon
              icon={faUser}
              color="white"
              style={{ height: 16 }}
            />
            <span className="ml-2 text-white font-bold">Kerem</span>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
