import { useEffect, useState, useRef } from "react";
import axios from "../../api/axios";
import { toast } from "react-toastify";

const MyPortfolio = () => {
  const [photos, setPhotos] = useState([]);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get("/auth/profile");
        setPhotos(data.portfolio || []);
      } catch (error) {
        toast.error("Failed to load portfolio");
      }
    };
    fetchProfile();
  }, []);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      const { data } = await axios.post("/upload/portfolio", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setPhotos([...photos, data.url]);
      toast.success("Photo uploaded!");
    } catch (error) {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (url) => {
    try {
      await axios.delete("/upload/portfolio", { data: { url } });
      setPhotos(photos.filter((p) => p !== url));
      toast.success("Photo removed");
    } catch (error) {
      toast.error("Failed to remove photo");
    }
  };

  return (
    <div className="page">
      <h1 className="page-title">My Portfolio</h1>
      <p className="page-sub">
        Upload photos of your completed work. These will be shown to customers
        on the homepage.
      </p>

      {/* Upload button */}
      <div
        style={{
          border: "1.5px dashed var(--border)",
          borderRadius: 12,
          padding: "36px",
          textAlign: "center",
          background: "var(--surface)",
          cursor: "pointer",
          marginBottom: 28,
        }}
        onClick={() => fileRef.current.click()}
      >
        <div style={{ fontSize: 36, marginBottom: 10 }}>📷</div>
        <div style={{ fontWeight: 600, marginBottom: 4 }}>
          {uploading ? "Uploading..." : "Click to upload a photo"}
        </div>
        <div style={{ fontSize: 13, color: "var(--ink3)" }}>
          JPG, PNG or WEBP — max 5MB
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleUpload}
          disabled={uploading}
        />
      </div>

      {/* Photos grid */}
      {photos.length === 0 ? (
        <div className="empty">
          <div style={{ fontSize: 36, marginBottom: 10 }}>🖼️</div>
          <h3 style={{ fontSize: 17, marginBottom: 6 }}>No photos yet</h3>
          <p style={{ fontSize: 14, color: "var(--ink2)" }}>
            Upload your first work photo to attract more customers.
          </p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 14,
          }}
        >
          {photos.map((url, i) => (
            <div
              key={i}
              style={{
                position: "relative",
                borderRadius: 10,
                overflow: "hidden",
                aspectRatio: "1",
              }}
            >
              <img
                src={url}
                alt={`Portfolio ${i + 1}`}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              {/* Delete button */}
              <button
                onClick={() => handleDelete(url)}
                style={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  background: "rgba(0,0,0,0.6)",
                  color: "white",
                  border: "none",
                  borderRadius: "50%",
                  width: 30,
                  height: 30,
                  cursor: "pointer",
                  fontSize: 14,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPortfolio;
