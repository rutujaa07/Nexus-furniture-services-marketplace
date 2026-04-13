// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
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

// const JobDetails = () => {
//   const { jobId } = useParams();
//   const [job, setJob] = useState(null);
//   const [review, setReview] = useState({ rating: 5, comment: "" });
//   const [reviewSubmitted, setReviewSubmitted] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchJob = async () => {
//       try {
//         const { data } = await axios.get(`/jobs/${jobId}`);
//         setJob(data);
//       } catch (error) {
//         toast.error("Failed to load job details");
//       }
//     };
//     fetchJob();
//   }, [jobId]);

//   const handleReviewSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("/reviews", {
//         jobId: job._id,
//         contractorId: job.acceptedContractor._id,
//         rating: review.rating,
//         comment: review.comment,
//       });
//       toast.success("Review submitted! ⭐");
//       setReviewSubmitted(true);
//     } catch (error) {
//       toast.error("Failed to submit review");
//     }
//   };

//   if (!job) return <div style={styles.loading}>Loading job details...</div>;

//   return (
//     <div style={styles.container}>
//       <button
//         style={styles.backBtn}
//         onClick={() => navigate("/customer/my-jobs")}
//       >
//         ← Back to My Jobs
//       </button>

//       {/* Job Info */}
//       <div style={styles.card}>
//         <div style={styles.cardHeader}>
//           <h2 style={styles.title}>{job.title}</h2>
//           <span
//             style={{
//               ...styles.badge,
//               backgroundColor: statusColors[job.status],
//             }}
//           >
//             {job.status.replace("_", " ").toUpperCase()}
//           </span>
//         </div>
//         <p style={styles.desc}>{job.description}</p>
//         <div style={styles.meta}>
//           <span>📍 {job.location}</span>
//           <span>🔧 {job.serviceType}</span>
//           {job.budget && <span>💰 ₹{job.budget}</span>}
//           <span>📅 {new Date(job.createdAt).toLocaleDateString()}</span>
//         </div>
//       </div>

//       {/* Status Timeline */}
//       <div style={styles.card}>
//         <h3 style={styles.sectionTitle}>Job Progress</h3>
//         <div style={styles.timeline}>
//           {["open", "quoted", "accepted", "in_progress", "completed"].map(
//             (step, i) => (
//               <div key={step} style={styles.timelineStep}>
//                 <div
//                   style={{
//                     ...styles.timelineDot,
//                     backgroundColor:
//                       [
//                         "open",
//                         "quoted",
//                         "accepted",
//                         "in_progress",
//                         "completed",
//                       ].indexOf(job.status) >= i
//                         ? "#2ecc71"
//                         : "#ddd",
//                   }}
//                 />
//                 <p style={styles.timelineLabel}>
//                   {step.replace("_", " ").toUpperCase()}
//                 </p>
//               </div>
//             )
//           )}
//         </div>
//       </div>

//       {/* Accepted Contractor */}
//       {job.acceptedContractor && (
//         <div style={styles.card}>
//           <h3 style={styles.sectionTitle}>Your Contractor</h3>
//           <div style={styles.contractorRow}>
//             <div style={styles.avatar}>
//               {job.acceptedContractor.name?.charAt(0).toUpperCase()}
//             </div>
//             <div>
//               <h4 style={styles.contractorName}>
//                 {job.acceptedContractor.businessName ||
//                   job.acceptedContractor.name}
//               </h4>
//               <p style={styles.contractorMeta}>
//                 📍 {job.acceptedContractor.location || "Not set"}
//               </p>
//               <p style={styles.contractorMeta}>
//                 ⭐{" "}
//                 {job.acceptedContractor.rating > 0
//                   ? job.acceptedContractor.rating
//                   : "New"}
//               </p>
//             </div>
//             <a
//               href={`tel:${job.acceptedContractor.phone}`}
//               style={styles.callBtn}
//             >
//               📞 Call Contractor
//             </a>
//           </div>
//           {job.assignedWorker && (
//             <div style={styles.workerBox}>
//               <p style={styles.workerLabel}>Assigned Worker:</p>
//               <p style={styles.workerName}>👷 {job.assignedWorker}</p>
//             </div>
//           )}
//         </div>
//       )}

