const Footer = () => (
  <footer style={styles.footer}>
    <p style={styles.text}>
      © 2024 FurnishPro — Furniture Services Marketplace
    </p>
  </footer>
);

const styles = {
  footer: {
    backgroundColor: "#1a1a2e",
    color: "#888",
    textAlign: "center",
    padding: "20px",
    marginTop: "60px",
  },
  text: { margin: 0, fontSize: "14px" },
};

export default Footer;
