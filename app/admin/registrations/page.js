"use client";

import { useEffect, useState } from "react";

export default function RegistrationsPage() {

  const API =
    process.env.NEXT_PUBLIC_API_URL;

  const [registrations, setRegistrations] =
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
  // LOAD REGISTRATIONS
  // ==========================================
  const loadRegistrations = async () => {

    try {

      const res = await fetch(
        `${API}/admin/registrations`,
        {
          headers: {
            Authorization: token
          }
        }
      );

      const data = await res.json();

      console.log(
        "REGISTRATIONS:",
        data
      );

      setRegistrations(
        Array.isArray(data)
          ? data
          : []
      );

    } catch (err) {

      console.error(err);

    }

    setLoading(false);
  };

  useEffect(() => {

    loadRegistrations();

  }, []);

  // ==========================================
  // APPROVE
  // ==========================================
  const approve = async (ref) => {

    try {

      const res = await fetch(
        `${API}/admin/registration/${ref}/approve`,
        {
          method: "PUT",
          headers: {
            Authorization: token
          }
        }
      );

      const data = await res.json();

      console.log(data);

      loadRegistrations();

    } catch (err) {

      console.error(err);

    }

  };

  // ==========================================
  // REJECT
  // ==========================================
  const reject = async (ref) => {

    try {

      const res = await fetch(
        `${API}/admin/registration/${ref}/reject`,
        {
          method: "PUT",
          headers: {
            Authorization: token
          }
        }
      );

      const data = await res.json();

      console.log(data);

      loadRegistrations();

    } catch (err) {

      console.error(err);

    }

  };


  // ==========================================
  // DELETE
  // ==========================================
  const removeRegistration = async (ref) => {

    const confirmed = confirm(
      "Delete this registration permanently?"
    );

    if (!confirmed) return;

    try {

      const res = await fetch(
        `${API}/admin/registration/${ref}/delete`,
        {
          method: "DELETE",
          headers: {
            Authorization: token
          }
        }
      );

      const data = await res.json();

      console.log(data);

      loadRegistrations();

    } catch (err) {

      console.error(err);

    }

  };

  // ==========================================
  // SEARCH FILTER
  // ==========================================
  const filtered =
    registrations.filter((r) => {

      const q =
        search.toLowerCase();

      return (
        r.full_name
          ?.toLowerCase()
          .includes(q)
        ||
        r.reference_number
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
        Loading registrations...
      </div>
    );
  }

  return (
    <div style={styles.page}>

      <h1 style={styles.title}>
        Registrations Management
      </h1>

      {/* SEARCH */}
      <input
        placeholder="Search by name or reference number..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        style={styles.search}
      />

      {/* TABLE */}
      <div style={{
        width: "100%",
        overflowX: "auto"
      }}>

      <table style={styles.table}>

        <thead>

          <tr>

            <th>Name</th>

            <th>Reference</th>

            <th>Email</th>

            <th>Phone</th>

            <th>Age</th>

            <th>Occupation</th>

            <th>Address</th>

            <th>Condition</th>

            <th>Consent Name</th>

            <th>Wedding Date</th>

            <th>Status</th>

            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {filtered.map((r) => (

            <tr key={r.id}>

              <td>
                {r.full_name}
              </td>

              <td>
                {r.reference_number}
              </td>

              <td>
                {r.email}
              </td>

              <td>
                {r.phone}
              </td>

              <td>
                {r.age}
              </td>

              <td>
                {r.occupation}
              </td>

              <td>
                {r.address}
              </td>

              <td>
                {r.condition}
              </td>

              <td>
                {r.consent_name}
              </td>

              <td>
                {r.wedding_date}
              </td>

              <td>

                <span
                  style={{
                    fontWeight: "bold",
                    color:
                      r.status === "approved"
                        ? "green"
                        : r.status === "rejected"
                        ? "red"
                        : "#856404"
                  }}
                >
                  {r.status}
                </span>

              </td>

              <td>

                {r.status === "pending" && (
                  <>

                    <button
                      onClick={() =>
                        approve(
                          r.reference_number
                        )
                      }
                      style={styles.approve}
                    >
                      Approve
                    </button>

                    <button
                      onClick={() =>
                        reject(
                          r.reference_number
                        )
                      }
                      style={styles.reject}
                    >
                      Reject
                    </button>

                    <button
                      style={{
                        background: "red",
                        color: "white",
                        marginLeft: 10
                      }}
                      onClick={() =>
                        removeRegistration(
                          r.reference_number
                        )
                      }
                    >
                      Delete
                    </button>

                  </>
                )}

                {r.status === "approved" && (
                  <>

                    <span
                      style={{
                        color: "green",
                        marginRight: 10,
                        fontWeight: "bold"
                      }}
                    >
                      Approved
                    </span>

                    <button
                      style={{
                        background: "red",
                        color: "white"
                      }}
                      onClick={() =>
                        removeRegistration(
                          r.reference_number
                        )
                      }
                    >
                      Delete
                    </button>

                  </>
                )}

                {r.status === "rejected" && (
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
                        removeRegistration(
                          r.reference_number
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
    minWidth: "1400px",
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
    cursor: "pointer"
  }

};
