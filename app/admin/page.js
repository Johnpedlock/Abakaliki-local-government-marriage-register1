"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {

  const API =
    process.env.NEXT_PUBLIC_API_URL;

  const router = useRouter();

  const [stats, setStats] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("admin_token")
      : null;

  useEffect(() => {

    if (!token) {

      router.push("/admin/login");

      return;
    }

    loadStats();

  }, []);

  const loadStats = async () => {

    try {

      const res = await fetch(
        `${API}/admin/dashboard/stats`,
        {
          headers: {
            Authorization: token
          }
        }
      );

      console.log(
        "DASHBOARD STATUS:",
        res.status
      );

      const text = await res.text();

      console.log(
        "RAW DASHBOARD RESPONSE:",
        text
      );

      let data = {};

      try {

        data = JSON.parse(text);

      } catch (err) {

        console.error(
          "JSON PARSE ERROR:",
          err
        );

      }

      console.log(
        "PARSED DASHBOARD:",
        data
      );

      if (
        data &&
        data.success &&
        data.stats
      ) {

        setStats(data.stats);

      } else {

        console.error(
          "Invalid dashboard response:",
          data
        );

        // AUTO CLEAR BAD TOKEN
        if (
          data.message &&
          data.message.includes(
            "Invalid authorization token"
          )
        ) {

          localStorage.removeItem(
            "admin_token"
          );

          alert(
            "Session expired. Please login again."
          );

          router.push(
            "/admin/login"
          );

          return;
        }

        setStats({
          total_registrations: 0,
          total_appointments: 0,
          approved_appointments: 0,
          completed_appointments: 0,
          rejected_appointments: 0,
          rescheduled_appointments: 0,
          audit_logs: 0
        });

      }

    } catch (err) {

      console.error(err);

    }

    setLoading(false);
  };

  if (loading) {

    return (
      <div style={{
        padding: 40
      }}>
        Loading dashboard...
      </div>
    );
  }

  return (
    <div style={styles.page}>

      <h1 style={styles.title}>
        Abakaliki Marriage Registry
      </h1>

      <p style={styles.subtitle}>
        Administrative Operations Dashboard
      </p>


{/* STATS */}

{stats ? (

<div style={styles.grid}>

  <Card
    title="Registrations"
    value={stats.total_registrations || 0}
  />

  <Card
    title="Appointments"
    value={stats.total_appointments || 0}
  />

  <Card
    title="Approved"
    value={stats.approved_appointments || 0}
  />

  <Card
    title="Completed"
    value={stats.completed_appointments || 0}
  />

  <Card
    title="Rejected"
    value={stats.rejected_appointments || 0}
  />

  <Card
    title="Rescheduled"
    value={stats.rescheduled_appointments || 0}
  />

  <Card
    title="Audit Logs"
    value={stats.audit_logs || 0}
  />

</div>

) : (

<div style={{
  padding: 20
}}>
  Loading statistics...
</div>

)}


      {/* NAVIGATION */}
      <div style={styles.nav}>

        <Link
          href="/admin/registrations"
          style={styles.link}
        >
          Manage Registrations
        </Link>

        <Link
          href="/admin/appointments"
          style={styles.link}
        >
          Manage Appointments
        </Link>

      </div>

    </div>
  );
}

function Card({ title, value }) {

  return (
    <div style={styles.card}>

      <h3>{title}</h3>

      <h1>{value}</h1>

    </div>
  );
}

const styles = {

  page: {
    padding: 40,
    background: "#f3f4f6",
    minHeight: "100vh"
  },

  title: {
    marginBottom: 5
  },

  subtitle: {
    color: "#555",
    marginBottom: 30
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(220px,1fr))",
    gap: 20
  },

  card: {
    background: "white",
    padding: 25,
    borderRadius: 10
  },

  nav: {
    marginTop: 40,
    display: "flex",
    gap: 20
  },

  link: {
    background: "#006400",
    color: "white",
    padding: "15px 20px",
    borderRadius: 8,
    textDecoration: "none"
  }
};
