import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.brand}>
        FurnishPro
      </Link>
      <div style={styles.links}>
        {user ? (
          <>
            <span style={styles.welcome}>Hi, {user.name} 👋</span>

            {user.role === "customer" && (
              <>
                <Link to="/customer/dashboard" style={styles.link}>
                  Dashboard
                </Link>
                <Link to="/customer/post-job" style={styles.link}>
                  Post Job
                </Link>
                <Link to="/customer/my-jobs" style={styles.link}>
                  My Jobs
                </Link>
              </>
            )}

            {user.role === "contractor" && (
              <>
                <Link to="/contractor/dashboard" style={styles.link}>
                  Dashboard
                </Link>
                <Link to="/contractor/browse-jobs" style={styles.link}>
                  Browse Jobs
                </Link>
                <Link to="/contractor/my-quotes" style={styles.link}>
                  My Quotes
                </Link>
              </>
            )}

            {user.role === "admin" && (
              <Link to="/admin/dashboard" style={styles.link}>
                Admin Panel
              </Link>
            )}

            <button onClick={handleLogout} style={styles.btn}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/contractor/active-jobs" style={styles.link}>
              Active Jobs
            </Link>
            <Link to="/login" style={styles.link}>
              Login
            </Link>
            <Link to="/register" style={styles.link}>
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    backgroundColor: "#1a1a2e",
    color: "white",
  },
  brand: {
    color: "#e94560",
    fontSize: "22px",
    fontWeight: "bold",
    textDecoration: "none",
  },
  links: { display: "flex", alignItems: "center", gap: "20px" },
  link: { color: "white", textDecoration: "none", fontSize: "14px" },
  welcome: { color: "#aaa", fontSize: "14px" },
  btn: {
    padding: "8px 16px",
    backgroundColor: "#e94560",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
  },
};

export default Navbar;
