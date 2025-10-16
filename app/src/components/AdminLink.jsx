import { Link, useMatch } from "@tanstack/react-router";
import styles from "../styles/Admin.module.css";

function AdminLink({ to, children }) {
  const isActive = useMatch({ to, fuzzy: true });
  return (
    <Link to={to} className={isActive ? styles.activeLink : ""}>
      {children}
    </Link>
  );
}

export default AdminLink;
