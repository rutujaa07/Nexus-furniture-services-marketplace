// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "../../api/axios";
// import { toast } from "react-toastify";

// const ViewQuotes = () => {
//   const { jobId } = useParams();
//   const [quotes, setQuotes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchQuotes = async () => {
//       try {
//         const { data } = await axios.get(`/quotes/${jobId}`);
//         setQuotes(data);
//         setLoading(false);
//       } catch (error) {
//         toast.error("Failed to load quotes");
//         setLoading(false);
//       }
//     };
//     fetchQuotes();
//   }, [jobId]);

//   const handleAccept = async (quoteId) => {
//     try {
//       await axios.put(`/quotes/${quoteId}/accept`);
//       toast.success("Contractor accepted! 🎉");
//       navigate("/customer/my-jobs");
//     } catch (error) {
//       toast.error("Failed to accept quote");
//     }
//   };

//   if (loading) return <div style={styles.loading}>Loading quotes...</div>;

//   return (
//     <div style={styles.container}>
//       <button
//         style={styles.backBtn}
//         onClick={() => navigate("/customer/my-jobs")}
//       >
//         ← Back to My Jobs
//       </button>
//       <h2 style={styles.title}>Quotes Received 📨</h2>
//       <p style={styles.sub}>Review all quotes and select the best contractor</p>

//       {quotes.length === 0 ? (
//         <div style={styles.empty}>
//           <p style={{ fontSize: "40px" }}>⏳</p>
//           <p>No quotes yet. Check back soon!</p>
//         </div>
//       ) : (
//         quotes.map((quote) => (
//           <div key={quote._id} style={styles.card}>
//             <div style={styles.contractorRow}>
//               <div style={styles.avatar}>
//                 {quote.contractor?.name?.charAt(0).toUpperCase()}
//               </div>
//               <div>
//                 <h3 style={styles.contractorName}>
//                   {quote.contractor?.businessName || quote.contractor?.name}
//                 </h3>
//                 <p style={styles.location}>
//                   📍 {quote.contractor?.location || "Location not set"}
//                 </p>
//               </div>
//               <div style={styles.ratingBadge}>
//                 ⭐{" "}
//                 {quote.contractor?.rating > 0 ? quote.contractor.rating : "New"}
//               </div>
//             </div>

//             <div style={styles.detailsRow}>
//               <div style={styles.detailBox}>
//                 <p style={styles.detailLabel}>Price</p>
//                 <p style={styles.detailValue}>₹{quote.price}</p>
//               </div>
//               <div style={styles.detailBox}>
//                 <p style={styles.detailLabel}>Est. Time</p>
//                 <p style={styles.detailValue}>{quote.estimatedTime}</p>
//               </div>
//               <div style={styles.detailBox}>
//                 <p style={styles.detailLabel}>Status</p>
//                 <p
//                   style={{
//                     ...styles.detailValue,
//                     color:
//                       quote.status === "accepted"
//                         ? "#2ecc71"
//                         : quote.status === "rejected"
//                         ? "#e74c3c"
//                         : "#f39c12",
//                   }}
//                 >
//                   {quote.status.toUpperCase()}
//                 </p>
//               </div>
//             </div>

//             <div style={styles.messageBox}>
//               <p style={styles.messageLabel}>Message from Contractor:</p>
//               <p style={styles.messageText}>"{quote.message}"</p>
//             </div>

//             {quote.status === "pending" && (
//               <button
//                 style={styles.acceptBtn}
//                 onClick={() => handleAccept(quote._id)}
//               >
//                 ✅ Accept This Contractor
//               </button>
//             )}
//             {quote.status === "accepted" && (
//               <div style={styles.acceptedBadge}>
//                 ✅ You accepted this contractor
//               </div>
//             )}
//           </div>
//         ))
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
//   title: { fontSize: "26px", color: "#1a1a2e", marginBottom: "5px" },
//   sub: { color: "#888", fontSize: "14px", marginBottom: "30px" },
//   empty: {
//     textAlign: "center",
//     padding: "60px",
//     color: "#888",
//     backgroundColor: "white",
//     borderRadius: "12px",
//   },
//   card: {
//     backgroundColor: "white",
//     padding: "25px",
//     borderRadius: "12px",
//     boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
//     marginBottom: "20px",
//   },
//   contractorRow: {
//     display: "flex",
//     alignItems: "center",
//     gap: "15px",
//     marginBottom: "20px",
//   },
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
//   contractorName: { margin: 0, color: "#1a1a2e", fontSize: "18px" },
//   location: { margin: "4px 0 0", color: "#888", fontSize: "13px" },
//   ratingBadge: {
//     marginLeft: "auto",
//     backgroundColor: "#fff8e1",
//     padding: "6px 14px",
//     borderRadius: "20px",
//     fontSize: "14px",
//     fontWeight: "bold",
//     color: "#f39c12",
//   },
//   detailsRow: { display: "flex", gap: "15px", marginBottom: "20px" },
//   detailBox: {
//     flex: 1,
//     backgroundColor: "#f8f9fa",
//     padding: "15px",
//     borderRadius: "8px",
//     textAlign: "center",
//   },
//   detailLabel: {
//     margin: "0 0 5px",
//     fontSize: "12px",
//     color: "#888",
//     textTransform: "uppercase",
//   },
//   detailValue: {
//     margin: 0,
//     fontSize: "18px",
//     fontWeight: "bold",
//     color: "#1a1a2e",
//   },
//   messageBox: {
//     backgroundColor: "#f8f9fa",
//     padding: "15px",
//     borderRadius: "8px",
//     marginBottom: "20px",
//   },
//   messageLabel: {
//     margin: "0 0 8px",
//     fontSize: "12px",
//     color: "#888",
//     textTransform: "uppercase",
//     fontWeight: "bold",
//   },
//   messageText: {
//     margin: 0,
//     color: "#444",
//     fontSize: "15px",
//     fontStyle: "italic",
//   },
//   acceptBtn: {
//     width: "100%",
//     padding: "14px",
//     backgroundColor: "#2ecc71",
//     color: "white",
//     border: "none",
//     borderRadius: "8px",
//     fontSize: "16px",
//     cursor: "pointer",
//     fontWeight: "bold",
//   },
//   acceptedBadge: {
//     width: "100%",
//     padding: "14px",
//     backgroundColor: "#d5f5e3",
//     color: "#2ecc71",
//     borderRadius: "8px",
//     fontSize: "15px",
//     fontWeight: "bold",
//     textAlign: "center",
//     boxSizing: "border-box",
//   },
// };

