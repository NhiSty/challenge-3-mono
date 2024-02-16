import { MenuIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { NavBarButtons } from "@components/shared/NavBarButton.jsx";
import useToken, { ROLES } from "@/hooks/useToken";
import SwitchLanguage from "@components/shared/SwitchLanguage";
import { useTranslation } from "@/translation/useTranslation";
import AccessControl from "@components/shared/AccessControl";

export function Navbar() {
  const { isValid: isConnected } = useToken();
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();
  const { t } = useTranslation();

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

            <ul
              role="menu"
              tabIndex={0}
              className="dropdown-content menu menu-md"
            >
              isConnected && (
              <>
                <li role="menuitem" key={"home"}>
                  <Link
                    to={"/"}
                    className="hover:bg-primary-500 hover:text-text-100"
                    exact-active-classname="text-primary"
                  >
                    {t("home")}
                  </Link>
                </li>

                <AccessControl permissions={[ROLES.EMPLOYEE]}>
                  <li role="menuitem" key={"planning"}>
                    <Link
                      to={"/planning"}
                      className="hover:bg-primary-500 hover:text-text-100"
                      exact-active-classname="text-primary"
                    >
                      {t("planning")}
                    </Link>
                  </li>
                </AccessControl>

                <li role="menuitem" key={"planning"}>
                  <Link
                    to={"/search"}
                    className="hover:bg-primary-500 hover:text-text-100"
                    exact-active-classname="text-primary"
                  >
                    {t("search")}
                  </Link>
                </li>
                <AccessControl permissions={[ROLES.ADMIN, ROLES.MANAGER]}>
                  <li role="menuitem" key={"dashboard"}>
                    <Link
                      to={"manage"}
                      className="hover:bg-primary-500 hover:text-text-100"
                      exact-active-classname="text-primary"
                    >
                      {t("dashboard")}
                    </Link>
                  </li>
                </AccessControl>
              </>
              )
            </ul>
          </div>
        </div>

        <div className="navbar-center lg:navbar-start gap-2">
          <Link className="lg:btn lg:btn-ghost" to="/">
            Rent-A-Dream
          </Link>

          {isConnected && (
            <>
              <Link
                className="hidden lg:btn lg:btn-ghost"
                exact-active-classname="text-primary"
                to={"/"}
              >
                {t("home")}
              </Link>
              <AccessControl permissions={[ROLES.EMPLOYEE]}>
                <Link
                  to={"/planning"}
                  className="hidden lg:btn lg:btn-ghost"
                  exact-active-classname="text-primary"
                >
                  {t("planning")}
                </Link>
              </AccessControl>
              <Link
                to={"/search"}
                className="hidden lg:btn lg:btn-ghost"
                exact-active-classname="text-primary"
              >
                {t("search")}
              </Link>
              <AccessControl permissions={[ROLES.ADMIN, ROLES.MANAGER]}>
                <Link
                  to={"manage"}
                  className="hidden lg:btn lg:btn-ghost"
                  exact-active-classname="text-primary"
                >
                  {t("dashboard")}
                </Link>
              </AccessControl>
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
