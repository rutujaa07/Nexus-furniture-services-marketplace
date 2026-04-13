// import { useEffect, useState } from "react";
// import axios from "../../api/axios";
// import { toast } from "react-toastify";

// const BrowseJobs = () => {
//   const [jobs, setJobs] = useState([]);
//   const [selectedJob, setSelectedJob] = useState(null);
//   const [quote, setQuote] = useState({
//     price: "",
//     message: "",
//     estimatedTime: "",
//   });

//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const { data } = await axios.get("/jobs/open");
//         setJobs(data);
//       } catch (error) {
//         toast.error("Failed to load jobs");
//       }
//     };
//     fetchJobs();
//   }, []);

//   const handleQuoteSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("/quotes", { jobId: selectedJob, ...quote });
//       toast.success("Quote submitted successfully!");
//       setSelectedJob(null);
//       setQuote({ price: "", message: "", estimatedTime: "" });
//     } catch (error) {
//       toast.error("Failed to submit quote");
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.title}>Available Jobs 🔍</h2>
//       {jobs.length === 0 ? (
//         <p style={styles.empty}>No open jobs available right now.</p>
//       ) : (
//         jobs.map((job) => (
//           <div key={job._id} style={styles.card}>
//             <h3 style={styles.jobTitle}>{job.title}</h3>
//             <p style={styles.desc}>{job.description}</p>
//             <div style={styles.meta}>
//               <span>📍 {job.location}</span>
//               <span>🔧 {job.serviceType}</span>
//               {job.budget && <span>💰 Budget: ₹{job.budget}</span>}
//               <span>👤 {job.customer?.name}</span>
//             </div>
//             <button style={styles.btn} onClick={() => setSelectedJob(job._id)}>
//               Submit Quote
//             </button>

//             {selectedJob === job._id && (
//               <form onSubmit={handleQuoteSubmit} style={styles.quoteForm}>
//                 <input
//                   style={styles.input}
//                   type="number"
//                   placeholder="Your Price (₹)"
//                   value={quote.price}
//                   onChange={(e) =>
//                     setQuote({ ...quote, price: e.target.value })
//                   }
//                   required
//                 />
//                 <input
//                   style={styles.input}
//                   placeholder="Estimated Time (e.g. 2 hours)"
//                   value={quote.estimatedTime}
//                   onChange={(e) =>
//                     setQuote({ ...quote, estimatedTime: e.target.value })
//                   }
//                   required
//                 />
//                 <textarea
//                   style={styles.textarea}
//                   placeholder="Your message to the customer..."
//                   value={quote.message}
//                   onChange={(e) =>
//                     setQuote({ ...quote, message: e.target.value })
//                   }
//                   required
//                 />
//                 <div style={{ display: "flex", gap: "10px" }}>
//                   <button style={styles.submitBtn} type="submit">
//                     Send Quote
//                   </button>
//                   <button
//                     style={styles.cancelBtn}
//                     type="button"
//                     onClick={() => setSelectedJob(null)}
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </form>
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
//   empty: { color: "#888", textAlign: "center", padding: "40px" },
//   card: {
//     backgroundColor: "white",
//     padding: "25px",
//     borderRadius: "12px",
//     boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
//     marginBottom: "20px",
//   },
//   jobTitle: { color: "#1a1a2e", marginBottom: "8px" },
//   desc: { color: "#666", fontSize: "14px", marginBottom: "15px" },
//   meta: {
//     display: "flex",
//     gap: "15px",
//     fontSize: "13px",
//     color: "#888",
//     flexWrap: "wrap",
//     marginBottom: "15px",
//   },
//   btn: {
//     padding: "10px 20px",
//     backgroundColor: "#e94560",
//     color: "white",
//     border: "none",
//     borderRadius: "6px",
//     cursor: "pointer",
//   },
//   quoteForm: {
//     marginTop: "20px",
//     padding: "20px",
//     backgroundColor: "#f9f9f9",
//     borderRadius: "8px",
//   },
//   input: {
//     width: "100%",
//     padding: "10px",
//     marginBottom: "12px",
//     borderRadius: "6px",
//     border: "1px solid #ddd",
//     boxSizing: "border-box",
//     fontSize: "14px",
//   },
//   textarea: {
//     width: "100%",
//     padding: "10px",
//     marginBottom: "12px",
//     borderRadius: "6px",
//     border: "1px solid #ddd",
//     boxSizing: "border-box",
//     fontSize: "14px",
//     height: "80px",
//   },
//   submitBtn: {
//     padding: "10px 20px",
//     backgroundColor: "#2ecc71",
//     color: "white",
//     border: "none",
//     borderRadius: "6px",
//     cursor: "pointer",
//   },
//   cancelBtn: {
//     padding: "10px 20px",
//     backgroundColor: "#ccc",
//     color: "#333",
//     border: "none",
//     borderRadius: "6px",
//     cursor: "pointer",
//   },
// };

