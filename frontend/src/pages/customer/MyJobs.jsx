import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { toast } from "react-toastify";

const statusColors = {
  open: "#3498db",
  quoted: "#f39c12",
  accepted: "#9b59b6",
  in_progress: "#e67e22",
  completed: "#2ecc71",
  cancelled: "#e74c3c",
};

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get("/jobs/myjobs");
        setJobs(data);
      } catch (error) {
        toast.error("Failed to load jobs");
      }
    };
    fetchJobs();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>My Jobs 🗂️</h2>
      {jobs.length === 0 ? (
        <div style={styles.empty}>
          <p>You haven't posted any jobs yet.</p>
          <button
            style={styles.btn}
            onClick={() => navigate("/customer/post-job")}
          >
            Post Your First Job
          </button>
        </div>
      ) : (
        jobs.map((job) => (
          <div key={job._id} style={styles.card}>
            <div style={styles.cardHeader}>
              <h3 style={styles.jobTitle}>{job.title}</h3>
              <span
                style={{
                  ...styles.badge,
                  backgroundColor: statusColors[job.status],
                }}
              >
                {job.status.toUpperCase()}
              </span>
            </div>
            <p style={styles.desc}>{job.description}</p>
            <div style={styles.meta}>
              <span>📍 {job.location}</span>
              <span>🔧 {job.serviceType}</span>
              {job.budget && <span>💰 ₹{job.budget}</span>}
            </div>
            {job.status === "quoted" && (
              <button
                style={styles.viewBtn}
                onClick={() => navigate(`/customer/quotes/${job._id}`)}
              >
                View Quotes
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

const styles = {
  container: { padding: "40px", maxWidth: "800px", margin: "0 auto" },
  title: { fontSize: "26px", color: "#1a1a2e", marginBottom: "25px" },
  empty: { textAlign: "center", padding: "60px", color: "#888" },
  card: {
    backgroundColor: "white",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
    marginBottom: "20px",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },
  jobTitle: { color: "#1a1a2e", margin: 0 },
  badge: {
    padding: "5px 12px",
    borderRadius: "20px",
    color: "white",
    fontSize: "12px",
    fontWeight: "bold",
  },
  desc: { color: "#666", fontSize: "14px", marginBottom: "15px" },
  meta: { display: "flex", gap: "20px", fontSize: "14px", color: "#888" },
  btn: {
    marginTop: "20px",
    padding: "12px 25px",
    backgroundColor: "#e94560",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  viewBtn: {
    marginTop: "15px",
    padding: "10px 20px",
    backgroundColor: "#1a1a2e",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default MyJobs;
