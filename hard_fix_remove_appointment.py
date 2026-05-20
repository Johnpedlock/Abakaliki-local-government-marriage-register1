from pathlib import Path

page = Path(
    "app/admin/appointments/page.js"
)

content = page.read_text()

# Prevent duplicate insertion
if "const removeAppointment" in content:

    print(
        "removeAppointment already exists."
    )

    exit()

marker = '''
  // ==========================================
  // SEARCH
'''

new_function = '''
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
'''

if marker not in content:

    print(
        "SEARCH marker not found."
    )

    exit()

content = content.replace(
    marker,
    new_function
)

page.write_text(content)

print(
    "removeAppointment function fixed successfully."
)