// export default ViewQuotes;
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { toast } from "react-toastify";

const ViewQuotes = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [accepting, setAccepting] = useState(null);
  const [accepted, setAccepted] = useState(null);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const { data } = await axios.get(`/quotes/${jobId}`);
        setQuotes(data);
        const a = data.find((q) => q.status === "accepted");
        if (a) setAccepted(a._id);
      } catch (error) {
        toast.error("Failed to load quotes");
      } finally {
        setLoading(false);
      }
    };
    fetchQuotes();
  }, [jobId]);

  const handleAccept = async (quoteId) => {
    setAccepting(quoteId);
    try {
      await axios.put(`/quotes/${quoteId}/accept`);
      setAccepted(quoteId);
      toast.success("Contractor accepted! 🎉");
    } catch (error) {
      toast.error("Failed to accept quote");
    } finally {
      setAccepting(null);
    }
  };

  if (loading)
    return (
      <div style={{ padding: 40, textAlign: "center", color: "var(--ink3)" }}>
        Loading quotes...
      </div>
    );

  return (
    <div className="page">
      <button className="back" onClick={() => navigate("/customer/my-jobs")}>
        ← My Jobs
      </button>

      <h1 className="page-title">Quotes received</h1>
      <p className="page-sub">
        Review all contractor quotes and select the best one for your job.
      </p>

      {quotes.length === 0 ? (
        <div className="empty">
          <div style={{ fontSize: 40, marginBottom: 12 }}>⏳</div>
          <h3 style={{ fontSize: 18, marginBottom: 6 }}>No quotes yet</h3>
          <p style={{ fontSize: 14, color: "var(--ink2)" }}>
            Contractors will start sending quotes soon. Check back later.
          </p>
        </div>
      ) : (
        quotes.map((quote) => (
          <div
            className={`quote-card${accepted === quote._id ? " accepted" : ""}`}
            key={quote._id}
          >
            {/* Contractor info */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                marginBottom: 16,
              }}
            >
              <div className="avatar">
                {quote.contractor?.name?.charAt(0).toUpperCase()}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 15 }}>
                  {quote.contractor?.businessName || quote.contractor?.name}
                </div>
                <div
                  style={{ fontSize: 13, color: "var(--ink2)", marginTop: 2 }}
                >
                  📍 {quote.contractor?.location || "Location not set"} · ⭐{" "}
                  {quote.contractor?.rating > 0
                    ? quote.contractor.rating
                    : "New"}
                </div>
              </div>
              {accepted === quote._id && (
                <span className="badge badge-accepted">✓ Accepted</span>
              )}
              {quote.status === "rejected" && (
                <span className="badge badge-rejected">Rejected</span>
              )}
            </div>

            {/* Price boxes */}
            <div className="price-boxes">
              <div className="price-box">
                <div className="price-box-label">Price</div>
                <div className="price-box-value">₹{quote.price}</div>
              </div>
              <div className="price-box">
                <div className="price-box-label">Est. Time</div>
                <div
                  className="price-box-value"
                  style={{ fontSize: 16, paddingTop: 4 }}
                >
                  {quote.estimatedTime}
                </div>
              </div>
              <div className="price-box">
                <div className="price-box-label">Rating</div>
                <div className="price-box-value">
                  ⭐{" "}
                  {quote.contractor?.rating > 0
                    ? quote.contractor.rating
                    : "New"}
                </div>
              </div>
            </div>

            {/* Message */}
            <div
              style={{
                background: "var(--bg)",
                borderRadius: 8,
                padding: "14px 16px",
                margin: "14px 0",
              }}
            >
              <div className="section-label" style={{ marginBottom: 6 }}>
                Message from contractor
              </div>
              <p
                style={{
                  fontSize: 14,
                  color: "var(--ink2)",
                  fontStyle: "italic",
                  lineHeight: 1.6,
                }}
              >
                "{quote.message}"
              </p>
            </div>

            {/* Action */}
            {!accepted && quote.status === "pending" && (
              <button
                className="btn btn-success"
                style={{ width: "100%", justifyContent: "center" }}
                onClick={() => handleAccept(quote._id)}
                disabled={accepting === quote._id}
              >
                {accepting === quote._id
                  ? "Accepting..."
                  : "✓ Accept this contractor"}
              </button>
            )}

            {accepted === quote._id && (
              <button
                className="btn btn-ghost"
                style={{ width: "100%", justifyContent: "center" }}
                onClick={() => navigate(`/customer/job/${jobId}`)}
              >
                View job details →
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ViewQuotes;
