from pathlib import Path

page = Path(
    "app/admin/registrations/page.js"
)

content = page.read_text()

# ==========================================
# APPROVED BLOCK
# ==========================================

old_approved = '''
                {r.status === "approved" && (
                  <span>
                    Approved
                  </span>
                )}
'''

new_approved = '''
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
'''

# ==========================================
# REJECTED BLOCK
# ==========================================

old_rejected = '''
                {r.status === "rejected" && (
                  <span>
                    Rejected
                  </span>
                )}
'''

new_rejected = '''
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
'''

if old_approved not in content:

    print(
        "Approved block not found."
    )

    exit()

if old_rejected not in content:

    print(
        "Rejected block not found."
    )

    exit()

content = content.replace(
    old_approved,
    new_approved
)

content = content.replace(
    old_rejected,
    new_rejected
)

page.write_text(content)

print(
    "Global registration delete buttons added successfully."
)
