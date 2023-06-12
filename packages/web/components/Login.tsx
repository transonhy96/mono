import { Sidebar } from "./Sidebar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export const Login = () => {
  return (
    <Sidebar
      title="Login"
      desc=""
      position="right"
      trigger={<Button>Login</Button>}
    >
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="email" className="text-right">
            Email
          </Label>
          <Input
            id="email"
            placeholder="your@email.com"
            type="email"
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="password" className="text-right">
            Password
          </Label>
          <Input
            id="password"
            placeholder="password"
            type="password"
            className="col-span-3"
          />
        </div>
      </div>{" "}
    </Sidebar>
  );
};
