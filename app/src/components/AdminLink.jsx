import { Link, useLocation } from "@tanstack/react-router";
import styles from "../styles/Admin.module.css";

function AdminLink({ to, children }) {
  const location = useLocation();
  const isActive = to === location.href;
  console.log(to, location);
  return (
    <Link to={to} className={isActive ? styles.activeLink : ""}>
      {children}
    </Link>
  );
}

export default AdminLink;
