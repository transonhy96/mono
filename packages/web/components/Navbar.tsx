"use client";
import Link from "next/link";
import { Auth } from "./Auth";
import ThemeSwitcher from "./ThemeSwitcher";

export const Navbar = () => {
  return (
    <header
      className="flex shadow-md dark:shadow-black fixed top-0 z-50 flex-wrap 
      md:justify-between 
      py-4 w-full border text-sm bg-opacity-60 sm:justify-between sm:flex-nowrap dark:bg-opacity-90"
    >
      <nav
        className="max-w-[85rem] w-full mx-auto px-4 flex sm:items-center justify-between items-center"
        aria-label="Global"
      >
        <div className="flex-none px-3 cursor-pointer py-2 rounded text-xl font-semibold dark:text-gray-600 sm:flex hover:text-black dark:hover:text-white ">
          <Link href="/">
            <span className="cpHome">Home</span>
          </Link>
        </div>
        <div className="flex flex-row gap-5 items-center sm:justify-end md:mt-1 sm:mt-0 sm:pl-5">
          <div className="font-medium text-blue-500">
            <Auth></Auth>
          </div>
          <ThemeSwitcher></ThemeSwitcher>
        </div>
      </nav>
    </header>
  );
};
