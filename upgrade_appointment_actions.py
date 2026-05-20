from pathlib import Path

page = Path(
    "app/admin/appointments/page.js"
)

content = page.read_text()

old = '''
                {a.status === "scheduled" && (
                  <button
                    onClick={() =>
                      approve(a.reference_number)
                    }
                  >
                    Approve
                  </button>
                )}

                {a.status === "approved" && (
                  <button
                    onClick={() =>
                      complete(a.reference_number)
                    }
                  >
                    Complete
                  </button>
                )}
'''

new = '''
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
'''

if old not in content:
    print("Old appointment actions block not found.")
    exit()

content = content.replace(old, new, 1)

# ==========================================
# ADD REJECT FUNCTION
# ==========================================

marker = '''
  const complete = async (ref) => {
'''

reject_function = '''
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

'''

content = content.replace(
    marker,
    reject_function + marker,
    1
)

page.write_text(content)

print("Appointment lifecycle actions upgraded successfully.")
