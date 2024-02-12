import useAccessControl from "@/hooks/useAccessControl";
import PropTypes from "prop-types";

export default function AccessControl({ children, permissions }) {
  const canAccess = useAccessControl({ roles: permissions });

  if (canAccess) {
    return children;
  }

  return null;
}

AccessControl.propTypes = {
  children: PropTypes.node.isRequired,
  permissions: PropTypes.arrayOf(PropTypes.string).isRequired,
};
