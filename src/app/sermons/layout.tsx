import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sermons & Teachings",
  description:
    "Watch or listen to sermons and teachings from Enjiri Center Ministries International.",
  openGraph: {
    title: "Sermons & Teachings",
    description:
      "Watch or listen to sermons and teachings from Enjiri Center Ministries International.",
  },
};

export default function SermonsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
