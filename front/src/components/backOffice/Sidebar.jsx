import {
  LayoutDashboard,
  Building2,
  Users,
  BookOpenText,
  FolderClock,
} from "lucide-react";

import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useTranslation } from "@/translation/useTranslation";
import SwitchLanguage from "@components/partials/SwitchLanguage";
import AccessControl from "@components/AccessControl";
import { ROLES } from "@/hooks/useToken";

export default function Sidebar({ children }) {
  const { t } = useTranslation();
  return (
    <>
      <div className="drawer sm:drawer-open">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content bg-base-200">{children}</div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-64 min-h-full text-base-content">
            <li className="mb-5 font-semibold text-lg">
              <a href="/manage">
                <img
                  className="mask mask-squircle w-7 h-7"
                  src="/vite.svg"
                  alt="DashWind Logo"
                />
                DashManager
              </a>
            </li>

            <li className={"mb-2"}>
              <Link className="font-normal" to={"/manage"}>
                <LayoutDashboard />
                {t("dashboard")}
              </Link>
            </li>

            <li className={"mb-2"}>
              <Link className="font-normal" to={"/manage/company"}>
                <Building2 />
                {t("myCompany")}
              </Link>
            </li>

            <li className={"mb-2"}>
              <Link className="font-normal" to={"/manage/employees"}>
                <Users />
                {t("employees")}
              </Link>
            </li>

            <li className={"mb-2"}>
              <Link className="font-normal" to={"/manage/services"}>
                <BookOpenText />
                {t("service")}
              </Link>
            </li>

            <AccessControl permissions={[ROLES.ADMIN]}>
              <li className={"mb-2"}>
                <Link className="font-normal" to={"/manage/demands"}>
                  <FolderClock />
                  {t("demands")}
                </Link>
              </li>
            </AccessControl>

            <div className={"px-4 py-2"}>
              <SwitchLanguage />
            </div>
          </ul>
        </div>
      </div>
    </>
  );
}

Sidebar.propTypes = {
  children: PropTypes.node.isRequired,
};
