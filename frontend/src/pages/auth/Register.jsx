import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../../api/axios";
import { toast } from "react-toastify";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "customer",
    businessName: "",
    location: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/register", form);
      toast.success("Account created! Please login.");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2 style={styles.title}>Create Account</h2>
        <p style={styles.sub}>Join FurnishPro today</p>
        <form onSubmit={handleSubmit}>
          <input
            style={styles.input}
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            required
          />
          <input
            style={styles.input}
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            required
          />
          <input
            style={styles.input}
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <input
            style={styles.input}
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
          />
          <select style={styles.input} name="role" onChange={handleChange}>
            <option value="customer">I am a Customer</option>
            <option value="contractor">I am a Contractor</option>
          </select>
          {form.role === "contractor" && (
            <>
              <input
                style={styles.input}
                name="businessName"
                placeholder="Business Name"
                onChange={handleChange}
              />
              <input
                style={styles.input}
                name="location"
                placeholder="Your Location / City"
                onChange={handleChange}
              />
            </>
          )}
          <button style={styles.btn} type="submit">
            Create Account
          </button>
        </form>
        <p style={styles.text}>
          Already have an account?{" "}
          <Link to="/login" style={styles.linkText}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f0f2f5",
  },
  box: {
    backgroundColor: "white",
    padding: "40px",
    borderRadius: "12px",
    width: "400px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  },
  title: { textAlign: "center", color: "#1a1a2e", marginBottom: "5px" },
  sub: {
    textAlign: "center",
    color: "#888",
    marginBottom: "25px",
    fontSize: "14px",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    boxSizing: "border-box",
    fontSize: "14px",
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
  text: { textAlign: "center", marginTop: "15px", fontSize: "14px" },
  linkText: { color: "#e94560", textDecoration: "none", fontWeight: "bold" },
};

export default Register;
