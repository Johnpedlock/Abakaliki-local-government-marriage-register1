"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {

  const API =
    process.env.NEXT_PUBLIC_API_URL;

  const router = useRouter();

  const [appointments, setAppointments] =
    useState([]);

  const [stats, setStats] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [selected, setSelected] =
    useState(null);

  const [search, setSearch] =
    useState("");

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("admin_token")
      : null;

  // ==========================================
  // LOGOUT
  // ==========================================
  const logout = () => {

    localStorage.removeItem(
      "admin_token"
    );

    router.push("/admin/login");
  };

  // ==========================================
  // LOAD DASHBOARD
  // ==========================================
  const loadDashboard = async () => {

    try {

      // ===============================
      // LOAD APPOINTMENTS
      // ===============================
      const appointmentsRes =
        await fetch(
          `${API}/admin/appointments`,
          {
            headers: {
              Authorization: token
            }
          }
        );

      const appointmentsData =
        await appointmentsRes.json();

      setAppointments(
        appointmentsData.appointments || []
      );

      // ===============================
      // LOAD STATS
      // ===============================
      const statsRes =
        await fetch(
          `${API}/admin/dashboard/stats`,
          {
            headers: {
              Authorization: token
            }
          }
        );

      const statsData =
        await statsRes.json();

      setStats(statsData.stats);

    } catch (err) {

      console.error(err);

    }

    setLoading(false);
  };

  useEffect(() => {

    if (!token) {

      router.push("/admin/login");
      return;
    }

    loadDashboard();

  }, []);

  // ==========================================
  // APPROVE
  // ==========================================
  const approveAppointment =
    async (ref) => {

      await fetch(
        `${API}/admin/appointment/${ref}/approve`,
        {
          method: "PUT",
          headers: {
            Authorization: token
          }
        }
      );

      loadDashboard();
    };

  // ==========================================
  // COMPLETE
  // ==========================================
  const completeAppointment =
    async (ref) => {

      await fetch(
        `${API}/admin/appointment/${ref}/complete`,
        {
          method: "PUT",
          headers: {
            Authorization: token
          }
        }
      );

      loadDashboard();
    };

  // ==========================================
  // REJECT
  // ==========================================
  const rejectAppointment =
    async (ref) => {

      await fetch(
        `${API}/admin/appointment/${ref}/reject`,
        {
          method: "PUT",
          headers: {
            Authorization: token
          }
        }
      );

      loadDashboard();
    };

  // ==========================================
  // SEARCH FILTER
  // ==========================================
  const filtered =
    appointments.filter((a) => {

      const q =
        search.toLowerCase();

      return (
        a.full_name
          ?.toLowerCase()
          .includes(q) ||

        a.reference_number
          ?.toLowerCase()
          .includes(q)
      );
    });

  // ==========================================
  // LOADING
  // ==========================================
  if (loading) {

    return (
      <div style={styles.loading}>
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div style={styles.page}>

      {/* HEADER */}
      <div style={styles.header}>

        <div>

          <h1 style={styles.title}>
            Abakaliki Marriage Registry
          </h1>

          <p style={styles.subtitle}>
            Administrative Dashboard
          </p>

        </div>

        <button
          onClick={logout}
          style={styles.logout}
        >
          Logout
        </button>

      </div>

      {/* STATS */}
      {stats && (

        <div style={styles.statsGrid}>

          <StatCard
            title="Appointments"
            value={stats.total_appointments}
          />

          <StatCard
            title="Approved"
            value={stats.approved_appointments}
          />

          <StatCard
            title="Completed"
            value={stats.completed_appointments}
          />

          <StatCard
            title="Rejected"
            value={stats.rejected_appointments}
          />

        </div>

      )}

      {/* SEARCH */}
      <input
        placeholder="Search appointment..."
        value={search}
        onChange={(e)=>
          setSearch(e.target.value)
        }
        style={styles.search}
      />

      {/* TABLE */}
      <div style={styles.tableWrapper}>

        <table style={styles.table}>

          <thead>

            <tr>

              <th>Name</th>
              <th>Appointment Ref</th>
              <th>Registration Ref</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {filtered.map((a) => (

              <tr key={a.id}>

                <td>{a.full_name}</td>

                <td>
                  {a.reference_number}
                </td>

                <td>
                  {a.registration_ref}
                </td>

                <td>
                  {a.appointment_date}
                </td>

                <td>
                  <span style={styles.status}>
                    {a.status}
                  </span>
                </td>

                <td>

                  <div style={styles.actions}>

                    <button
                      onClick={() =>
                        setSelected(a)
                      }
                      style={styles.view}
                    >
                      View
                    </button>

                    {a.status === "scheduled" && (
                      <button
                        onClick={() =>
                          approveAppointment(
                            a.reference_number
                          )
                        }
                        style={styles.approve}
                      >
                        Approve
                      </button>
                    )}

                    {a.status === "approved" && (
                      <button
                        onClick={() =>
                          completeAppointment(
                            a.reference_number
                          )
                        }
                        style={styles.complete}
                      >
                        Complete
                      </button>
                    )}

                    {a.status !== "completed" &&
                     a.status !== "rejected" && (
                      <button
                        onClick={() =>
                          rejectAppointment(
                            a.reference_number
                          )
                        }
                        style={styles.reject}
                      >
                        Reject
                      </button>
                    )}

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* DETAILS MODAL */}
      {selected && (

        <div style={styles.modalOverlay}>

          <div style={styles.modal}>

            <h2>
              Appointment Details
            </h2>

            <div style={styles.detailGrid}>

              <Detail
                label="Full Name"
                value={selected.full_name}
              />

              <Detail
                label="Email"
                value={selected.email}
              />

              <Detail
                label="Phone"
                value={selected.phone}
              />

              <Detail
                label="Appointment Ref"
                value={selected.reference_number}
              />

              <Detail
                label="Registration Ref"
                value={selected.registration_ref}
              />

              <Detail
                label="Date"
                value={selected.appointment_date}
              />

              <Detail
                label="Time"
                value={selected.appointment_time}
              />

              <Detail
                label="Status"
                value={selected.status}
              />

            </div>

            <button
              onClick={() =>
                setSelected(null)
              }
              style={styles.close}
            >
              Close
            </button>

          </div>

        </div>

      )}

    </div>
  );
}

// ==========================================
// DETAIL
// ==========================================
function Detail({ label, value }) {

  return (
    <div style={styles.detail}>
      <strong>{label}</strong>
      <p>{value || "-"}</p>
    </div>
  );
}

// ==========================================
// STAT CARD
// ==========================================
function StatCard({ title, value }) {

  return (
    <div style={styles.card}>
      <p>{title}</p>
      <h2>{value}</h2>
    </div>
  );
}

// ==========================================
// STYLES
// ==========================================
const styles = {

  page: {
    background: "#f3f4f6",
    minHeight: "100vh",
    padding: "20px"
  },

  loading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    fontSize: "20px"
  },

  header: {
    background: "#006400",
    color: "white",
    padding: "20px",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },

  title: {
    margin: 0
  },

  subtitle: {
    marginTop: "5px"
  },

  logout: {
    background: "white",
    color: "#006400",
    border: "none",
    padding: "10px 15px",
    borderRadius: "5px",
    cursor: "pointer"
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(200px,1fr))",
    gap: "15px",
    marginTop: "20px"
  },

  card: {
    background: "white",
    padding: "20px",
    borderRadius: "10px"
  },

  search: {
    width: "100%",
    marginTop: "20px",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc"
  },

  tableWrapper: {
    overflowX: "auto",
    marginTop: "20px",
    background: "white",
    borderRadius: "10px"
  },

  table: {
    width: "100%",
    borderCollapse: "collapse"
  },

  actions: {
    display: "flex",
    gap: "8px"
  },

  view: {
    background: "#333",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "5px"
  },

  approve: {
    background: "#006400",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "5px"
  },

  complete: {
    background: "#1d4ed8",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "5px"
  },

  reject: {
    background: "#dc2626",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "5px"
  },

  status: {
    fontWeight: "bold"
  },

  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },

  modal: {
    background: "white",
    padding: "30px",
    borderRadius: "10px",
    width: "90%",
    maxWidth: "700px"
  },

  detailGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "15px",
    marginTop: "20px"
  },

  detail: {
    background: "#f9fafb",
    padding: "10px",
    borderRadius: "5px"
  },

  close: {
    marginTop: "20px",
    background: "#333",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "5px"
  }
};
