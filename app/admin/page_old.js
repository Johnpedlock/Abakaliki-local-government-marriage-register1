"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {

  const API = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("admin_token")
      : null;

  // ================= LOGOUT =================
  const logout = () => {
    localStorage.removeItem("admin_token");
    router.push("/admin/login");
  };

  // ================= LOAD DATA =================
  const loadData = async () => {

    try {

      const res = await fetch(
        `${API}/admin/registrations`,
        {
          method: "GET",
          headers: {
            Authorization: token
          }
        }
      );

      const text = await res.text();

      let data = [];

      try {
        data = JSON.parse(text);
      } catch {
        console.error("Invalid JSON:", text);
      }

      setRegistrations(
        Array.isArray(data) ? data : []
      );

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

    loadData();

  }, []);

  // ================= APPROVE =================
  const approve = async (ref) => {

    await fetch(
      `${API}/admin/verify/${ref}`,
      {
        method: "PUT",
        headers: {
          Authorization: token
        }
      }
    );

    loadData();
  };

  // ================= COLLECT =================
  const collect = async (ref) => {

    await fetch(
      `${API}/admin/collect/${ref}`,
      {
        method: "PUT",
        headers: {
          Authorization: token
        }
      }
    );

    loadData();
  };

  // ================= SEARCH =================
  const filtered = registrations.filter((r) => {

    const q = search.toLowerCase();

    return (
      r.full_name?.toLowerCase().includes(q) ||
      r.reference_number?.toLowerCase().includes(q)
    );
  });

  // ================= STATS =================
  const total = registrations.length;

  const pending = registrations.filter(
    r => r.status === "pending"
  ).length;

  const approved = registrations.filter(
    r => r.status === "verified"
  ).length;

  const collected = registrations.filter(
    r => r.status === "collected"
  ).length;

  // ================= LOADING =================
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
            Abakaliki Marriage Register
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
      <div style={styles.statsGrid}>

        <StatCard
          title="Total"
          value={total}
        />

        <StatCard
          title="Pending"
          value={pending}
        />

        <StatCard
          title="Approved"
          value={approved}
        />

        <StatCard
          title="Collected"
          value={collected}
        />

      </div>

      {/* SEARCH */}
      <input
        placeholder="Search by name or reference number..."
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        style={styles.search}
      />

      {/* TABLE */}
      <div style={styles.tableWrapper}>

        <table style={styles.table}>

          <thead>

            <tr>
              <th>Name</th>
              <th>Reference</th>
              <th>Phone</th>
              <th>Wedding Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>

            {filtered.map((r) => (

              <tr key={r.id}>

                <td>{r.full_name}</td>

                <td>{r.reference_number}</td>

                <td>{r.phone}</td>

                <td>{r.wedding_date}</td>

                <td>
                  <span style={styles.status}>
                    {r.status}
                  </span>
                </td>

                <td>

                  <div style={styles.actions}>

                    <button
                      onClick={() => setSelected(r)}
                      style={styles.view}
                    >
                      View
                    </button>

                    {r.status === "pending" && (
                      <button
                        onClick={() => approve(r.reference_number)}
                        style={styles.approve}
                      >
                        Approve
                      </button>
                    )}

                    {r.status === "verified" && (
                      <button
                        onClick={() => collect(r.reference_number)}
                        style={styles.collect}
                      >
                        Collected
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
              Applicant Information
            </h2>

            <div style={styles.detailGrid}>

              <Detail label="Full Name" value={selected.full_name} />
              <Detail label="Age" value={selected.age} />
              <Detail label="Occupation" value={selected.occupation} />
              <Detail label="Phone" value={selected.phone} />
              <Detail label="Address" value={selected.address} />
              <Detail label="Condition" value={selected.condition} />
              <Detail label="Consent Name" value={selected.consent_name} />
              <Detail label="Wedding Date" value={selected.wedding_date} />
              <Detail label="Reference Number" value={selected.reference_number} />
              <Detail label="Status" value={selected.status} />

            </div>

            <button
              onClick={() => setSelected(null)}
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

// ================= DETAIL =================
function Detail({ label, value }) {
  return (
    <div style={styles.detail}>
      <strong>{label}</strong>
      <p>{value || "-"}</p>
    </div>
  );
}

// ================= STAT CARD =================
function StatCard({ title, value }) {
  return (
    <div style={styles.card}>
      <p>{title}</p>
      <h2>{value}</h2>
    </div>
  );
}

// ================= STYLES =================
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
    gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
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

  collect: {
    background: "#1d4ed8",
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
