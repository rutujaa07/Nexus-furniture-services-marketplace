// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "../../api/axios";
// import { toast } from "react-toastify";

// const statusColors = {
//   open: "#3498db",
//   quoted: "#f39c12",
//   accepted: "#9b59b6",
//   in_progress: "#e67e22",
//   completed: "#2ecc71",
//   cancelled: "#e74c3c",
// };

// const MyJobs = () => {
//   const [jobs, setJobs] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const { data } = await axios.get("/jobs/myjobs");
//         setJobs(data);
//       } catch (error) {
//         toast.error("Failed to load jobs");
//       }
//     };
//     fetchJobs();
//   }, []);

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.title}>My Jobs 🗂️</h2>
//       {jobs.length === 0 ? (
//         <div style={styles.empty}>
//           <p>You haven't posted any jobs yet.</p>
//           <button
//             style={styles.btn}
//             onClick={() => navigate("/customer/post-job")}
//           >
//             Post Your First Job
//           </button>
//         </div>
//       ) : (
//         jobs.map((job) => (
//           <div key={job._id} style={styles.card}>
//             <div style={styles.cardHeader}>
//               <h3 style={styles.jobTitle}>{job.title}</h3>
//               <span
//                 style={{
//                   ...styles.badge,
//                   backgroundColor: statusColors[job.status],
//                 }}
//               >
//                 {job.status.toUpperCase()}
//               </span>
//             </div>
//             <p style={styles.desc}>{job.description}</p>
//             <div style={styles.meta}>
//               <span>📍 {job.location}</span>
//               <span>🔧 {job.serviceType}</span>
//               {job.budget && <span>💰 ₹{job.budget}</span>}
//             </div>
//             {job.status === "quoted" && (
//               <button
//                 style={styles.viewBtn}
//                 onClick={() => navigate(`/customer/quotes/${job._id}`)}
//               >
//                 View Quotes
//               </button>
//             )}
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// const styles = {
//   container: { padding: "40px", maxWidth: "800px", margin: "0 auto" },
//   title: { fontSize: "26px", color: "#1a1a2e", marginBottom: "25px" },
//   empty: { textAlign: "center", padding: "60px", color: "#888" },
//   card: {
//     backgroundColor: "white",
//     padding: "25px",
//     borderRadius: "12px",
//     boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
//     marginBottom: "20px",
//   },
//   cardHeader: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: "10px",
//   },
//   jobTitle: { color: "#1a1a2e", margin: 0 },
//   badge: {
//     padding: "5px 12px",
//     borderRadius: "20px",
//     color: "white",
//     fontSize: "12px",
//     fontWeight: "bold",
//   },
//   desc: { color: "#666", fontSize: "14px", marginBottom: "15px" },
//   meta: { display: "flex", gap: "20px", fontSize: "14px", color: "#888" },
//   btn: {
//     marginTop: "20px",
//     padding: "12px 25px",
//     backgroundColor: "#e94560",
//     color: "white",
//     border: "none",
//     borderRadius: "6px",
//     cursor: "pointer",
//   },
//   viewBtn: {
//     marginTop: "15px",
//     padding: "10px 20px",
//     backgroundColor: "#1a1a2e",
//     color: "white",
//     border: "none",
//     borderRadius: "6px",
//     cursor: "pointer",
//   },
// };

// export default MyJobs;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

const MyJobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

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

  const filters = [
    "all",
    "open",
    "quoted",
    "accepted",
    "in_progress",
    "completed",
  ];

  const filteredJobs =
    filter === "all" ? jobs : jobs.filter((j) => j.status === filter);

  return (
    <div className="page">
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <h1 className="page-title">My Jobs</h1>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => navigate("/customer/post-job")}
        >
          + New Job
        </button>
      </div>
      <p className="page-sub">
        Track and manage all your furniture service requests.
      </p>

      {/* Filter tabs */}
      <div
        style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 24 }}
      >
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: "6px 14px",
              borderRadius: 20,
              fontSize: 12,
              fontWeight: 500,
              cursor: "pointer",
              border: "1.5px solid",
              fontFamily: "DM Sans, sans-serif",
              borderColor: filter === f ? "var(--accent)" : "var(--border)",
              background: filter === f ? "var(--accent)" : "var(--surface)",
              color: filter === f ? "white" : "var(--ink2)",
              transition: "all 0.15s",
            }}
          >
            {f === "all" ? "All" : statusLabels[f]}
          </button>
        ))}
      </div>

      {/* Jobs list */}
      {loading ? (
        <div
          style={{ padding: "40px", textAlign: "center", color: "var(--ink3)" }}
        >
          Loading your jobs...
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="empty">
          <div style={{ fontSize: 40, marginBottom: 12 }}>📭</div>
          <h3 style={{ fontSize: 18, marginBottom: 6 }}>No jobs found</h3>
          <p style={{ fontSize: 14, color: "var(--ink2)", marginBottom: 20 }}>
            {filter === "all"
              ? "You haven't posted any jobs yet."
              : `No jobs with status "${statusLabels[filter]}".`}
          </p>
          {filter === "all" && (
            <button
              className="btn btn-primary"
              onClick={() => navigate("/customer/post-job")}
            >
              Post your first job →
            </button>
          )}
        </div>
      ) : (
        filteredJobs.map((job) => (
          <div className="job-card" key={job._id}>
            {/* Top row */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: 10,
              }}
            >
              <div style={{ fontWeight: 600, fontSize: 15 }}>{job.title}</div>
              <span className={`badge ${statusColors[job.status]}`}>
                {statusLabels[job.status]}
              </span>
            </div>

            {/* Description */}
            <p
              style={{
                fontSize: 13,
                color: "var(--ink2)",
                marginBottom: 10,
                lineHeight: 1.5,
              }}
            >
              {job.description?.length > 100
                ? job.description.slice(0, 100) + "..."
                : job.description}
            </p>

            {/* Meta */}
            <div className="job-meta">
              <span className="job-meta-item">📍 {job.location}</span>
              <span className="job-meta-item">🔧 {job.serviceType}</span>
              {job.budget && (
                <span className="job-meta-item">💰 ₹{job.budget}</span>
              )}
              <span className="job-meta-item">
                🕐{" "}
                {new Date(job.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>

            {/* Action buttons */}
            <div
              style={{
                display: "flex",
                gap: 8,
                marginTop: 14,
                flexWrap: "wrap",
              }}
            >
              {job.status === "open" && (
                <span
                  style={{ fontSize: 13, color: "var(--ink3)", paddingTop: 4 }}
                >
                  ⏳ Waiting for contractor quotes...
                </span>
              )}

              {job.status === "quoted" && (
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => navigate(`/customer/quotes/${job._id}`)}
                >
                  View Quotes →
                </button>
              )}

              {(job.status === "accepted" || job.status === "in_progress") && (
                <button
                  className="btn btn-dark btn-sm"
                  onClick={() => navigate(`/customer/job/${job._id}`)}
                >
                  Track Progress
                </button>
              )}

              {job.status === "completed" && (
                <>
                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={() => navigate(`/customer/job/${job._id}`)}
                  >
                    View Details
                  </button>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => navigate(`/customer/review/${job._id}`)}
                  >
                    ⭐ Leave Review
                  </button>
                </>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyJobs;
