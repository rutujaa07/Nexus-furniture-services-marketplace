// import { useAuth } from "../../context/AuthContext";
// import { Link } from "react-router-dom";

// const ContractorDashboard = () => {
//   const { user } = useAuth();

//   return (
//     <div style={styles.container}>
//       <h1 style={styles.title}>Welcome, {user?.name} 🔨</h1>
//       <p style={styles.sub}>Manage your jobs and quotes</p>
//       <div style={styles.grid}>
//         <Link to="/contractor/browse-jobs" style={styles.card}>
//           <div style={styles.icon}>🔍</div>
//           <h3>Browse Jobs</h3>
//           <p style={styles.cardText}>Find furniture jobs near you</p>
//         </Link>
//         <Link to="/contractor/my-quotes" style={styles.card}>
//           <div style={styles.icon}>📝</div>
//           <h3>My Quotes</h3>
//           <p style={styles.cardText}>Track your submitted quotes</p>
//         </Link>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: { padding: "40px", maxWidth: "900px", margin: "0 auto" },
//   title: { fontSize: "28px", color: "#1a1a2e" },
//   sub: { color: "#666", marginBottom: "30px" },
//   grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" },
//   card: {
//     backgroundColor: "white",
//     padding: "35px",
//     borderRadius: "12px",
//     boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
//     textDecoration: "none",
//     color: "#1a1a2e",
//     textAlign: "center",
//   },
//   icon: { fontSize: "40px", marginBottom: "15px" },
//   cardText: { color: "#888", fontSize: "14px" },
// };

// export default ContractorDashboard;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "../../api/axios";
import { toast } from "react-toastify";

const ContractorDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const { data } = await axios.get("/quotes/myquotes");
        setQuotes(data);
      } catch (error) {
        toast.error("Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    fetchQuotes();
  }, []);

  const accepted = quotes.filter((q) => q.status === "accepted").length;
  const pending = quotes.filter((q) => q.status === "pending").length;
  const total = quotes.length;

  return (
    <div className="page-wide">
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: 36,
        }}
      >
        <div>
          <div className="section-label">Welcome back</div>
          <h1 className="page-title">{user?.businessName || user?.name}</h1>
          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            {user?.isApproved ? (
              <span className="badge badge-accepted">
                ✓ Verified Contractor
              </span>
            ) : (
              <span className="badge badge-pending">⏳ Pending Approval</span>
            )}
            {user?.rating > 0 && (
              <span style={{ fontSize: 13, color: "var(--ink2)" }}>
                ⭐ {user.rating}
              </span>
            )}
          </div>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/contractor/browse-jobs")}
        >
          Browse Jobs →
        </button>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 16,
          marginBottom: 40,
        }}
      >
        {[
          { n: total, l: "Total quotes sent", c: "var(--ink)" },
          { n: pending, l: "Awaiting response", c: "var(--warning, #B45309)" },
          { n: accepted, l: "Quotes accepted", c: "var(--success)" },
        ].map((s) => (
          <div className="stat-box" key={s.l}>
            <div className="stat-num" style={{ color: s.c }}>
              {s.n}
            </div>
            <div className="stat-label">{s.l}</div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="section-label">Quick actions</div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 14,
          marginBottom: 36,
        }}
      >
        {[
          {
            icon: "🔍",
            label: "Browse Jobs",
            sub: "Find new jobs to bid on",
            path: "/contractor/browse-jobs",
          },
          {
            icon: "📝",
            label: "My Quotes",
            sub: "Track submitted quotes",
            path: "/contractor/my-quotes",
          },
          {
            icon: "🔨",
            label: "Active Jobs",
            sub: "Manage your current jobs",
            path: "/contractor/active-jobs",
          },
        ].map((a) => (
          <div
            key={a.label}
            className="card"
            style={{ cursor: "pointer", textAlign: "center" }}
            onClick={() => navigate(a.path)}
          >
            <div style={{ fontSize: 32, marginBottom: 10 }}>{a.icon}</div>
            <div style={{ fontWeight: 600, marginBottom: 4 }}>{a.label}</div>
            <div style={{ fontSize: 13, color: "var(--ink2)" }}>{a.sub}</div>
          </div>
        ))}
      </div>

      {/* Recent quotes */}
      <div className="section-label">Recent quotes</div>
      {loading ? (
        <div style={{ padding: 40, textAlign: "center", color: "var(--ink3)" }}>
          Loading...
        </div>
      ) : quotes.length === 0 ? (
        <div className="empty">
          <div style={{ fontSize: 36, marginBottom: 10 }}>📭</div>
          <h3 style={{ fontSize: 17, marginBottom: 6 }}>No quotes yet</h3>
          <p style={{ fontSize: 14, color: "var(--ink2)", marginBottom: 16 }}>
            Browse open jobs and submit your first quote.
          </p>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => navigate("/contractor/browse-jobs")}
          >
            Browse Jobs →
          </button>
        </div>
      ) : (
        quotes.slice(0, 4).map((q) => (
          <div className="job-card" key={q._id}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ fontWeight: 600 }}>{q.job?.title || "Job"}</div>
              <span className={`badge badge-${q.status}`}>
                {q.status.charAt(0).toUpperCase() + q.status.slice(1)}
              </span>
            </div>
            <div className="job-meta">
              <span className="job-meta-item">💰 Quoted ₹{q.price}</span>
              <span className="job-meta-item">⏱ {q.estimatedTime}</span>
              <span className="job-meta-item">📍 {q.job?.location}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ContractorDashboard;
