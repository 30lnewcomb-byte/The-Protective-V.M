import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "The Protective V.M.",
  description: "A safety-first control console for isolated Android app inspection."
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}