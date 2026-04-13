// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const Navbar = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   return (
//     <nav style={styles.nav}>
//       <Link to="/" style={styles.brand}>
//         FurnishPro
//       </Link>
//       <div style={styles.links}>
//         {user ? (
//           <>
//             <span style={styles.welcome}>Hi, {user.name} 👋</span>

//             {user.role === "customer" && (
//               <>
//                 <Link to="/customer/dashboard" style={styles.link}>
//                   Dashboard
//                 </Link>
//                 <Link to="/customer/post-job" style={styles.link}>
//                   Post Job
//                 </Link>
//                 <Link to="/customer/my-jobs" style={styles.link}>
//                   My Jobs
//                 </Link>
//               </>
//             )}

//             {user.role === "contractor" && (
//               <>
//                 <Link to="/contractor/dashboard" style={styles.link}>
//                   Dashboard
//                 </Link>
//                 <Link to="/contractor/browse-jobs" style={styles.link}>
//                   Browse Jobs
//                 </Link>
//                 <Link to="/contractor/my-quotes" style={styles.link}>
//                   My Quotes
//                 </Link>
//               </>
//             )}

//             {user.role === "admin" && (
//               <Link to="/admin/dashboard" style={styles.link}>
//                 Admin Panel
//               </Link>
//             )}

//             <button onClick={handleLogout} style={styles.btn}>
//               Logout
//             </button>
//           </>
//         ) : (
//           <>
//             <Link to="/contractor/active-jobs" style={styles.link}>
//               Active Jobs
//             </Link>
//             <Link to="/login" style={styles.link}>
//               Login
//             </Link>
//             <Link to="/register" style={styles.link}>
//               Register
//             </Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// };

// const styles = {
//   nav: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: "15px 30px",
//     backgroundColor: "#1a1a2e",
//     color: "white",
//   },
//   brand: {
//     color: "#e94560",
//     fontSize: "22px",
//     fontWeight: "bold",
//     textDecoration: "none",
//   },
//   links: { display: "flex", alignItems: "center", gap: "20px" },
//   link: { color: "white", textDecoration: "none", fontSize: "14px" },
//   welcome: { color: "#aaa", fontSize: "14px" },
//   btn: {
//     padding: "8px 16px",
//     backgroundColor: "#e94560",
//     color: "white",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer",
//     fontSize: "14px",
//   },
// };

// export default Navbar;
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../index.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="nav">
      <Link to="/" className="nav-brand">
        Nexus<span>.</span>
      </Link>

      <div className="nav-links">
        {!user && (
          <>
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/register">
              <button className="btn btn-primary btn-sm">Get Started</button>
            </Link>
          </>
        )}

        {user?.role === "customer" && (
          <>
            <span className="nav-badge">Customer</span>
            <Link to="/customer/dashboard" className="nav-link">
              Dashboard
            </Link>
            <Link to="/customer/post-job" className="nav-link">
              Post Job
            </Link>
            <Link to="/customer/my-jobs" className="nav-link">
              My Jobs
            </Link>
            <button className="btn-logout" onClick={handleLogout}>
              Sign out
            </button>
          </>
        )}

        {user?.role === "contractor" && (
          <>
            <span className="nav-badge">Contractor</span>
            <Link to="/contractor/dashboard" className="nav-link">
              Dashboard
            </Link>
            <Link to="/contractor/browse-jobs" className="nav-link">
              Browse Jobs
            </Link>
            <Link to="/contractor/my-quotes" className="nav-link">
              My Quotes
            </Link>
            <Link to="/contractor/active-jobs" className="nav-link">
              Active Jobs
            </Link>
            <Link to="/contractor/portfolio" className="nav-link">
              Portfolio
            </Link>
            <button className="btn-logout" onClick={handleLogout}>
              Sign out
            </button>
          </>
        )}

        {user?.role === "admin" && (
          <>
            <span className="nav-badge">Admin</span>
            <button className="btn-logout" onClick={handleLogout}>
              Sign out
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
