"use client";

import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({});
  const [ref, setRef] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setRef("");

    // VALIDATION
    if (!form.full_name || !form.age) {
      setError("Full Name and Age are required");
      return;
    }

    if (isNaN(form.age)) {
      setError("Age must be a number");
      return;
    }

    if (
      !form.email ||
      !form.email.includes("@")
    ) {
      setError(
        "Valid email address is required"
      );
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      setRef(data.reference_number);

    } catch (err) {
      setError("Submission failed. Please try again.");
    }
  };

  return (
    <div>

      <h2 style={styles.title}>Marriage Registration Form</h2>

      {/* ERROR */}
      {error && <div style={styles.error}>{error}</div>}

      {/* SUCCESS */}
      {ref && (
        <div style={styles.success}>
          Registration Successful <br />
          Reference Number: <strong>{ref}</strong>
        </div>
      )}

      <form onSubmit={handleSubmit} style={styles.form}>

        {/* PERSONAL INFO */}
        <section style={styles.section}>
          <h3 style={styles.sectionTitle}>Personal Information</h3>

          <div style={styles.grid}>
            <Input name="full_name" placeholder="Full Name" onChange={handleChange} />
            <Input name="age" placeholder="Age" onChange={handleChange} />
            <Input name="occupation" placeholder="Occupation" onChange={handleChange} />

            <Input
              name="email"
              type="email"
              placeholder="Email Address"
              onChange={handleChange}
            />

            <Input
              name="phone"
              placeholder="Phone Number"
              onChange={handleChange}
            />

            <Input
              name="address"
              placeholder="Address"
              onChange={handleChange}
            />
          </div>
        </section>

        {/* MARRIAGE INFO */}
        <section style={styles.section}>
          <h3 style={styles.sectionTitle}>Marriage Details</h3>

          <div style={styles.grid}>
            <Input name="condition" placeholder="Condition" onChange={handleChange} />
            <Input name="consent_name" placeholder="Consent Name" onChange={handleChange} />
            <Input type="date" name="wedding_date" onChange={handleChange} />
          </div>
        </section>

        <button type="submit" style={styles.button}>
          Submit Registration
        </button>

      </form>
    </div>
  );
}

/* INPUT COMPONENT */
function Input({ name, placeholder, onChange, type = "text" }) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      style={styles.input}
    />
  );
}

/* STYLES */
const styles = {
  title: {
    marginBottom: "20px",
    fontSize: "22px"
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "25px"
  },

  section: {
    border: "1px solid #ddd",
    padding: "20px",
    borderRadius: "8px",
    background: "#fafafa"
  },

  sectionTitle: {
    marginBottom: "15px",
    color: "#006400"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "15px"
  },

  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px"
  },

  button: {
    background: "#006400",
    color: "white",
    padding: "12px",
    border: "none",
    borderRadius: "5px",
    fontWeight: "bold",
    cursor: "pointer"
  },

  error: {
    background: "#ffe5e5",
    padding: "10px",
    color: "red",
    borderRadius: "5px",
    marginBottom: "15px"
  },

  success: {
    background: "#e6ffe6",
    padding: "10px",
    color: "green",
    borderRadius: "5px",
    marginBottom: "15px"
  }
};
