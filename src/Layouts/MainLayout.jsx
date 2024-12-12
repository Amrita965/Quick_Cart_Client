import { Outlet } from "react-router-dom";
import Navbar from "../Components/Shared/Navbar";
import Footer from "../Components/Shared/Footer";

const MainLayout = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="md:max-w-sreen-md lg:max-w-screen-lg xl:max-w-screen-xl mx-auto">
        <Outlet />
      </main>
      <Footer/>
    </>
  );
};

export default MainLayout;
