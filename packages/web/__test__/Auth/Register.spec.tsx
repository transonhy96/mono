import Register from "@/components/Auth/Register";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
describe("Register - Rendering", () => {
  it("should have email ,password and reenter password input", () => {
    render(<Register></Register>);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Reenter")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Register" })
    ).toBeInTheDocument();
  });
  it("should throw error when click login button", async () => {
    render(<Register></Register>);
    userEvent.click(screen.getByRole("button", { name: "Register" }));
    await waitFor(() => {
      expect(screen.getByLabelText("Email")).toHaveFocus();
    });
  });
});
