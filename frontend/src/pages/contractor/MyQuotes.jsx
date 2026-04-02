import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { toast } from "react-toastify";

const statusColors = {
  pending: "#f39c12",
  accepted: "#2ecc71",
  rejected: "#e74c3c",
};

const MyQuotes = () => {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const { data } = await axios.get("/quotes/myquotes");
        setQuotes(data);
      } catch (error) {
        toast.error("Failed to load quotes");
      }
    };
    fetchQuotes();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>My Quotes 📝</h2>
      {quotes.length === 0 ? (
        <p style={styles.empty}>You haven't submitted any quotes yet.</p>
      ) : (
        quotes.map((quote) => (
          <div key={quote._id} style={styles.card}>
            <div style={styles.cardHeader}>
              <h3 style={styles.jobTitle}>{quote.job?.title || "Job"}</h3>
              <span
                style={{
                  ...styles.badge,
                  backgroundColor: statusColors[quote.status],
                }}
              >
                {quote.status.toUpperCase()}
              </span>
            </div>
            <p style={styles.message}>{quote.message}</p>
            <div style={styles.meta}>
              <span>💰 ₹{quote.price}</span>
              <span>⏱️ {quote.estimatedTime}</span>
            </div>
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
  message: { color: "#666", fontSize: "14px", marginBottom: "15px" },
  meta: { display: "flex", gap: "20px", fontSize: "14px", color: "#888" },
};

export default MyQuotes;
