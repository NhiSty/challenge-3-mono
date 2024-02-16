import { Navigate } from "react-router-dom";
import { PropTypes } from "prop-types";
import useToken, { ROLES } from "@/hooks/useToken";

export default function ProtectedRoute({ children, roleAllowed }) {
  const { isValid, roles, removeToken } = useToken();
  const isConnected = isValid && roles.length > 0;

  const isAuthorized =
    isValid && roles.some((role) => roleAllowed.includes(role));

  if (!isConnected) {
    removeToken();
    return <Navigate to="/login" />;
  }

  if (!isAuthorized) {
    if (roles.includes(ROLES.ADMIN) || roles.includes(ROLES.MANAGER)) {
      return <Navigate to="/manage" />;
    }

    return <Navigate to="/" />;
  }

  return <>{children}</>;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  roleAllowed: PropTypes.arrayOf(PropTypes.string),
};
