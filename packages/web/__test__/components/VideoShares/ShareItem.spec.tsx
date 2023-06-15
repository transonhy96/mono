import { ShareItem } from "@/components";
import { Share } from "@/types/shareType";
import { render, screen, waitFor } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";

describe("ShareItem - Rendering", () => {
  const shareItem = {
    id: 0,
    email: "test@test.com",
    created_at: 0,
    url: "https://youtube.com",
    user_id: "0",
    user: {
      id: "0",
      email: "test@test.com",
    },
  } as Share;
  
  it("should have test@test.com text", async () => {
    render(
      <SessionProvider
        session={{
          user: {
            email: "other@test.com",
            id: "0",
            token: "token",
          },
          expires: "",
        }}
      >
        <ShareItem {...shareItem}></ShareItem>
      </SessionProvider>
    );
    const item = screen.getByText("test@test.com");
    expect(item).toBeInTheDocument();
  });
  it("should have test@test.com without user authenticated", () => {
    render(
      <SessionProvider
        session={{
          user: {
            id: "0",
            email: "",
            token: "",
          },
          expires: "",
        }}
      >
        <ShareItem {...shareItem}></ShareItem>
      </SessionProvider>
    );
    expect(screen.getAllByText("test@test.com"));
  });
});
