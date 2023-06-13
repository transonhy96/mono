"use client";
import { ThemeProvider } from "next-themes";
interface ProviderProps {
  children?: React.ReactNode | JSX.Element;
}
export default function Providers({ children }: ProviderProps) {
  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
}
