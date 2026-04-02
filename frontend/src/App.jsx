import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import CustomerDashboard from "./pages/customer/CustomerDashboard";
import PostJob from "./pages/customer/PostJob";
import MyJobs from "./pages/customer/MyJobs";
import ViewQuotes from "./pages/customer/ViewQuotes";
import JobDetails from "./pages/customer/JobDetails";

import ContractorDashboard from "./pages/contractor/ContractorDashboard";
import BrowseJobs from "./pages/contractor/BrowseJobs";
import MyQuotes from "./pages/contractor/MyQuotes";
import ActiveJobs from "./pages/contractor/ActiveJobs";

import AdminDashboard from "./pages/admin/AdminDashboard";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Customer */}
          <Route
            path="/customer/dashboard"
            element={
              <PrivateRoute role="customer">
                <CustomerDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/customer/post-job"
            element={
              <PrivateRoute role="customer">
                <PostJob />
              </PrivateRoute>
            }
          />
          <Route
            path="/customer/my-jobs"
            element={
              <PrivateRoute role="customer">
                <MyJobs />
              </PrivateRoute>
            }
          />
          <Route
            path="/customer/quotes/:jobId"
            element={
              <PrivateRoute role="customer">
                <ViewQuotes />
              </PrivateRoute>
            }
          />
          <Route
            path="/customer/job/:jobId"
            element={
              <PrivateRoute role="customer">
                <JobDetails />
              </PrivateRoute>
            }
          />

          {/* Contractor */}
          <Route
            path="/contractor/dashboard"
            element={
              <PrivateRoute role="contractor">
                <ContractorDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/contractor/browse-jobs"
            element={
              <PrivateRoute role="contractor">
                <BrowseJobs />
              </PrivateRoute>
            }
          />
          <Route
            path="/contractor/my-quotes"
            element={
              <PrivateRoute role="contractor">
                <MyQuotes />
              </PrivateRoute>
            }
          />
          <Route
            path="/contractor/active-jobs"
            element={
              <PrivateRoute role="contractor">
                <ActiveJobs />
              </PrivateRoute>
            }
          />

          {/* Admin */}
          <Route
            path="/admin/dashboard"
            element={
              <PrivateRoute role="admin">
                <AdminDashboard />
              </PrivateRoute>
            }
          />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
