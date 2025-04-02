import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";
import Image from "next/image";
import Script from "next/script";
import { headers } from "next/headers";

export const metadata = {
  title: "My Learning",
  description: "Online courses studying platform",
};

export default function RootLayout({ children }) {
  const headersList = headers();
  const cspHeader = headersList.get("Content-Security-Policy");
  const nonceMatch = cspHeader?.match(/nonce-([^']+)/);
  const nonce = nonceMatch ? nonceMatch[1] : "";

  return (
    <html lang="es">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <style nonce={nonce}>{`body { background-color: #f4f4f4; }`}</style>
      </head>
      <body>
        <Image id="marikita" src="/static/owl.svg" alt="Buho" width={40} height={40} className="hidden lg:block m-auto z-50" />
        <Navbar />
        {children}
        <Footer />

        <Script src="https://code.jquery.com/jquery-3.7.1.min.js" strategy="beforeInteractive" nonce={nonce} />
        <Script src="/static/js/main.js" strategy="lazyOnload" nonce={nonce} />
      </body>
    </html>
  );
}