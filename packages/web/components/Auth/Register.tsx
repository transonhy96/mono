import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
const Register = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
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
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password-re" className="text-right">
              Reenter password
            </Label>
            <Input
              id="password-re"
              placeholder="Reenter your password"
              type="password"
              className="col-span-3"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="">Register</Button>
      </CardFooter>
    </Card>
  );
};
export default Register;
