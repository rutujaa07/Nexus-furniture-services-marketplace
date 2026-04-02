import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { toast } from "react-toastify";

const statusColors = {
  accepted: "#9b59b6",
  in_progress: "#e67e22",
  completed: "#2ecc71",
};

const ActiveJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [workerName, setWorkerName] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get("/jobs/contractorjobs");
        setJobs(data);
      } catch (error) {
        toast.error("Failed to load jobs");
      }
    };
    fetchJobs();
  }, []);

  const updateStatus = async (jobId, status) => {
    try {
      await axios.put(`/jobs/${jobId}/status`, { status });
      setJobs(jobs.map((j) => (j._id === jobId ? { ...j, status } : j)));
      toast.success(`Job marked as ${status.replace("_", " ")}!`);
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const assignWorker = async (jobId) => {
    try {
      await axios.put(`/jobs/${jobId}/status`, {
        status: "in_progress",
        assignedWorker: workerName,
      });
      setJobs(
        jobs.map((j) =>
          j._id === jobId
            ? { ...j, status: "in_progress", assignedWorker: workerName }
            : j
        )
      );
      toast.success("Worker assigned and job started! 🚀");
      setSelectedJob(null);
      setWorkerName("");
    } catch (error) {
      toast.error("Failed to assign worker");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Active Jobs 🔨</h2>

      {jobs.length === 0 ? (
        <div style={styles.empty}>
          <p style={{ fontSize: "40px" }}>📭</p>
          <p>No active jobs yet. Browse jobs and submit quotes!</p>
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
                {job.status.replace("_", " ").toUpperCase()}
              </span>
            </div>

            <p style={styles.desc}>{job.description}</p>

            <div style={styles.meta}>
              <span>📍 {job.location}</span>
              <span>🔧 {job.serviceType}</span>
              <span>👤 Customer: {job.customer?.name}</span>
              <span>📞 {job.customer?.phone}</span>
            </div>

            {job.assignedWorker && (
              <div style={styles.workerBox}>
                👷 Assigned Worker: <strong>{job.assignedWorker}</strong>
              </div>
            )}

            {/* Actions */}
            <div style={styles.actions}>
              {job.status === "accepted" && (
                <>
                  <button
                    style={styles.workerBtn}
                    onClick={() => setSelectedJob(job._id)}
                  >
                    👷 Assign Worker
                  </button>
                  <a href={`tel:${job.customer?.phone}`} style={styles.callBtn}>
                    📞 Call Customer
                  </a>
                </>
              )}
              {job.status === "in_progress" && (
                <button
                  style={styles.completeBtn}
                  onClick={() => updateStatus(job._id, "completed")}
                >
                  ✅ Mark as Completed
                </button>
              )}
            </div>

            {/* Assign Worker Form */}
            {selectedJob === job._id && (
              <div style={styles.workerForm}>
                <p style={styles.workerFormTitle}>Enter Worker Name</p>
                <input
                  style={styles.input}
                  placeholder="Worker's full name"
                  value={workerName}
                  onChange={(e) => setWorkerName(e.target.value)}
                />
                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    style={styles.assignBtn}
                    onClick={() => assignWorker(job._id)}
                  >
                    Assign & Start Job
                  </button>
                  <button
                    style={styles.cancelBtn}
                    onClick={() => setSelectedJob(null)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
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
  empty: {
    textAlign: "center",
    padding: "60px",
    color: "#888",
    backgroundColor: "white",
    borderRadius: "12px",
  },
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
    marginBottom: "12px",
  },
  jobTitle: { margin: 0, color: "#1a1a2e" },
  badge: {
    padding: "5px 12px",
    borderRadius: "20px",
    color: "white",
    fontSize: "12px",
    fontWeight: "bold",
  },
  desc: { color: "#666", fontSize: "14px", marginBottom: "15px" },
  meta: {
    display: "flex",
    gap: "15px",
    fontSize: "13px",
    color: "#888",
    flexWrap: "wrap",
    marginBottom: "15px",
  },
  workerBox: {
    padding: "10px",
    backgroundColor: "#eaf4ff",
    borderRadius: "6px",
    fontSize: "14px",
    marginBottom: "15px",
    color: "#2c3e50",
  },
  actions: { display: "flex", gap: "10px", flexWrap: "wrap" },
  workerBtn: {
    padding: "10px 20px",
    backgroundColor: "#9b59b6",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
  },
  callBtn: {
    padding: "10px 20px",
    backgroundColor: "#1a1a2e",
    color: "white",
    borderRadius: "6px",
    textDecoration: "none",
    fontSize: "14px",
  },
  completeBtn: {
    padding: "10px 20px",
    backgroundColor: "#2ecc71",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
  },
  workerForm: {
    marginTop: "15px",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
  },
  workerFormTitle: {
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#1a1a2e",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "12px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    boxSizing: "border-box",
    fontSize: "14px",
  },
  assignBtn: {
    padding: "10px 20px",
    backgroundColor: "#2ecc71",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  cancelBtn: {
    padding: "10px 20px",
    backgroundColor: "#ccc",
    color: "#333",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default ActiveJobs;
