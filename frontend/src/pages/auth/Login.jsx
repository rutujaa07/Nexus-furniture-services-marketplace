import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "../../api/axios";
import { toast } from "react-toastify";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/auth/login", form);
      login(data);
      toast.success("Login successful!");
      if (data.role === "customer") navigate("/customer/dashboard");
      else if (data.role === "contractor") navigate("/contractor/dashboard");
      else if (data.role === "admin") navigate("/admin/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2 style={styles.title}>Welcome Back 👋</h2>
        <p style={styles.sub}>Login to FurnishPro</p>
        <form onSubmit={handleSubmit}>
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
          <button style={styles.btn} type="submit">
            Login
          </button>
        </form>
        <p style={styles.text}>
          Don't have an account?{" "}
          <Link to="/register" style={styles.linkText}>
            Register
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
    height: "100vh",
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

export default Login;
// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import axios from "../../api/axios";
// import { toast } from "react-toastify";

// const Login = () => {
//   const [role, setRole] = useState("customer");
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [loading, setLoading] = useState(false);
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const { data } = await axios.post("/auth/login", form);
//       login(data);
//       toast.success("Welcome back!");
//       if (data.role === "customer") navigate("/customer/dashboard");
//       else if (data.role === "contractor") navigate("/contractor/dashboard");
//       else if (data.role === "admin") navigate("/admin/dashboard");
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="page-narrow">
//       <div className="auth-card">
//         {/* Title */}
//         <h1 style={{ fontSize: 28, marginBottom: 6 }}>Welcome back</h1>
//         <p style={{ fontSize: 14, color: "var(--ink2)", marginBottom: 24 }}>
//           Sign in to your Nexus account
//         </p>

//         {/* Role Tabs */}
//         <div className="tabs">
//           {["customer", "contractor", "admin"].map((r) => (
//             <button
//               key={r}
//               className={`tab${role === r ? " active" : ""}`}
//               onClick={() => setRole(r)}
//               type="button"
//             >
//               {r.charAt(0).toUpperCase() + r.slice(1)}
//             </button>
//           ))}
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label className="form-label">Email address</label>
//             <input
//               className="form-input"
//               type="email"
//               name="email"
//               placeholder="you@example.com"
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="form-group" style={{ marginBottom: 24 }}>
//             <label className="form-label">Password</label>
//             <input
//               className="form-input"
//               type="password"
//               name="password"
//               placeholder="••••••••"
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <button
//             className="btn btn-primary btn-full"
//             type="submit"
//             disabled={loading}
//           >
//             {loading ? "Signing in..." : "Sign in →"}
//           </button>
//         </form>

//         {/* Divider */}
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             gap: 12,
//             margin: "20px 0",
//             color: "var(--ink3)",
//             fontSize: 13,
//           }}
//         >
//           <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
//           or
//           <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
//         </div>

//         {/* Register link */}
//         <p style={{ textAlign: "center", fontSize: 14, color: "var(--ink2)" }}>
//           Don't have an account?{" "}
//           <Link
//             to="/register"
//             style={{
//               color: "var(--accent)",
//               fontWeight: 500,
//               textDecoration: "none",
//             }}
//           >
//             Register
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;
