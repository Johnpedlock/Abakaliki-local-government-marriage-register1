from pathlib import Path

page = Path(
    "app/admin/appointments/page.js"
)

content = page.read_text()

# ==========================================
# ADD DELETE FUNCTION
# ==========================================

if 'const removeAppointment' not in content:

    insert_after = '''
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
'''

    delete_function = '''

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
'''

    content = content.replace(
        insert_after,
        insert_after + delete_function
    )

# ==========================================
# ADD DELETE TO APPROVED BLOCK
# ==========================================

old_approved = '''
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
'''

new_approved = '''
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
'''

content = content.replace(
    old_approved,
    new_approved,
    1
)

# ==========================================
# ADD DELETE TO COMPLETED BLOCK
# ==========================================

old_completed = '''
                {a.status === "completed" && (
                  <span>
                    Completed
                  </span>
                )}
'''

new_completed = '''
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
'''

content = content.replace(
    old_completed,
    new_completed
)

# ==========================================
# ADD DELETE TO REJECTED BLOCK
# ==========================================

old_rejected = '''
                {a.status === "rejected" && (
                  <span>
                    Rejected
                  </span>
                )}
'''

new_rejected = '''
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
'''

content = content.replace(
    old_rejected,
    new_rejected
)

page.write_text(content)

print(
    "Global appointment delete system added successfully."
)
