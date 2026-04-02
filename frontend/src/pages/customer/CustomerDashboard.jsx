import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const CustomerDashboard = () => {
  const { user } = useAuth();

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome, {user?.name} 👋</h1>
      <p style={styles.sub}>What would you like to do today?</p>
      <div style={styles.grid}>
        <Link to="/customer/post-job" style={styles.card}>
          <div style={styles.icon}>📋</div>
          <h3>Post a Job</h3>
          <p style={styles.cardText}>Request a furniture service</p>
        </Link>
        <Link to="/customer/my-jobs" style={styles.card}>
          <div style={styles.icon}>🗂️</div>
          <h3>My Jobs</h3>
          <p style={styles.cardText}>View and manage your jobs</p>
        </Link>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: "40px", maxWidth: "900px", margin: "0 auto" },
  title: { fontSize: "28px", color: "#1a1a2e" },
  sub: { color: "#666", marginBottom: "30px" },
  grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" },
  card: {
    backgroundColor: "white",
    padding: "35px",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
    textDecoration: "none",
    color: "#1a1a2e",
    textAlign: "center",
  },
  icon: { fontSize: "40px", marginBottom: "15px" },
  cardText: { color: "#888", fontSize: "14px" },
};

export default CustomerDashboard;
