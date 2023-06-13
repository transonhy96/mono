"use client";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "@/components/ui/button";

import { z } from "zod";
import { RegisterSchema } from "./schemas/RegisterSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import axios from "@/lib/axios";
import { signIn } from "next-auth/react";
const Register = () => {
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
  });
  async function onSubmit(values: z.infer<typeof RegisterSchema>) {
    try {
      const { data } = await axios.post("/auth/signup", {
        email: values.email,
        password: values.password,
      });
      console.log(data);
      if (data.token) {
        signIn("credentials", {
          email: values.email,
          password: values.password,
        });
      }
    } catch (error) {
      //handle error
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Your password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="reenter"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Reenter your password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Register</Button>
      </form>
    </Form>
  );
};
export default Register;
