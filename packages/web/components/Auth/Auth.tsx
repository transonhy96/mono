import { Sidebar } from "../Sidebar";
import { Tab, TabItem } from "../Tab";
import { Button } from "../ui/button";
import Login from "./Login";
import Register from "./Register";

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
  return (
    <Sidebar title="" desc="" position="right" trigger={<Button>Login</Button>}>
      <Tab tabs={tabs} active={tabs[0].key}></Tab>
    </Sidebar>
  );
};
