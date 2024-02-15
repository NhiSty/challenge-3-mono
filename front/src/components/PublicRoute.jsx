import { Navigate } from "react-router-dom";
import { PropTypes } from "prop-types";
import useToken from "@/hooks/useToken";

export default function PublicRoute({ children }) {
  const { isValid, roles } = useToken();
  const isConnected = isValid && roles.length > 0;

  if (isConnected) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
