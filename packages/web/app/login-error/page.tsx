"use client";
import { useAppStore } from "@/lib/store";

const LoginError = () => {
  const { toggleSidebar, setActiveTab } = useAppStore();
  return (
    <>
      <div className="mt-10 w-full p-2 items-center justify-center font-bold flex gap-2 ">
        <span className=" text-red-300 ">
          Failed to login using provided email and password, please try again or
        </span>
        <button
          onClick={() => {
            setActiveTab("register");
            toggleSidebar();
          }}
        >
          Register new account
        </button>
      </div>
    </>
  );
};
export default LoginError;
