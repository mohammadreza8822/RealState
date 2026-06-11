import Footer from "@/layout/Footer";
import Header from "@/layout/Header";

function Layout({ children }) {
  return (
    <>
      <Header />
      <div className="pt-24 min-h-[calc(100vh-6rem)]">{children}</div>
      <Footer />
    </>
  );
}

export default Layout;
