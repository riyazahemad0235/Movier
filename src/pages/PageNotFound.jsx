import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1
        style={{
          fontSize: "80px",
          color: "#c0392b",
          fontFamily: "Bebas Neue, cursive",
        }}
      >
        404
      </h1>
      <h2 style={{ fontSize: "24px", marginBottom: "20px" }}>Page Not Found</h2>
      <p style={{ color: "rgba(255,255,255,0.5)", marginBottom: "30px" }}>
        Oops! The page you are looking for does not exist.
      </p>
      <Link to="/" style={{ color: "#c0392b", fontSize: "18px" }}>
        Go back to Home
      </Link>
    </div>
  );
}

export default NotFound;
