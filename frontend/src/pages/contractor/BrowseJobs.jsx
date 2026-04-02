import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { toast } from "react-toastify";

const BrowseJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [quote, setQuote] = useState({
    price: "",
    message: "",
    estimatedTime: "",
  });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get("/jobs/open");
        setJobs(data);
      } catch (error) {
        toast.error("Failed to load jobs");
      }
    };
    fetchJobs();
  }, []);

  const handleQuoteSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/quotes", { jobId: selectedJob, ...quote });
      toast.success("Quote submitted successfully!");
      setSelectedJob(null);
      setQuote({ price: "", message: "", estimatedTime: "" });
    } catch (error) {
      toast.error("Failed to submit quote");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Available Jobs 🔍</h2>
      {jobs.length === 0 ? (
        <p style={styles.empty}>No open jobs available right now.</p>
      ) : (
        jobs.map((job) => (
          <div key={job._id} style={styles.card}>
            <h3 style={styles.jobTitle}>{job.title}</h3>
            <p style={styles.desc}>{job.description}</p>
            <div style={styles.meta}>
              <span>📍 {job.location}</span>
              <span>🔧 {job.serviceType}</span>
              {job.budget && <span>💰 Budget: ₹{job.budget}</span>}
              <span>👤 {job.customer?.name}</span>
            </div>
            <button style={styles.btn} onClick={() => setSelectedJob(job._id)}>
              Submit Quote
            </button>

            {selectedJob === job._id && (
              <form onSubmit={handleQuoteSubmit} style={styles.quoteForm}>
                <input
                  style={styles.input}
                  type="number"
                  placeholder="Your Price (₹)"
                  value={quote.price}
                  onChange={(e) =>
                    setQuote({ ...quote, price: e.target.value })
                  }
                  required
                />
                <input
                  style={styles.input}
                  placeholder="Estimated Time (e.g. 2 hours)"
                  value={quote.estimatedTime}
                  onChange={(e) =>
                    setQuote({ ...quote, estimatedTime: e.target.value })
                  }
                  required
                />
                <textarea
                  style={styles.textarea}
                  placeholder="Your message to the customer..."
                  value={quote.message}
                  onChange={(e) =>
                    setQuote({ ...quote, message: e.target.value })
                  }
                  required
                />
                <div style={{ display: "flex", gap: "10px" }}>
                  <button style={styles.submitBtn} type="submit">
                    Send Quote
                  </button>
                  <button
                    style={styles.cancelBtn}
                    type="button"
                    onClick={() => setSelectedJob(null)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
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
  empty: { color: "#888", textAlign: "center", padding: "40px" },
  card: {
    backgroundColor: "white",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
    marginBottom: "20px",
  },
  jobTitle: { color: "#1a1a2e", marginBottom: "8px" },
  desc: { color: "#666", fontSize: "14px", marginBottom: "15px" },
  meta: {
    display: "flex",
    gap: "15px",
    fontSize: "13px",
    color: "#888",
    flexWrap: "wrap",
    marginBottom: "15px",
  },
  btn: {
    padding: "10px 20px",
    backgroundColor: "#e94560",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  quoteForm: {
    marginTop: "20px",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
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
  textarea: {
    width: "100%",
    padding: "10px",
    marginBottom: "12px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    boxSizing: "border-box",
    fontSize: "14px",
    height: "80px",
  },
  submitBtn: {
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

export default BrowseJobs;
