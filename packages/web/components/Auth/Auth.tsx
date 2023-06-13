"use client";
import { useSession } from "next-auth/react";
import { Sidebar } from "../Sidebar";
import { Tab, TabItem } from "../Tab";
import { Button } from "../ui/button";
import Login from "./Login";
import Register from "./Register";
import { useMemo } from "react";
import UserInfo from "./UserInfo";

export const Auth = () => {
  const tabs: TabItem[] = [
    {
      key: "login",
      content: <Login></Login>,
      title: "Login",
      desc: "",
    },
    {
      key: "register",
      content: <Register></Register>,
      title: "Register",
      desc: "",
    },
  ];
  const { data: session } = useSession();
  const trigger = useMemo(() => {
    if (session && session?.user) {
      console.log(session)
      return <Button>{session.user.email}</Button>;
    } else {
      return <Button>Login</Button>;
    }
  }, [session]);
  return <Sidebar title="" desc="" position="right" trigger={trigger}>
    {
      session && session?.user ? 
      <UserInfo></UserInfo>
      :<Tab tabs={tabs} active={tabs[0].key }></Tab> 
    }
  </Sidebar>;
  
};
