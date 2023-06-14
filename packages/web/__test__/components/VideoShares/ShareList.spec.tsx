import { ShareList } from "@/components";
import { render, screen, waitFor } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";

describe("ShareList - Rendering", () => {
  it("should have the text You (the shared video belongs to you)", async () => {
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
        <ShareList></ShareList>
      </SessionProvider>
    );
    await waitFor(() => {
      expect(screen.getByText("You")).toBeInTheDocument();
    });
  });
  it("should have the text test@test.com", async () => {
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
        <ShareList></ShareList>
      </SessionProvider>
    );
    await waitFor(() => {
      expect(screen.getByText("test@test.com")).toBeInTheDocument();
    });
  });
  it("should not have next button (no pagination)", async () => {
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
        <ShareList></ShareList>
      </SessionProvider>
    );
    expect(screen.queryByText("2")).not.toBeInTheDocument();
  });
});
