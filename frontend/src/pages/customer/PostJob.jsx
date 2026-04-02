import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { toast } from "react-toastify";

const PostJob = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    serviceType: "assembly",
    location: "",
    budget: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/jobs", form);
      toast.success("Job posted successfully!");
      navigate("/customer/my-jobs");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to post job");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2 style={styles.title}>Post a Furniture Job 📋</h2>
        <p style={styles.sub}>
          Describe what you need and contractors will send you quotes
        </p>
        <form onSubmit={handleSubmit}>
          <label style={styles.label}>Job Title</label>
          <input
            style={styles.input}
            name="title"
            placeholder="e.g. Assemble IKEA wardrobe"
            onChange={handleChange}
            required
          />

          <label style={styles.label}>Description</label>
          <textarea
            style={styles.textarea}
            name="description"
            placeholder="Describe your requirement in detail..."
            onChange={handleChange}
            required
          />

          <label style={styles.label}>Service Type</label>
          <select
            style={styles.input}
            name="serviceType"
            onChange={handleChange}
          >
            <option value="assembly">Assembly</option>
            <option value="delivery">Delivery</option>
            <option value="repair">Repair</option>
            <option value="custom">Custom</option>
          </select>

          <label style={styles.label}>Location</label>
          <input
            style={styles.input}
            name="location"
            placeholder="Your city or area"
            onChange={handleChange}
            required
          />

          <label style={styles.label}>Budget (Optional)</label>
          <input
            style={styles.input}
            type="number"
            name="budget"
            placeholder="Enter your budget in ₹"
            onChange={handleChange}
          />

          <button style={styles.btn} type="submit">
            Post Job
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    padding: "40px",
    backgroundColor: "#f0f2f5",
    minHeight: "100vh",
  },
  box: {
    backgroundColor: "white",
    padding: "40px",
    borderRadius: "12px",
    width: "500px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  },
  title: { color: "#1a1a2e", marginBottom: "5px" },
  sub: { color: "#888", fontSize: "14px", marginBottom: "25px" },
  label: {
    display: "block",
    marginBottom: "6px",
    fontWeight: "bold",
    fontSize: "14px",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "20px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    boxSizing: "border-box",
    fontSize: "14px",
  },
  textarea: {
    width: "100%",
    padding: "12px",
    marginBottom: "20px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    boxSizing: "border-box",
    fontSize: "14px",
    height: "100px",
    resize: "vertical",
  },
  btn: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#e94560",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default PostJob;
