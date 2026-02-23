export const metadata = {
  title: "Sanity Studio | Enjiri Center Ministries",
};

export function generateStaticParams() {
  return [{ tool: [] }];
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
