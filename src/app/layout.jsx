import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata = {
  title: "My learning",
  description: "Online courses studying platform",
};

export default function RootLayout({ children }) {

  return (
    <html lang="es">
      <body>
        <img id="marikita" src="/static/owl.svg" alt="Buho" className="absolute m-auto h-10 z-50" />
        <Navbar></Navbar>
        {children}
        <Footer></Footer>

        <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
        <script src="/static/js/main.js"></script>
      </body>
    </html>
  );
}
