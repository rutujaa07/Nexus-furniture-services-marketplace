// import { useEffect, useState } from "react";
// import axios from "../../api/axios";
// import { toast } from "react-toastify";

// const statusColors = {
//   pending: "#f39c12",
//   accepted: "#2ecc71",
//   rejected: "#e74c3c",
// };

// const MyQuotes = () => {
//   const [quotes, setQuotes] = useState([]);

//   useEffect(() => {
//     const fetchQuotes = async () => {
//       try {
//         const { data } = await axios.get("/quotes/myquotes");
//         setQuotes(data);
//       } catch (error) {
//         toast.error("Failed to load quotes");
//       }
//     };
//     fetchQuotes();
//   }, []);

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.title}>My Quotes 📝</h2>
//       {quotes.length === 0 ? (
//         <p style={styles.empty}>You haven't submitted any quotes yet.</p>
//       ) : (
//         quotes.map((quote) => (
//           <div key={quote._id} style={styles.card}>
//             <div style={styles.cardHeader}>
//               <h3 style={styles.jobTitle}>{quote.job?.title || "Job"}</h3>
//               <span
//                 style={{
//                   ...styles.badge,
//                   backgroundColor: statusColors[quote.status],
//                 }}
//               >
//                 {quote.status.toUpperCase()}
//               </span>
//             </div>
//             <p style={styles.message}>{quote.message}</p>
//             <div style={styles.meta}>
//               <span>💰 ₹{quote.price}</span>
//               <span>⏱️ {quote.estimatedTime}</span>
//             </div>
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
//   message: { color: "#666", fontSize: "14px", marginBottom: "15px" },
//   meta: { display: "flex", gap: "20px", fontSize: "14px", color: "#888" },
// };

// export default MyQuotes;
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { toast } from "react-toastify";

const MyQuotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const { data } = await axios.get("/quotes/myquotes");
        setQuotes(data);
      } catch (error) {
        toast.error("Failed to load quotes");
      } finally {
        setLoading(false);
      }
    };
    fetchQuotes();
  }, []);

  if (loading)
    return (
      <div style={{ padding: 40, textAlign: "center", color: "var(--ink3)" }}>
        Loading your quotes...
      </div>
    );

  return (
    <div className="page">
      <h1 className="page-title">My Quotes</h1>
      <p className="page-sub">Track all your submitted quotations.</p>

      {quotes.length === 0 ? (
        <div className="empty">
          <div style={{ fontSize: 40, marginBottom: 12 }}>📝</div>
          <h3 style={{ fontSize: 18, marginBottom: 6 }}>No quotes yet</h3>
          <p style={{ fontSize: 14, color: "var(--ink2)" }}>
            Browse open jobs and submit your first quote.
          </p>
        </div>
      ) : (
        quotes.map((q) => (
          <div className="card" key={q._id} style={{ marginBottom: 12 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <div>
                <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 6 }}>
                  {q.job?.title || "Job"}
                </div>
                <div className="job-meta">
                  <span className="job-meta-item">💰 ₹{q.price}</span>
                  <span className="job-meta-item">⏱ {q.estimatedTime}</span>
                  {q.job?.location && (
                    <span className="job-meta-item">📍 {q.job.location}</span>
                  )}
                </div>
              </div>
              <span className={`badge badge-${q.status}`}>
                {q.status.charAt(0).toUpperCase() + q.status.slice(1)}
              </span>
            </div>

            <div
              style={{
                background: "var(--bg)",
                borderRadius: 8,
                padding: "10px 14px",
                marginTop: 12,
                fontSize: 13,
                color: "var(--ink2)",
                fontStyle: "italic",
              }}
            >
              "{q.message}"
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyQuotes;
