"use client";

import { useState } from "react";

export default function BookAppointment() {

  const API =
    process.env.NEXT_PUBLIC_API_URL;

  const [form, setForm] =
    useState({
      registration_ref: "",
      appointment_date: "",
      appointment_time: ""
    });

  const [loading, setLoading] =
    useState(false);

  const [result, setResult] =
    useState(null);

  const [error, setError] =
    useState("");

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]:
        e.target.value
    });

  };

  const submit = async (e) => {

    e.preventDefault();

    setLoading(true);

    setError("");

    setResult(null);

    try {

      const token =
        localStorage.getItem(
          "admin_token"
        );

      const res = await fetch(
        `${API}/appointment/create`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
            Authorization: token
          },
          body: JSON.stringify(form)
        }
      );

      const data =
        await res.json();

      console.log(data);

      if (data.success) {

        setResult(data);

      } else {

        setError(
          data.message ||
          "Booking failed"
        );

      }

    } catch (err) {

      console.error(err);

      setError(
        "Server error occurred"
      );

    }

    setLoading(false);

  };

  return (
    <div style={styles.page}>

      <div style={styles.container}>

        <h1 style={styles.title}>
          Marriage Appointment Booking
        </h1>

        <p style={styles.subtitle}>
          Schedule your official
          marriage appointment
        </p>

        <form
          onSubmit={submit}
          style={styles.form}
        >

          <input
            type="text"
            name="registration_ref"
            placeholder="Registration Reference"
            required
            value={
              form.registration_ref
            }
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="date"
            name="appointment_date"
            required
            value={
              form.appointment_date
            }
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="time"
            name="appointment_time"
            required
            value={
              form.appointment_time
            }
            onChange={handleChange}
            style={styles.input}
          />

          <button
            type="submit"
            style={styles.button}
            disabled={loading}
          >
            {loading
              ? "Scheduling..."
              : "Book Appointment"}
          </button>

        </form>

        {error && (
          <div style={styles.error}>
            {error}
          </div>
        )}

        {result && (
          <div style={styles.card}>

            <h2>
              Appointment Scheduled
            </h2>

            <p>
              <strong>
                Appointment Reference:
              </strong>
              <br />
              {
                result
                .appointment_reference
              }
            </p>

            <img
              src={result.qr}
              alt="QR Code"
              style={styles.qr}
            />

            <button
              onClick={() =>
                window.print()
              }
              style={styles.printBtn}
            >
              Print Appointment Slip
            </button>

          </div>
        )}

      </div>

    </div>
  );
}

const styles = {

  page: {
    minHeight: "100vh",
    background: "#f4f4f4",
    padding: 30
  },

  container: {
    maxWidth: 600,
    margin: "auto",
    background: "white",
    padding: 30,
    borderRadius: 12
  },

  title: {
    color: "#006400",
    textAlign: "center"
  },

  subtitle: {
    textAlign: "center",
    marginBottom: 30
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: 15
  },

  input: {
    padding: 14,
    borderRadius: 6,
    border: "1px solid #ccc"
  },

  button: {
    background: "#006400",
    color: "white",
    border: "none",
    padding: 14,
    borderRadius: 6,
    cursor: "pointer",
    fontWeight: "bold"
  },

  error: {
    marginTop: 20,
    background: "#ffe5e5",
    color: "red",
    padding: 12,
    borderRadius: 6
  },

  card: {
    marginTop: 30,
    padding: 30,
    border: "1px solid #ddd",
    borderRadius: 12,
    textAlign: "center"
  },

  qr: {
    width: 220,
    marginTop: 20
  },

  printBtn: {
    marginTop: 20,
    background: "#222",
    color: "white",
    border: "none",
    padding: 12,
    borderRadius: 6,
    cursor: "pointer"
  }
};