//       {/* Leave Review */}
//       {job.status === "completed" && !reviewSubmitted && (
//         <div style={styles.card}>
//           <h3 style={styles.sectionTitle}>Leave a Review ⭐</h3>
//           <form onSubmit={handleReviewSubmit}>
//             <label style={styles.label}>Rating</label>
//             <select
//               style={styles.input}
//               value={review.rating}
//               onChange={(e) => setReview({ ...review, rating: e.target.value })}
//             >
//               <option value={5}>⭐⭐⭐⭐⭐ Excellent</option>
//               <option value={4}>⭐⭐⭐⭐ Good</option>
//               <option value={3}>⭐⭐⭐ Average</option>
//               <option value={2}>⭐⭐ Poor</option>
//               <option value={1}>⭐ Terrible</option>
//             </select>
//             <label style={styles.label}>Comment</label>
//             <textarea
//               style={styles.textarea}
//               placeholder="Share your experience..."
//               value={review.comment}
//               onChange={(e) =>
//                 setReview({ ...review, comment: e.target.value })
//               }
//             />
//             <button style={styles.reviewBtn} type="submit">
//               Submit Review
//             </button>
//           </form>
//         </div>
//       )}

//       {reviewSubmitted && (
//         <div style={styles.reviewDone}>✅ Thank you for your review!</div>
//       )}
//     </div>
//   );
// };

// const styles = {
//   container: { padding: "40px", maxWidth: "800px", margin: "0 auto" },
//   loading: { padding: "40px", textAlign: "center", color: "#888" },
//   backBtn: {
//     background: "none",
//     border: "none",
//     color: "#e94560",
//     fontSize: "14px",
//     cursor: "pointer",
//     marginBottom: "20px",
//     padding: 0,
//   },
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
//     marginBottom: "15px",
//   },
//   title: { color: "#1a1a2e", margin: 0 },
//   badge: {
//     padding: "5px 12px",
//     borderRadius: "20px",
//     color: "white",
//     fontSize: "12px",
//     fontWeight: "bold",
//   },
//   desc: { color: "#666", fontSize: "14px", marginBottom: "15px" },
//   meta: {
//     display: "flex",
//     gap: "20px",
//     fontSize: "14px",
//     color: "#888",
//     flexWrap: "wrap",
//   },
//   sectionTitle: { color: "#1a1a2e", marginTop: 0, marginBottom: "20px" },
//   timeline: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "flex-start",
//   },
//   timelineStep: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     flex: 1,
//   },
//   timelineDot: {
//     width: "20px",
//     height: "20px",
//     borderRadius: "50%",
//     marginBottom: "8px",
//   },
//   timelineLabel: {
//     fontSize: "10px",
//     color: "#888",
//     textAlign: "center",
//     margin: 0,
//   },
//   contractorRow: { display: "flex", alignItems: "center", gap: "15px" },
//   avatar: {
//     width: "50px",
//     height: "50px",
//     borderRadius: "50%",
//     backgroundColor: "#e94560",
//     color: "white",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     fontSize: "22px",
//     fontWeight: "bold",
//     flexShrink: 0,
//   },
//   contractorName: { margin: "0 0 5px", color: "#1a1a2e" },
//   contractorMeta: { margin: "2px 0", fontSize: "13px", color: "#888" },
//   callBtn: {
//     marginLeft: "auto",
//     padding: "10px 20px",
//     backgroundColor: "#1a1a2e",
//     color: "white",
//     borderRadius: "8px",
//     textDecoration: "none",
//     fontSize: "14px",
//   },
//   workerBox: {
//     marginTop: "15px",
//     padding: "12px",
//     backgroundColor: "#f8f9fa",
//     borderRadius: "8px",
//   },
//   workerLabel: { margin: "0 0 5px", fontSize: "12px", color: "#888" },
//   workerName: { margin: 0, fontWeight: "bold", color: "#1a1a2e" },
//   label: {
//     display: "block",
//     marginBottom: "6px",
//     fontWeight: "bold",
//     fontSize: "14px",
//     color: "#333",
//   },
//   input: {
//     width: "100%",
//     padding: "12px",
//     marginBottom: "15px",
//     borderRadius: "6px",
//     border: "1px solid #ddd",
//     boxSizing: "border-box",
//     fontSize: "14px",
//   },
//   textarea: {
//     width: "100%",
//     padding: "12px",
//     marginBottom: "15px",
//     borderRadius: "6px",
//     border: "1px solid #ddd",
//     boxSizing: "border-box",
//     fontSize: "14px",
//     height: "100px",
//   },
//   reviewBtn: {
//     width: "100%",
//     padding: "12px",
//     backgroundColor: "#e94560",
//     color: "white",
//     border: "none",
//     borderRadius: "6px",
//     fontSize: "16px",
//     cursor: "pointer",
//   },
//   reviewDone: {
//     padding: "20px",
//     backgroundColor: "#d5f5e3",
//     color: "#2ecc71",
//     borderRadius: "12px",
//     textAlign: "center",
//     fontWeight: "bold",
//     fontSize: "16px",
//   },
// };

