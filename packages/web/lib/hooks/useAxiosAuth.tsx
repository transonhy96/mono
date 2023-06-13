"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { axiosAuth } from "../axios";
const useAxiosAuth = () => {
  const { data: session } = useSession();
  
  useEffect(() => {
    const intercepter = axiosAuth.interceptors.request.use((config) => {
      if (!config.headers["Authorization"]) {
        config.headers["Authorization"] = `Bearer ${session?.user.token}`;
      }
      console.log({config})
      return config;
    });
    return () => {
      axiosAuth.interceptors.request.eject(intercepter);
    };
  }, [session]);

  return axiosAuth;
};
export default useAxiosAuth;
