import Login from "@/components/Auth/Login";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
describe("Login - Rendering", () => {
 
  it("should have start sharing and logout button", () => {
    render(<Login></Login>);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
  });
  it("should throw error when click login button", async () => {
    render(<Login></Login>);
    userEvent.click(screen.getByRole("button", { name: "Login" }));
    await waitFor(() => {
      expect(screen.getByLabelText("Email")).toHaveFocus();
    });
  });
});
