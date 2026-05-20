"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {

  const router = useRouter();

  const API = process.env.NEXT_PUBLIC_API_URL;

  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // ================= LOGIN =================
  const handleLogin = async (e) => {

    e.preventDefault();

    setError("");

    try {

      setLoading(true);

      // ✅ CORRECT LOGIN ROUTE
      const res = await fetch(
        `${API}/admin/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(form)
        }
      );

      const data = await res.json();

      console.log(data);

      // ================= SUCCESS =================
      if (data.token) {

        // SAVE TOKEN
        localStorage.setItem(
          "admin_token",
          data.token
        );

        // REDIRECT
        router.push("/admin");

      } else {

        setError("Invalid username or password");

      }

    } catch (err) {

      console.error(err);

      setError("Server error");

    }

    setLoading(false);
  };

  return (
    <div style={styles.wrapper}>

      <form
        onSubmit={handleLogin}
        style={styles.container}
      >

        <div style={styles.header}>
          <h2 style={styles.title}>
            Admin Login
          </h2>

          <p style={styles.subtitle}>
            Abakaliki Marriage Register
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div style={styles.error}>
            {error}
          </div>
        )}

        {/* USERNAME */}
        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
          style={styles.input}
          required
        />

        {/* PASSWORD */}
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          style={styles.input}
          required
        />

        {/* BUTTON */}
        <button
          type="submit"
          style={styles.button}
          disabled={loading}
        >
          {loading ? "Signing in..." : "Login"}
        </button>

      </form>

    </div>
  );
}

// ================= STYLES =================
const styles = {

  wrapper: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f3f4f6"
  },

  container: {
    width: "100%",
    maxWidth: "400px",
    background: "white",
    padding: "30px",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
  },

  header: {
    textAlign: "center"
  },

  title: {
    margin: 0,
    color: "#006400"
  },

  subtitle: {
    marginTop: "5px",
    color: "#666",
    fontSize: "14px"
  },

  input: {
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "14px"
  },

  button: {
    background: "#006400",
    color: "white",
    padding: "12px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold"
  },

  error: {
    background: "#ffe5e5",
    color: "red",
    padding: "10px",
    borderRadius: "5px",
    fontSize: "14px"
  }
};
