// import { useAuth } from "../../context/AuthContext";
// import { Link } from "react-router-dom";

// const CustomerDashboard = () => {
//   const { user } = useAuth();

//   return (
//     <div style={styles.container}>
//       <h1 style={styles.title}>Welcome, {user?.name} 👋</h1>
//       <p style={styles.sub}>What would you like to do today?</p>
//       <div style={styles.grid}>
//         <Link to="/customer/post-job" style={styles.card}>
//           <div style={styles.icon}>📋</div>
//           <h3>Post a Job</h3>
//           <p style={styles.cardText}>Request a furniture service</p>
//         </Link>
//         <Link to="/customer/my-jobs" style={styles.card}>
//           <div style={styles.icon}>🗂️</div>
//           <h3>My Jobs</h3>
//           <p style={styles.cardText}>View and manage your jobs</p>
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

// export default CustomerDashboard;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "../../api/axios";
import { toast } from "react-toastify";

const statusColors = {
  open: "badge-open",
  quoted: "badge-quoted",
  accepted: "badge-accepted",
  in_progress: "badge-inprogress",
  completed: "badge-completed",
  cancelled: "badge-cancelled",
};

const statusLabels = {
  open: "Open",
  quoted: "Quoted",
  accepted: "Accepted",
  in_progress: "In Progress",
  completed: "Completed",
  cancelled: "Cancelled",
};

const CustomerDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get("/jobs/myjobs");
        setJobs(data);
      } catch (error) {
        toast.error("Failed to load jobs");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const totalJobs = jobs.length;
  const activeJobs = jobs.filter((j) =>
    ["accepted", "in_progress", "quoted"].includes(j.status)
  ).length;
  const completedJobs = jobs.filter((j) => j.status === "completed").length;

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
          <div className="section-label">Good day</div>
          <h1 className="page-title">{user?.name}</h1>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/customer/post-job")}
        >
          + Post a Job
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
          { n: totalJobs, l: "Jobs posted", c: "var(--ink)" },
          { n: activeJobs, l: "Active jobs", c: "var(--accent)" },
          { n: completedJobs, l: "Completed", c: "var(--success)" },
        ].map((s) => (
          <div className="stat-box" key={s.l}>
            <div className="stat-num" style={{ color: s.c }}>
              {s.n}
            </div>
            <div className="stat-label">{s.l}</div>
          </div>
        ))}
      </div>

      {/* Recent Jobs */}
      <div className="section-label">Recent jobs</div>

      {loading ? (
        <div
          style={{ padding: "40px", textAlign: "center", color: "var(--ink3)" }}
        >
          Loading your jobs...
        </div>
      ) : jobs.length === 0 ? (
        <div className="empty">
          <div style={{ fontSize: 40, marginBottom: 12 }}>📋</div>
          <h3 style={{ fontSize: 18, marginBottom: 6 }}>No jobs yet</h3>
          <p style={{ fontSize: 14, color: "var(--ink2)", marginBottom: 20 }}>
            Post your first furniture service request and get quotes from
            contractors.
          </p>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/customer/post-job")}
          >
            Post your first job →
          </button>
        </div>
      ) : (
        jobs.slice(0, 5).map((job) => (
          <div
            className="job-card"
            key={job._id}
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/customer/my-jobs")}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <div style={{ fontWeight: 600, fontSize: 15 }}>{job.title}</div>
              <span className={`badge ${statusColors[job.status]}`}>
                {statusLabels[job.status]}
              </span>
            </div>
            <div className="job-meta">
              <span className="job-meta-item">📍 {job.location}</span>
              <span className="job-meta-item">🔧 {job.serviceType}</span>
              {job.budget && (
                <span className="job-meta-item">💰 ₹{job.budget}</span>
              )}
              {job.status === "quoted" && (
                <span
                  className="job-meta-item"
                  style={{ color: "var(--accent)", fontWeight: 600 }}
                >
                  Quotes waiting →
                </span>
              )}
            </div>
          </div>
        ))
      )}

      {jobs.length > 0 && (
        <button
          className="btn btn-ghost btn-sm"
          style={{ marginTop: 12 }}
          onClick={() => navigate("/customer/my-jobs")}
        >
          View all jobs →
        </button>
      )}
    </div>
  );
};

export default CustomerDashboard;
