import UserInfo from "@/components/Auth/UserInfo";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SessionProvider, getSession, useSession } from "next-auth/react";
describe("UserInfo - Rendering", () => {
  it("should have email and password input", () => {
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
        <UserInfo></UserInfo>
      </SessionProvider>
    );
    expect(
      screen.getByRole("button", { name: "Start sharing" })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Logout" })).toBeInTheDocument();
  });
  //TODO: Mock logout behavior of next-auth
  // it("should logout", async () => {
  //   render(
  //     <SessionProvider
  //       session={{
  //         user: {
  //           email: "test@test.com",
  //           id: "0",
  //           token: "token",
  //         },
  //         expires: "",
  //       }}
  //     >
  //       <UserInfo></UserInfo>
  //     </SessionProvider>
  //   );
  //   userEvent.click(screen.getByRole("button", { name: "Logout" }));
    
  //   await waitFor(() => {
  //     expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  //   });
  // });
});
