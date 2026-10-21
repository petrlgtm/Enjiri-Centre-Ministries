import Script from "next/script";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-W7LDJYHKSF";

/** Google Analytics 4 (stream "Enjiri"). Loads only in production builds; GA4 enhanced measurement tracks client-side page changes. */
export default function GoogleAnalytics() {
  if (process.env.NODE_ENV !== "production") return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
      </Script>
    </>
  );
}
