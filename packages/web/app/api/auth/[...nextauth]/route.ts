import axios from "@/lib/axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Your email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await axios.post("/auth/login", {
          email: credentials?.email,
          password: credentials?.password,
        });
        
        const user = res.data;
        console.log({rx: user});
        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return {
            ...user
          };
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  callbacks:{
  async signIn({ user, account, profile, email, credentials }) {
    console.log({user:user});
    return true;
  },
  async redirect({ url, baseUrl }) {
    return baseUrl
  },
  async session({ session, token, user }) {
    let usr = token?.user as {token:string,id:string; email:string};
    session.user = usr;
    return session
  },
  async jwt({ token, user, account, profile }) {
    user && (token.user = user)
    return token
  }},
  pages:{
    error: '/'
  },

  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
});
export { handler as GET, handler as POST };
