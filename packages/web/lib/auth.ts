import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "./axios";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Your email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await axios.post("/auth/login",{
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
        });
        console.log(res)
        const user = res.data;
        if (user) {
        // Any object returned will be saved in `user` property of the JWT
        return user;
        } else {
        // If you return null then an error will be displayed advising the user to check their details.
        return null;

        // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  jwt:{
    secret:process.env.NEXTAUTH_SECRET
  },
};
