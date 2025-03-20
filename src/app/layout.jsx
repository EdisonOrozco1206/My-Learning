import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";
import Image from "next/image";
import Script from "next/script";

export const metadata = {
  title: "My learning",
  description: "Online courses studying platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body>
        <Image id="marikita" src="/static/owl.svg" alt="Buho" width={40} height={40} className=" m-auto z-50 hidden lg:block" />
        <Navbar />
        {children}
        <Footer />

        <Script src="https://code.jquery.com/jquery-3.7.1.min.js" strategy="beforeInteractive" />
        <Script src="/static/js/main.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
