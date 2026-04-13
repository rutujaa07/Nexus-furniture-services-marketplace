import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

const Landing = () => {
  const navigate = useNavigate();
  const [showcase, setShowcase] = useState([]);

  useEffect(() => {
    const fetchShowcase = async () => {
      try {
        const { data } = await axios.get("/upload/showcase");
        setShowcase(data);
      } catch (error) {
        // silently fail — no photos yet
      }
    };
    fetchShowcase();
  }, []);

  return (
    <>
      {/* HERO */}
      <div className="hero">
        <div className="hero-eyebrow">On-Demand Furniture Services</div>
        <h1 className="hero-title">
          Quality furniture
          <br />
          service, <em>on your terms.</em>
        </h1>
        <p className="hero-sub">
          Post a job. Get multiple quotes from verified contractors. Choose the
          best fit. It's that simple.
        </p>
        <div
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            marginBottom: 36,
          }}
        >
          <button
            className="btn btn-primary"
            onClick={() => navigate("/register")}
          >
            Post a Job →
          </button>
          <button
            className="btn btn-ghost"
            onClick={() => navigate("/register")}
          >
            Join as Contractor
          </button>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <span className="trust-pill">✓ Verified Contractors</span>
          <span className="trust-pill">✓ Competitive Quotes</span>
          <span className="trust-pill">✓ Rated & Reviewed</span>
        </div>
      </div>

      {/* PORTFOLIO SHOWCASE */}
      {showcase.length > 0 && (
        <div
          style={{
            background: "var(--surface)",
            borderTop: "1px solid var(--border)",
            padding: "72px 24px",
          }}
        >
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div className="section-label">Real work by our contractors</div>
            <h2 style={{ fontSize: 30, marginBottom: 36 }}>
              See what our contractors can do.
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 16,
              }}
            >
              {showcase.map((item, i) => (
                <div
                  key={i}
                  style={{
                    borderRadius: 12,
                    overflow: "hidden",
                    position: "relative",
                    aspectRatio: "4/3",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate("/register")}
                >
                  <img
                    src={item.url}
                    alt={item.contractorName}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                      transition: "transform 0.3s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "scale(1.05)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  />

                  {/* Overlay */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)",
                    }}
                  />

                  {/* Info */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: "16px",
                    }}
                  >
                    <div
                      style={{
                        color: "white",
                        fontWeight: 600,
                        fontSize: 14,
                      }}
                    >
                      {item.contractorName}
                    </div>
                    {item.location && (
                      <div
                        style={{
                          color: "rgba(255,255,255,0.75)",
                          fontSize: 12,
                          marginTop: 2,
                        }}
                      >
                        📍 {item.location}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ textAlign: "center", marginTop: 36 }}>
              <button
                className="btn btn-ghost"
                onClick={() => navigate("/register")}
              >
                Find a contractor →
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Landing;
