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
// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "../../api/axios";
// import { toast } from "react-toastify";

// const Register = () => {
//   const [role, setRole] = useState("customer");
//   const [loading, setLoading] = useState(false);
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     phone: "",
//     businessName: "",
//     location: "",
//   });
//   const navigate = useNavigate();

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       await axios.post("/auth/register", { ...form, role });
//       toast.success("Account created! Please login.");
//       navigate("/login");
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Registration failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="page-narrow">
//       <div className="auth-card">
//         {/* Title */}
//         <h1 style={{ fontSize: 28, marginBottom: 6 }}>Create account</h1>
//         <p style={{ fontSize: 14, color: "var(--ink2)", marginBottom: 24 }}>
//           Join Nexus today — it's free
//         </p>

//         {/* Role Tabs */}
//         <div className="tabs">
//           <button
//             className={`tab${role === "customer" ? " active" : ""}`}
//             onClick={() => setRole("customer")}
//             type="button"
//           >
//             I need a service
//           </button>
//           <button
//             className={`tab${role === "contractor" ? " active" : ""}`}
//             onClick={() => setRole("contractor")}
//             type="button"
//           >
//             I'm a contractor
//           </button>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit}>
//           {/* Name + Phone */}
//           <div className="form-row">
//             <div className="form-group">
//               <label className="form-label">Full name</label>
//               <input
//                 className="form-input"
//                 name="name"
//                 placeholder="Rahul Sharma"
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label className="form-label">Phone number</label>
//               <input
//                 className="form-input"
//                 name="phone"
//                 placeholder="+91 98765 43210"
//                 onChange={handleChange}
//               />
//             </div>
//           </div>

//           {/* Email */}
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

//           {/* Password */}
//           <div className="form-group">
//             <label className="form-label">Password</label>
//             <input
//               className="form-input"
//               type="password"
//               name="password"
//               placeholder="Minimum 6 characters"
//               onChange={handleChange}
//               required
//             />
//           </div>

//           {/* Contractor only fields */}
//           {role === "contractor" && (
//             <>
//               <div
//                 style={{
//                   height: 1,
//                   background: "var(--border)",
//                   margin: "4px 0 20px",
//                 }}
//               />
//               <div className="section-label">Business details</div>

//               <div className="form-group">
//                 <label className="form-label">Business name</label>
//                 <input
//                   className="form-input"
//                   name="businessName"
//                   placeholder="Sharma Furniture Works"
//                   onChange={handleChange}
//                 />
//               </div>

//               <div className="form-group">
//                 <label className="form-label">City / Location</label>
//                 <input
//                   className="form-input"
//                   name="location"
//                   placeholder="Mumbai"
//                   onChange={handleChange}
//                 />
//               </div>
//             </>
//           )}

//           {/* Info box for contractor */}
//           {role === "contractor" && (
//             <div
//               style={{
//                 background: "#FFFBEB",
//                 border: "1px solid #FDE68A",
//                 borderRadius: 8,
//                 padding: "12px 14px",
//                 fontSize: 13,
//                 color: "#92400E",
//                 marginBottom: 20,
//               }}
//             >
//               ⚠️ Your account will be reviewed and approved by admin before you
//               can start taking jobs.
//             </div>
//           )}

//           <button
//             className="btn btn-primary btn-full"
//             type="submit"
//             disabled={loading}
//           >
//             {loading ? "Creating account..." : "Create account →"}
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

//         {/* Login link */}
//         <p style={{ textAlign: "center", fontSize: 14, color: "var(--ink2)" }}>
//           Already have an account?{" "}
//           <Link
//             to="/login"
//             style={{
//               color: "var(--accent)",
//               fontWeight: 500,
//               textDecoration: "none",
//             }}
//           >
//             Sign in
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Register;
