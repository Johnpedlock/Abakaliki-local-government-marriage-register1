"use client";

import { useState } from "react";

export default function Verify() {
  const [ref, setRef] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const handleCheck = async () => {
    setError("");
    setData(null);

    if (!ref) {
      setError("Enter a reference number");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/verify/${ref}`);
      const result = await res.json();

      if (result.message === "Not found") {
        setError("No record found");
      } else {
        setData(result);
      }

    } catch {
      setError("Server error");
    }
  };

  return (
    <div>

      <h2 style={styles.title}>Verify Registration</h2>

      <div style={styles.searchBox}>
        <input
          placeholder="Enter Reference Number"
          value={ref}
          onChange={(e) => setRef(e.target.value)}
          style={styles.input}
        />

        <button onClick={handleCheck} style={styles.button}>
          Check
        </button>
      </div>

      {error && <div style={styles.error}>{error}</div>}

      {data && (
        <div style={styles.card}>
          <h3>Registration Details</h3>
          <p><strong>Name:</strong> {data.full_name}</p>
          <p><strong>Age:</strong> {data.age}</p>
          <p><strong>Status:</strong> 
            <span style={statusStyle(data.status)}> {data.status}</span>
          </p>
        </div>
      )}

    </div>
  );
}

/* STYLES */
const styles = {
  title: { marginBottom: "20px" },

  searchBox: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px"
  },

  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    flex: 1
  },

  button: {
    background: "#006400",
    color: "white",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px"
  },

  error: {
    background: "#ffe5e5",
    padding: "10px",
    color: "red"
  },

  card: {
    border: "1px solid #ddd",
    padding: "20px",
    borderRadius: "8px",
    background: "#fff"
  }
};

const statusStyle = (status) => ({
  color:
    status === "issued" ? "green" :
    status === "verified" ? "orange" :
    "gray",
  fontWeight: "bold"
});
