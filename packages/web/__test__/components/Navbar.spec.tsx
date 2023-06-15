import { Navbar } from "@/components";
import { render, screen } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";
describe("Navbar - Rendering", () => {
  
  it("should have Home text", () => {
    render(
      <SessionProvider
        session={{
          user: {
            email: "test@test.com",
            id: "0",
            token: "token",
          },
          expires: "",
        }}
      >
        <Navbar></Navbar>
      </SessionProvider>
    );
    expect(screen.getByText("Home")).toBeInTheDocument();
  });
  it("should have test@test.com email (logged in)", () => {
    render(
      <SessionProvider
        session={{
          user: {
            email: "test@test.com",
            id: "0",
            token: "token",
          },
          expires: "",
        }}
      >
        <Navbar></Navbar>
      </SessionProvider>
    );
    expect(screen.getByText("test@test.com")).toBeInTheDocument();
  });
  it("should have Login text", () => {
    render(
      <SessionProvider>
        <Navbar></Navbar>
      </SessionProvider>
    );

    expect(screen.getByText("Login")).toBeInTheDocument();
  });
});
