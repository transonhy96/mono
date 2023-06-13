import { signIn, signOut, useSession } from "next-auth/react";
import { Sidebar } from "../Sidebar";
import { Tab, TabItem } from "../Tab";
import { Button } from "../ui/button";
import Login from "./Login";
import Register from "./Register";
import { useMemo } from "react";

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
    console.log(session?.user);
    if (session?.user) {
      return <Button onClick={() => signOut()}>{session.user.email}</Button>;
    } else {
      return <Button onClick={() => signIn()}>Login</Button>;
    }
  }, [session]);
  return <>{trigger}</>;
  {
    /* <Sidebar title="" desc="" position="right" trigger={trigger}> */
  }
  {
    /*   <Tab tabs={tabs} active={tabs[0].key}></Tab> */
  }
  {
    /* </Sidebar> */
  }
};
