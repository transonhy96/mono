"use client";
import Link from "next/link";
import { Auth } from "./Auth";
import ThemeSwitcher from "./ThemeSwitcher";

export const Navbar = () => {
  return (
    <header className="flex z-50 flex-wrap py-4 w-full text-sm bg-white sm:justify-start sm:flex-nowrap dark:bg-gray-800">
      <nav
        className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between"
        aria-label="Global"
      >
        <div className="flex-none text-xl font-semibold dark:text-white">
          <Link href="/">
            <span className="cpHome">Home</span>
          </Link>
        </div>
        <div className="flex flex-row gap-5 items-center mt-5 sm:justify-end sm:mt-0 sm:pl-5">
          <div className="font-medium text-blue-500">
            <Auth></Auth>
          </div>
          <ThemeSwitcher></ThemeSwitcher>
        </div>
      </nav>
    </header>
  );
};
