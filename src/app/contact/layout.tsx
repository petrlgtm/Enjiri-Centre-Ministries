import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Enjiri Center Ministries International. Visit us in Kampala, Uganda or send us a message.",
  openGraph: {
    title: "Contact Us | Enjiri Center Ministries",
    description:
      "Get in touch with Enjiri Center Ministries International. Visit us in Kampala, Uganda or send us a message.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
