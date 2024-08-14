/* eslint-disable no-unused-vars */
import React from "react";
import { appleImg, bagImg, searchImg } from "../utils";
import { navLists } from "../constants";

const Navbar = () => {
  return (
    <header className="w-full flex justify-between items-center py-5 sm:px-10 px-5">
      <nav className="w-full flex screen-max-width">
        <img
          alt="Apple"
          src={appleImg}
          width={14}
          height={18}
        />
        <div className="flex flex-1 justify-center max-sm:hidden">
          {navLists.map((item) => (
            <div key={item} className="px-5 text-sm cursor-pointer text-gray hover:text-white transition-all">
              {item}
            </div>
          ))}
        </div>
        <div className="flex items-baseline gap-8 max-sm:justify-end max-sm:flex-1">
          <img
            alt="Search"
            src={searchImg}
            width={18}
            height={18}
          />
          <img
            alt="Bag"
            src={bagImg}
            width={18}
            height={18}
          />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
