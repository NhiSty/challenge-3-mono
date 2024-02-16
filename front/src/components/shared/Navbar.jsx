import { MenuIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { NavBarButtons } from "@components/shared/NavBarButton.jsx";
import useToken from "@/hooks/useToken";
import SwitchLanguage from "@components/shared/SwitchLanguage";
import { useTranslation } from "@/translation/useTranslation";

export function Navbar() {
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();
  const { isValid: isConnected } = useToken();
  const { t } = useTranslation();

  const links = [
    {
      text: t("home"),
      to: "/",
    },
    {
      text: "Planning",
      to: "/planning",
    },
    {
      text: t("search"),
      to: "/search",
    },
    {
      text: "Dashboard",
      to: "/dashboard",
    },
  ];

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
              {links.map(
                (link) =>
                  isConnected && (
                    <li role="menuitem" key={link.to}>
                      <Link
                        to={link.to}
                        className="hover:bg-primary-500 hover:text-text-100"
                        exact-active-classname="text-primary"
                      >
                        {link.text}
                      </Link>
                    </li>
                  ),
              )}
            </ul>
          </div>
        </div>

        <div className="navbar-center lg:navbar-start gap-2">
          <Link className="lg:btn lg:btn-ghost" to="/">
            Rent-A-Dream
          </Link>

          {isConnected &&
            links.map((link) => (
              <Link
                className="hidden lg:btn lg:btn-ghost"
                key={link.to}
                exact-active-classname="text-primary"
                to={link.to}
              >
                {link.text}
              </Link>
            ))}
        </div>

        <div className="navbar-end lg:mr-2">
          <SwitchLanguage />
          <NavBarButtons />
        </div>
      </div>
    </nav>
  );
}
