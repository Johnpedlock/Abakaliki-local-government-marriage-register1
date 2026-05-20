"use client";

import { useEffect, useState } from "react";

export default function AppointmentsPage() {

  const API =
    process.env.NEXT_PUBLIC_API_URL;

  const [appointments, setAppointments] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("admin_token")
      : null;

  useEffect(() => {

    loadAppointments();

  }, []);

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

      setAppointments(
        data.appointments || []
      );

    } catch (err) {

      console.error(err);

    }

    setLoading(false);
  };

  const approve = async (ref) => {

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
  };

  const reject = async (ref) => {

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
  };


  const complete = async (ref) => {

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
  };

  if (loading) {

    return (
      <div style={{ padding: 30 }}>
        Loading appointments...
      </div>
    );
  }

  return (
    <div style={{ padding: 30 }}>

      <h1>
        Appointment Management
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
            <th>Name</th>
            <th>Appointment Ref</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>

        </thead>

        <tbody>

          {appointments.map((a) => (

            <tr key={a.id}>

              <td>{a.full_name}</td>

              <td>
                {a.reference_number}
              </td>

              <td>{a.status}</td>

              <td>

                {(a.status === "scheduled" ||
                  a.status === "rescheduled") && (
                  <>
                    <button
                      onClick={() =>
                        approve(a.reference_number)
                      }
                    >
                      Approve
                    </button>

                    <button
                      onClick={() =>
                        reject(a.reference_number)
                      }
                    >
                      Reject
                    </button>
                  </>
                )}

                {a.status === "approved" && (
                  <>
                    <button
                      onClick={() =>
                        complete(a.reference_number)
                      }
                    >
                      Complete
                    </button>

                    <button
                      onClick={() =>
                        reject(a.reference_number)
                      }
                    >
                      Reject
                    </button>
                  </>
                )}

                {a.status === "completed" && (
                  <span>
                    Completed
                  </span>
                )}

                {a.status === "rejected" && (
                  <span>
                    Rejected
                  </span>
                )}

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}