// export default BrowseJobs;
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { toast } from "react-toastify";

const BrowseJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);
  const [submitted, setSubmitted] = useState([]);
  const [quote, setQuote] = useState({
    price: "",
    estimatedTime: "",
    message: "",
  });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get("/jobs/open");
        setJobs(data);
      } catch (error) {
        toast.error("Failed to load jobs");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleSubmitQuote = async (jobId) => {
    if (!quote.price || !quote.estimatedTime || !quote.message) {
      toast.error("Please fill all quote fields");
      return;
    }
    try {
      await axios.post("/quotes", { jobId, ...quote });
      setSubmitted([...submitted, jobId]);
      setExpanded(null);
      setQuote({ price: "", estimatedTime: "", message: "" });
      toast.success("Quote submitted!");
    } catch (error) {
      toast.error("Failed to submit quote");
    }
  };

  if (loading)
    return (
      <div style={{ padding: 40, textAlign: "center", color: "var(--ink3)" }}>
        Loading available jobs...
      </div>
    );

  return (
    <div className="page">
      <h1 className="page-title">Browse Jobs</h1>
      <p className="page-sub">
        Open jobs in your area — submit a quote to get started.
      </p>

      {jobs.length === 0 ? (
        <div className="empty">
          <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
          <h3 style={{ fontSize: 18, marginBottom: 6 }}>
            No open jobs right now
          </h3>
          <p style={{ fontSize: 14, color: "var(--ink2)" }}>
            Check back soon — new jobs are posted regularly.
          </p>
        </div>
      ) : (
        jobs.map((job) => (
          <div className="job-card" key={job._id}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <div style={{ fontWeight: 600, fontSize: 15 }}>{job.title}</div>
              <span className="badge badge-open">Open</span>
            </div>

            <p
              style={{
                fontSize: 13,
                color: "var(--ink2)",
                margin: "8px 0",
                lineHeight: 1.5,
              }}
            >
              {job.description?.length > 120
                ? job.description.slice(0, 120) + "..."
                : job.description}
            </p>

            <div className="job-meta">
              <span className="job-meta-item">📍 {job.location}</span>
              <span className="job-meta-item">🔧 {job.serviceType}</span>
              {job.budget && (
                <span className="job-meta-item">💰 Budget ₹{job.budget}</span>
              )}
              <span className="job-meta-item">👤 {job.customer?.name}</span>
            </div>

            <div style={{ marginTop: 14 }}>
              {submitted.includes(job._id) ? (
                <span className="badge badge-accepted">✓ Quote submitted</span>
              ) : expanded === job._id ? (
                <div
                  style={{
                    background: "var(--bg)",
                    borderRadius: 8,
                    padding: 16,
                    marginTop: 8,
                  }}
                >
                  <div className="form-row">
                    <div className="form-group" style={{ marginBottom: 12 }}>
                      <label className="form-label">Your price (₹)</label>
                      <input
                        className="form-input"
                        type="number"
                        placeholder="1800"
                        value={quote.price}
                        onChange={(e) =>
                          setQuote({ ...quote, price: e.target.value })
                        }
                      />
                    </div>
                    <div className="form-group" style={{ marginBottom: 12 }}>
                      <label className="form-label">Estimated time</label>
                      <input
                        className="form-input"
                        placeholder="e.g. 2–3 hours"
                        value={quote.estimatedTime}
                        onChange={(e) =>
                          setQuote({ ...quote, estimatedTime: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="form-group" style={{ marginBottom: 12 }}>
                    <label className="form-label">
                      Your message to customer
                    </label>
                    <textarea
                      className="form-textarea"
                      style={{ minHeight: 80 }}
                      placeholder="Introduce yourself and explain why you're the best fit..."
                      value={quote.message}
                      onChange={(e) =>
                        setQuote({ ...quote, message: e.target.value })
                      }
                    />
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleSubmitQuote(job._id)}
                    >
                      Send Quote
                    </button>
                    <button
                      className="btn btn-ghost btn-sm"
                      onClick={() => setExpanded(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  className="btn btn-dark btn-sm"
                  onClick={() => setExpanded(job._id)}
                >
                  Submit Quote
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default BrowseJobs;
