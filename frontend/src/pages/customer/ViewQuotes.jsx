import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { toast } from "react-toastify";

const ViewQuotes = () => {
  const { jobId } = useParams();
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const { data } = await axios.get(`/quotes/${jobId}`);
        setQuotes(data);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to load quotes");
        setLoading(false);
      }
    };
    fetchQuotes();
  }, [jobId]);

  const handleAccept = async (quoteId) => {
    try {
      await axios.put(`/quotes/${quoteId}/accept`);
      toast.success("Contractor accepted! 🎉");
      navigate("/customer/my-jobs");
    } catch (error) {
      toast.error("Failed to accept quote");
    }
  };

  if (loading) return <div style={styles.loading}>Loading quotes...</div>;

  return (
    <div style={styles.container}>
      <button
        style={styles.backBtn}
        onClick={() => navigate("/customer/my-jobs")}
      >
        ← Back to My Jobs
      </button>
      <h2 style={styles.title}>Quotes Received 📨</h2>
      <p style={styles.sub}>Review all quotes and select the best contractor</p>

      {quotes.length === 0 ? (
        <div style={styles.empty}>
          <p style={{ fontSize: "40px" }}>⏳</p>
          <p>No quotes yet. Check back soon!</p>
        </div>
      ) : (
        quotes.map((quote) => (
          <div key={quote._id} style={styles.card}>
            <div style={styles.contractorRow}>
              <div style={styles.avatar}>
                {quote.contractor?.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 style={styles.contractorName}>
                  {quote.contractor?.businessName || quote.contractor?.name}
                </h3>
                <p style={styles.location}>
                  📍 {quote.contractor?.location || "Location not set"}
                </p>
              </div>
              <div style={styles.ratingBadge}>
                ⭐{" "}
                {quote.contractor?.rating > 0 ? quote.contractor.rating : "New"}
              </div>
            </div>

            <div style={styles.detailsRow}>
              <div style={styles.detailBox}>
                <p style={styles.detailLabel}>Price</p>
                <p style={styles.detailValue}>₹{quote.price}</p>
              </div>
              <div style={styles.detailBox}>
                <p style={styles.detailLabel}>Est. Time</p>
                <p style={styles.detailValue}>{quote.estimatedTime}</p>
              </div>
              <div style={styles.detailBox}>
                <p style={styles.detailLabel}>Status</p>
                <p
                  style={{
                    ...styles.detailValue,
                    color:
                      quote.status === "accepted"
                        ? "#2ecc71"
                        : quote.status === "rejected"
                        ? "#e74c3c"
                        : "#f39c12",
                  }}
                >
                  {quote.status.toUpperCase()}
                </p>
              </div>
            </div>

            <div style={styles.messageBox}>
              <p style={styles.messageLabel}>Message from Contractor:</p>
              <p style={styles.messageText}>"{quote.message}"</p>
            </div>

            {quote.status === "pending" && (
              <button
                style={styles.acceptBtn}
                onClick={() => handleAccept(quote._id)}
              >
                ✅ Accept This Contractor
              </button>
            )}
            {quote.status === "accepted" && (
              <div style={styles.acceptedBadge}>
                ✅ You accepted this contractor
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
  loading: { padding: "40px", textAlign: "center", color: "#888" },
  backBtn: {
    background: "none",
    border: "none",
    color: "#e94560",
    fontSize: "14px",
    cursor: "pointer",
    marginBottom: "20px",
    padding: 0,
  },
  title: { fontSize: "26px", color: "#1a1a2e", marginBottom: "5px" },
  sub: { color: "#888", fontSize: "14px", marginBottom: "30px" },
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
  contractorRow: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginBottom: "20px",
  },
  avatar: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    backgroundColor: "#e94560",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "22px",
    fontWeight: "bold",
    flexShrink: 0,
  },
  contractorName: { margin: 0, color: "#1a1a2e", fontSize: "18px" },
  location: { margin: "4px 0 0", color: "#888", fontSize: "13px" },
  ratingBadge: {
    marginLeft: "auto",
    backgroundColor: "#fff8e1",
    padding: "6px 14px",
    borderRadius: "20px",
    fontSize: "14px",
    fontWeight: "bold",
    color: "#f39c12",
  },
  detailsRow: { display: "flex", gap: "15px", marginBottom: "20px" },
  detailBox: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: "15px",
    borderRadius: "8px",
    textAlign: "center",
  },
  detailLabel: {
    margin: "0 0 5px",
    fontSize: "12px",
    color: "#888",
    textTransform: "uppercase",
  },
  detailValue: {
    margin: 0,
    fontSize: "18px",
    fontWeight: "bold",
    color: "#1a1a2e",
  },
  messageBox: {
    backgroundColor: "#f8f9fa",
    padding: "15px",
    borderRadius: "8px",
    marginBottom: "20px",
  },
  messageLabel: {
    margin: "0 0 8px",
    fontSize: "12px",
    color: "#888",
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  messageText: {
    margin: 0,
    color: "#444",
    fontSize: "15px",
    fontStyle: "italic",
  },
  acceptBtn: {
    width: "100%",
    padding: "14px",
    backgroundColor: "#2ecc71",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  acceptedBadge: {
    width: "100%",
    padding: "14px",
    backgroundColor: "#d5f5e3",
    color: "#2ecc71",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: "bold",
    textAlign: "center",
    boxSizing: "border-box",
  },
};

export default ViewQuotes;
