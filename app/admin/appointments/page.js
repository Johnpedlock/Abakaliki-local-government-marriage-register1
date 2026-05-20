"use client";

import { useEffect, useState } from "react";

export default function AppointmentsPage() {

  const API =
    process.env.NEXT_PUBLIC_API_URL;

  const [appointments, setAppointments] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("admin_token")
      : null;

  // ==========================================
  // LOAD APPOINTMENTS
  // ==========================================
  const loadAppointments = async () => {

    try {

      const res = await fetch(
        `${API}/admin/appointments`,
        {
          headers: {
            Authorization: token
          }
        }
      );

      const data = await res.json();

      console.log(
        "APPOINTMENTS:",
        data
      );

      setAppointments(
        data.appointments || []
      );

    } catch (err) {

      console.error(err);

    }

    setLoading(false);
  };

  useEffect(() => {

    loadAppointments();

  }, []);

  // ==========================================
  // APPROVE
  // ==========================================
  const approve = async (ref) => {

    try {

      await fetch(
        `${API}/admin/appointment/${ref}/approve`,
        {
          method: "PUT",
          headers: {
            Authorization: token
          }
        }
      );

      loadAppointments();

    } catch (err) {

      console.error(err);

    }

  };

  // ==========================================
  // REJECT
  // ==========================================
  const reject = async (ref) => {

    try {

      await fetch(
        `${API}/admin/appointment/${ref}/reject`,
        {
          method: "PUT",
          headers: {
            Authorization: token
          }
        }
      );

      loadAppointments();

    } catch (err) {

      console.error(err);

    }

  };

  // ==========================================
  // COMPLETE
  // ==========================================
  const complete = async (ref) => {

    try {

      await fetch(
        `${API}/admin/appointment/${ref}/complete`,
        {
          method: "PUT",
          headers: {
            Authorization: token
          }
        }
      );

      loadAppointments();

    } catch (err) {

      console.error(err);

    }

  };

  // ==========================================
  // DELETE APPOINTMENT
  // ==========================================
  const removeAppointment = async (ref) => {

    const confirmed = confirm(
      "Delete this appointment permanently?"
    );

    if (!confirmed) return;

    try {

      const res = await fetch(
        `${API}/admin/appointment/${ref}/delete`,
        {
          method: "DELETE",
          headers: {
            Authorization: token
          }
        }
      );

      const data = await res.json();

      console.log(data);

      loadAppointments();

    } catch (err) {

      console.error(err);

    }

  };



  // ==========================================
  // SEARCH
  // ==========================================
  const filtered =
    appointments.filter((a) => {

      const q =
        search.toLowerCase();

      return (
        a.full_name
          ?.toLowerCase()
          .includes(q)
        ||
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
      <div style={{
        padding: 40
      }}>
        Loading appointments...
      </div>
    );
  }

  return (
    <div style={styles.page}>

      <h1 style={styles.title}>
        Appointment Management
      </h1>

      {/* SEARCH */}
      <input
        placeholder="Search by name or appointment reference..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        style={styles.search}
      />

      {/* TABLE */}
      <table style={styles.table}>

        <thead>

          <tr>
            <th>Name</th>
            <th>Reference</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>

        </thead>

        <tbody>

          {filtered.map((a) => (

            <tr key={a.id}>

              <td>
                {a.full_name}
              </td>

              <td>
                {a.reference_number}
              </td>

              <td>
                {new Date(
                  a.appointment_date
                ).toLocaleDateString()}
              </td>

              <td>

                <span
                  style={{
                    fontWeight: "bold",
                    color:
                      a.status === "approved"
                        ? "green"
                        : a.status === "completed"
                        ? "#006400"
                        : a.status === "rejected"
                        ? "red"
                        : "#856404"
                  }}
                >
                  {a.status}
                </span>

              </td>

              <td>

                {(a.status === "scheduled" ||
                  a.status === "rescheduled") && (
                  <>

                    <button
                      onClick={() =>
                        approve(
                          a.reference_number
                        )
                      }
                      style={styles.approve}
                    >
                      Approve
                    </button>

                    <button
                      onClick={() =>
                        reject(
                          a.reference_number
                        )
                      }
                      style={styles.reject}
                    >
                      Reject
                    </button>

                    <button
                      style={{
                        background: "red",
                        color: "white"
                      }}
                      onClick={() =>
                        removeAppointment(
                          a.reference_number
                        )
                      }
                    >
                      Delete
                    </button>

                  </>
                )}

                {a.status === "approved" && (
                  <>

                    <button
                      onClick={() =>
                        complete(
                          a.reference_number
                        )
                      }
                      style={styles.complete}
                    >
                      Complete
                    </button>

                    <button
                      onClick={() =>
                        reject(
                          a.reference_number
                        )
                      }
                      style={styles.reject}
                    >
                      Reject
                    </button>

                  </>
                )}

                {a.status === "completed" && (
                  <>

                    <span
                      style={{
                        color: "#006400",
                        marginRight: 10,
                        fontWeight: "bold"
                      }}
                    >
                      Completed
                    </span>

                    <button
                      style={{
                        background: "red",
                        color: "white"
                      }}
                      onClick={() =>
                        removeAppointment(
                          a.reference_number
                        )
                      }
                    >
                      Delete
                    </button>

                  </>
                )}

                {a.status === "rejected" && (
                  <>

                    <span
                      style={{
                        color: "red",
                        marginRight: 10,
                        fontWeight: "bold"
                      }}
                    >
                      Rejected
                    </span>

                    <button
                      style={{
                        background: "red",
                        color: "white"
                      }}
                      onClick={() =>
                        removeAppointment(
                          a.reference_number
                        )
                      }
                    >
                      Delete
                    </button>

                  </>
                )}

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

const styles = {

  page: {
    padding: 40
  },

  title: {
    marginBottom: 20
  },

  search: {
    width: "100%",
    padding: 14,
    marginBottom: 25,
    borderRadius: 8,
    border: "1px solid #ccc"
  },

  table: {
    width: "100%",
    borderCollapse: "collapse"
  },

  approve: {
    background: "#006400",
    color: "white",
    border: "none",
    padding: "10px 14px",
    borderRadius: 6,
    marginRight: 10,
    cursor: "pointer"
  },

  reject: {
    background: "#8B0000",
    color: "white",
    border: "none",
    padding: "10px 14px",
    borderRadius: 6,
    marginRight: 10,
    cursor: "pointer"
  },

  complete: {
    background: "#0047AB",
    color: "white",
    border: "none",
    padding: "10px 14px",
    borderRadius: 6,
    marginRight: 10,
    cursor: "pointer"
  }

};
