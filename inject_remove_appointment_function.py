from pathlib import Path

page = Path(
    "app/admin/appointments/page.js"
)

content = page.read_text()

# Prevent duplicates
if "const removeAppointment" in content:

    print(
        "removeAppointment already exists."
    )

    exit()

insert_after = '''
  };

  // ==========================================
  // SEARCH
'''

new_block = '''

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

if insert_after not in content:

    print(
        "Insertion marker not found."
    )

    exit()

content = content.replace(
    insert_after,
    new_block
)

page.write_text(content)

print(
    "removeAppointment function added successfully."
)
