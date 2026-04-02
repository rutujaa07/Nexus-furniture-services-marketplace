import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const [stats, setStats] = useState({ users: 0, jobs: 0, contractors: 0 });
  const [contractors, setContractors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/admin/contractors");
        setContractors(data);
      } catch (error) {
        toast.error("Failed to load data");
      }
    };
    fetchData();
  }, []);

  const approveContractor = async (id) => {
    try {
      await axios.put(`/admin/approve/${id}`);
      setContractors(
        contractors.map((c) => (c._id === id ? { ...c, isApproved: true } : c))
      );
      toast.success("Contractor approved! ✅");
    } catch (error) {
      toast.error("Failed to approve contractor");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Admin Dashboard ⚙️</h1>

      {/* Stats */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <p style={styles.statNumber}>{contractors.length}</p>
          <p style={styles.statLabel}>Total Contractors</p>
        </div>
        <div style={styles.statCard}>
          <p style={styles.statNumber}>
            {contractors.filter((c) => c.isApproved).length}
          </p>
          <p style={styles.statLabel}>Approved</p>
        </div>
        <div style={styles.statCard}>
          <p style={styles.statNumber}>
            {contractors.filter((c) => !c.isApproved).length}
          </p>
          <p style={styles.statLabel}>Pending Approval</p>
        </div>
      </div>

      {/* Contractors Table */}
      <div style={styles.card}>
        <h3 style={styles.sectionTitle}>Contractor Management</h3>
        {contractors.length === 0 ? (
          <p style={styles.empty}>No contractors registered yet.</p>
        ) : (
          contractors.map((contractor) => (
            <div key={contractor._id} style={styles.row}>
              <div style={styles.avatar}>
                {contractor.name?.charAt(0).toUpperCase()}
              </div>
              <div style={styles.info}>
                <p style={styles.name}>
                  {contractor.businessName || contractor.name}
                </p>
                <p style={styles.email}>{contractor.email}</p>
                <p style={styles.location}>
                  📍 {contractor.location || "Not set"}
                </p>
              </div>
              <div style={styles.actions}>
                {contractor.isApproved ? (
                  <span style={styles.approvedBadge}>✅ Approved</span>
                ) : (
                  <button
                    style={styles.approveBtn}
                    onClick={() => approveContractor(contractor._id)}
                  >
                    Approve
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const styles = {
  container: { padding: "40px", maxWidth: "1000px", margin: "0 auto" },
  title: { fontSize: "28px", color: "#1a1a2e", marginBottom: "30px" },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "20px",
    marginBottom: "30px",
  },
  statCard: {
    backgroundColor: "white",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
    textAlign: "center",
  },
  statNumber: {
    fontSize: "36px",
    fontWeight: "bold",
    color: "#e94560",
    margin: "0 0 5px",
  },
  statLabel: { color: "#888", fontSize: "14px", margin: 0 },
  card: {
    backgroundColor: "white",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
  },
  sectionTitle: { color: "#1a1a2e", marginTop: 0, marginBottom: "20px" },
  empty: { color: "#888", textAlign: "center", padding: "20px" },
  row: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    padding: "15px 0",
    borderBottom: "1px solid #f0f0f0",
  },
  avatar: {
    width: "45px",
    height: "45px",
    borderRadius: "50%",
    backgroundColor: "#1a1a2e",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    fontWeight: "bold",
    flexShrink: 0,
  },
  info: { flex: 1 },
  name: { margin: "0 0 3px", fontWeight: "bold", color: "#1a1a2e" },
  email: { margin: "0 0 3px", fontSize: "13px", color: "#888" },
  location: { margin: 0, fontSize: "13px", color: "#888" },
  actions: { flexShrink: 0 },
  approvedBadge: { color: "#2ecc71", fontWeight: "bold", fontSize: "14px" },
  approveBtn: {
    padding: "8px 18px",
    backgroundColor: "#e94560",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
  },
};

export default AdminDashboard;
