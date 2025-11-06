import { Link, useLocation } from "@tanstack/react-router";
import styles from "../styles/Admin.module.css";

function AdminLink({ to, children, exact = false }) {
  const location = useLocation();
  const decodedPathname = decodeURIComponent(location.pathname);
  let isActive = false;
  if (exact) {
    isActive = to === location.href;
  } else {
    isActive = decodedPathname.startsWith(to);
  }
  console.log(to, location);
  return (
    <Link to={to} className={isActive ? styles.activeLink : ""}>
      {children}
    </Link>
  );
}

export default AdminLink;
