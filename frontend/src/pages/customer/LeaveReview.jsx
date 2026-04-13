import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { toast } from "react-toastify";

const LeaveReview = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const ratingLabels = [
    "",
    "Poor",
    "Below average",
    "Average",
    "Good",
    "Excellent!",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Please select a star rating");
      return;
    }
    setLoading(true);
    try {
      await axios.post("/reviews", { jobId, rating, comment });
      setSubmitted(true);
      toast.success("Review submitted! Thank you.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="page-narrow">
        <div style={{ textAlign: "center", padding: "60px 0" }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>⭐</div>
          <h2 style={{ fontSize: 26, marginBottom: 8 }}>Review submitted!</h2>
          <p style={{ color: "var(--ink2)", marginBottom: 28, fontSize: 15 }}>
            Thank you for helping the Nexus community.
          </p>
          <button
            className="btn btn-dark"
            onClick={() => navigate("/customer/my-jobs")}
          >
            Back to My Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-narrow">
      <button className="back" onClick={() => navigate("/customer/my-jobs")}>
        ← My Jobs
      </button>

      <h1 className="page-title">Leave a review</h1>
      <p className="page-sub">
        Your feedback helps others find great contractors on Nexus.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="card">
          {/* Star Rating */}
          <div className="section-label">Overall rating</div>
          <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
            {[1, 2, 3, 4, 5].map((s) => (
              <span
                key={s}
                onClick={() => setRating(s)}
                onMouseEnter={() => setHover(s)}
                onMouseLeave={() => setHover(0)}
                style={{
                  fontSize: 40,
                  cursor: "pointer",
                  color: s <= (hover || rating) ? "#F59E0B" : "var(--border)",
                  transition: "color 0.1s",
                  userSelect: "none",
                }}
              >
                ★
              </span>
            ))}
          </div>
          {(hover || rating) > 0 && (
            <p
              style={{
                fontSize: 13,
                color: "var(--ink2)",
                marginBottom: 20,
                fontStyle: "italic",
              }}
            >
              {ratingLabels[hover || rating]}
            </p>
          )}

          <div className="divider" />

          {/* Aspect Ratings */}
          <div className="section-label">Rate specific aspects</div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
              marginBottom: 20,
            }}
          >
            {[
              "Quality of work",
              "Punctuality",
              "Communication",
              "Value for money",
            ].map((aspect) => (
              <div
                key={aspect}
                style={{
                  background: "var(--bg)",
                  borderRadius: 8,
                  padding: "12px 14px",
                  border: "1px solid var(--border)",
                }}
              >
                <div
                  style={{
                    fontSize: 12,
                    color: "var(--ink2)",
                    marginBottom: 6,
                  }}
                >
                  {aspect}
                </div>
                <div style={{ display: "flex", gap: 3 }}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span
                      key={s}
                      style={{
                        fontSize: 16,
                        color: "#F59E0B",
                        cursor: "pointer",
                      }}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Comment */}
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Write a review</label>
            <textarea
              className="form-textarea"
              placeholder="Share your experience — what went well, what could be improved..."
              style={{ minHeight: 110 }}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
        </div>

        <button
          className="btn btn-primary btn-full"
          type="submit"
          style={{ marginTop: 16 }}
          disabled={loading || rating === 0}
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>

        {rating === 0 && (
          <p
            style={{
              fontSize: 12,
              color: "var(--ink3)",
              textAlign: "center",
              marginTop: 8,
            }}
          >
            Please select a star rating to continue
          </p>
        )}
      </form>
    </div>
  );
};

export default LeaveReview;
