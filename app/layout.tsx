import "./globals.css";

import type { Metadata } from "next";
import { Providers } from "./Provider";

export const metadata: Metadata = {
  title: "User Management App",
  description: "Built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}