"use client";

import { useEffect, useState } from "react";

export default function RegistrationsPage() {

  const API =
    process.env.NEXT_PUBLIC_API_URL;

  const [registrations, setRegistrations] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("admin_token")
      : null;

  useEffect(() => {

    loadRegistrations();

  }, []);

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

      setRegistrations(data || []);

    } catch (err) {

      console.error(err);

    }

    setLoading(false);
  };

  if (loading) {

    return (
      <div style={{ padding: 30 }}>
        Loading registrations...
      </div>
    );
  }

  return (
    <div style={{ padding: 30 }}>

      <h1>
        Registrations Management
      </h1>

      <table
        border="1"
        cellPadding="10"
        style={{
          width: "100%",
          marginTop: 20
        }}
      >

        <thead>

          <tr>
            <th>Full Name</th>
            <th>Reference</th>
            <th>Phone</th>
            <th>Status</th>
          </tr>

        </thead>

        <tbody>

          {registrations.map((r) => (

            <tr key={r.id}>

              <td>{r.full_name}</td>
              <td>{r.reference_number}</td>
              <td>{r.phone}</td>
              <td>{r.status}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}