// export default JobDetails;
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { toast } from "react-toastify";

const steps = ["open", "quoted", "accepted", "in_progress", "completed"];
const stepLabels = ["Open", "Quoted", "Accepted", "In Progress", "Completed"];

const JobDetails = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const { data } = await axios.get(`/jobs/${jobId}`);
        setJob(data);
      } catch (error) {
        toast.error("Failed to load job details");
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [jobId]);

  if (loading)
    return (
      <div style={{ padding: 40, textAlign: "center", color: "var(--ink3)" }}>
        Loading job details...
      </div>
    );

  if (!job) return null;

  const currentStep = steps.indexOf(job.status);

  return (
    <div className="page">
      <button className="back" onClick={() => navigate("/customer/my-jobs")}>
        ← My Jobs
      </button>

      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 28,
        }}
      >
        <div>
          <h1 className="page-title">{job.title}</h1>
          <div className="job-meta" style={{ marginTop: 6 }}>
            <span className="job-meta-item">📍 {job.location}</span>
            <span className="job-meta-item">🔧 {job.serviceType}</span>
            {job.budget && (
              <span className="job-meta-item">💰 ₹{job.budget}</span>
            )}
          </div>
        </div>
        <span
          className={`badge badge-${
            job.status === "in_progress" ? "inprogress" : job.status
          }`}
        >
          {job.status === "in_progress"
            ? "In Progress"
            : job.status.charAt(0).toUpperCase() + job.status.slice(1)}
        </span>
      </div>

      {/* Progress Timeline */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="section-label" style={{ marginBottom: 20 }}>
          Job Progress
        </div>
        <div style={{ display: "flex", alignItems: "flex-start" }}>
          {stepLabels.map((label, i) => (
            <div
              key={label}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", width: "100%" }}
              >
                {i > 0 && (
                  <div
                    style={{
                      flex: 1,
                      height: 2,
                      background:
                        i <= currentStep ? "var(--success)" : "var(--border)",
                    }}
                  />
                )}
                <div
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    flexShrink: 0,
                    background:
                      i < currentStep
                        ? "var(--success)"
                        : i === currentStep
                        ? "var(--accent)"
                        : "var(--border)",
                  }}
                />
                {i < stepLabels.length - 1 && (
                  <div
                    style={{
                      flex: 1,
                      height: 2,
                      background:
                        i < currentStep ? "var(--success)" : "var(--border)",
                    }}
                  />
                )}
              </div>
              <div
                style={{
                  fontSize: 10,
                  marginTop: 8,
                  textAlign: "center",
                  fontWeight: 500,
                  color:
                    i < currentStep
                      ? "var(--success)"
                      : i === currentStep
                      ? "var(--accent)"
                      : "var(--ink3)",
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contractor Info */}
      {job.acceptedContractor && (
        <div className="card" style={{ marginBottom: 16 }}>
          <div className="section-label">Your Contractor</div>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div className="avatar">
              {job.acceptedContractor?.name?.charAt(0).toUpperCase()}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 15 }}>
                {job.acceptedContractor?.businessName ||
                  job.acceptedContractor?.name}
              </div>
              <div style={{ fontSize: 13, color: "var(--ink2)", marginTop: 2 }}>
                📍 {job.acceptedContractor?.location || "Not set"} · ⭐{" "}
                {job.acceptedContractor?.rating > 0
                  ? job.acceptedContractor.rating
                  : "New"}
              </div>
            </div>
            <a
              href={`tel:${job.acceptedContractor?.phone}`}
              style={{ textDecoration: "none" }}
            >
              <button className="btn btn-dark btn-sm">📞 Call</button>
            </a>
          </div>

          {job.assignedWorker && (
            <>
              <div className="divider" />
              <div style={{ fontSize: 14 }}>
                <span style={{ color: "var(--ink2)" }}>Assigned worker: </span>
                <span style={{ fontWeight: 600 }}>👷 {job.assignedWorker}</span>
              </div>
            </>
          )}
        </div>
      )}

      {/* Description */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="section-label">Job Description</div>
        <p style={{ fontSize: 14, color: "var(--ink2)", lineHeight: 1.7 }}>
          {job.description}
        </p>
      </div>

      {/* Review button */}
      {job.status === "completed" && (
        <button
          className="btn btn-primary btn-full"
          onClick={() => navigate(`/customer/review/${jobId}`)}
        >
          ⭐ Leave a Review
        </button>
      )}
    </div>
  );
};

export default JobDetails;
