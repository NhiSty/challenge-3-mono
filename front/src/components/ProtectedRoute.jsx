import { Navigate } from "react-router-dom";
import { PropTypes } from "prop-types";
import useToken, { ROLES } from "@/hooks/useToken";

export default function ProtectedRoute({ children, roleAllowed }) {
  const { isValid, roles, removeToken } = useToken();
  const isConnected = isValid && roles.length > 0;

  // Todo faire en sorte de récupérer le rôle de l'user via son token (jwt) et s'il match avec le rôle passé en props alors c'est good
  // Todo donc il faut aussi faire un hook pour récupérer le token de l'utilisateur et le décoder pour récupérer les données de l'user
  const isAuthorized =
    isValid && roles.some((role) => roleAllowed.includes(role));

  if (!isConnected) {
    removeToken();
    return <Navigate to="/login" />;
  }

  if (!isAuthorized) {
    if (roles.includes(ROLES.ADMIN) || roles.includes(ROLES.CEO)) {
      return <Navigate to="/manager/dashboard" />;
    }

    return <Navigate to="/" />;
  }

  return <>{children}</>;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  roleAllowed: PropTypes.arrayOf(PropTypes.string),
};
