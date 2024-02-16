import useToken from "@/hooks/useToken";
import PropTypes from "prop-types";

export default function useAccessControl({ roles: requiredRoles }) {
  const { roles } = useToken();

  if (!roles) {
    return false;
  }

  return requiredRoles.some((role) => roles.includes(role));
}

useAccessControl.propTypes = {
  roles: PropTypes.arrayOf(PropTypes.string).isRequired,
};
