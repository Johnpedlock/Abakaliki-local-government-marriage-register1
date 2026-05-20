from pathlib import Path

page = Path(
    "app/admin/registrations/page.js"
)

content = page.read_text()

# ==========================================
# ADD DELETE FUNCTION
# ==========================================

insert_after = '''
  };
'''

delete_function = '''

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
'''

# Insert after reject function ending
target = '''
  };
'''

position = content.find(
    target,
    content.find(
        'const reject = async'
    )
)

if position == -1:

    print(
        "Reject function end not found."
    )

    exit()

position += len(target)

content = (
    content[:position]
    + delete_function
    + content[position:]
)

# ==========================================
# ADD DELETE BUTTON
# ==========================================

old = '''
                    >
                      Reject
                    </button>
'''

new = '''
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
'''

if old not in content:

    print(
        "Reject button not found."
    )

    exit()

content = content.replace(
    old,
    new,
    1
)

page.write_text(content)

print(
    "Registration delete added successfully."
)
