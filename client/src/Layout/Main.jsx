import { Outlet } from "react-router-dom";
import Navbar from "../Component/Navbar/Navbar";
import Footer from "../Component/Footer/Footer";

const Main = () => {
  return (
    <>
      <Navbar />
      <div style={{ minHeight: 'calc(100vh - 372px)' }}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Main;
