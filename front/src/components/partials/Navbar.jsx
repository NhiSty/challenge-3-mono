import { MenuIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { NavBarButtons } from "@components/partials/NavBarButton.jsx";
import useToken, { ROLES } from "@/hooks/useToken";
import SwitchLanguage from "@components/partials/SwitchLanguage";
import AccessControl from "@components/AccessControl";

export function Navbar() {
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();
  const { isValid: isConnected } = useToken();

  return (
    <nav className="sticky top-0 border-b border-purple-300 bg-purple-400/[0.55] z-10 backdrop-blur-sm">
      <div className="navbar py-3">
        <div className="navbar-start lg:hidden">
          <div className="dropdown">
            <button
              type="button"
              role="menu"
              tabIndex={0}
              title="Menu"
              className="btn btn-ghost"
            >
              <MenuIcon className="w-6 h-6" />
            </button>

            {isConnected && (
              <ul
                role="menu"
                tabIndex={0}
                className="dropdown-content menu menu-md"
              >
                <AccessControl permissions={[ROLES.EMPLOYEE]}>
                  <li role="menuitem" key={"/planning"}>
                    <Link
                      to={"/planning"}
                      className="hover:bg-primary-500 hover:text-text-100"
                      exact-active-classname="text-primary"
                    >
                      {"Planning"}
                    </Link>
                  </li>
                </AccessControl>
                <li role="menuitem" key={"/search"}>
                  <Link
                    to={"/search"}
                    className="hover:bg-primary-500 hover:text-text-100"
                    exact-active-classname="text-primary"
                  >
                    {"Rechercher"}
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>

        <div className="navbar-center lg:navbar-start gap-2">
          <Link className="lg:btn lg:btn-ghost" to="/">
            Rent-A-Dream
          </Link>

          {isConnected && (
            <>
              <AccessControl permissions={[ROLES.EMPLOYEE]}>
                <Link
                  className="hidden lg:btn lg:btn-ghost"
                  key={"/planning"}
                  exact-active-classname="text-primary"
                  to={"/planning"}
                >
                  {"Planning"}
                </Link>
              </AccessControl>
              <Link
                className="hidden lg:btn lg:btn-ghost"
                key={"/search"}
                exact-active-classname="text-primary"
                to={"/search"}
              >
                {"Rechercher"}
              </Link>
            </>
          )}
        </div>

        <div className="navbar-end lg:mr-2">
          <SwitchLanguage />
          <NavBarButtons />
        </div>
      </div>
    </nav>
  );
}
