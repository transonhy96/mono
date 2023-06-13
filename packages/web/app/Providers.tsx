"use client";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
interface ProviderProps {
  children?: React.ReactNode | JSX.Element;
}
export default function Providers({ children }: ProviderProps) {
  return (
    <ThemeProvider attribute="class">
      <SessionProvider>{children}</SessionProvider>
    </ThemeProvider>
  );
}
