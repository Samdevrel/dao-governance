import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DAO Governance | @samdevrel",
  description: "Vote on proposals with token-weighted governance. Snapshot voting, quorum thresholds, and delegation.",
  keywords: ["DAO", "governance", "Snapshot", "voting", "token", "quorum", "delegation"],
  authors: [{ name: "Sam", url: "https://x.com/samdevrel" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
