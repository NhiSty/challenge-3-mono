import { Outlet } from "react-router-dom";
import { Navbar } from "@components/shared/Navbar.jsx";
import "react-toastify/dist/ReactToastify.css";

function Layout() {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
