from pathlib import Path

page = Path("app/page.js")

content = page.read_text()

# ==========================================
# UPDATE HERO BUTTONS
# ==========================================

old_buttons = '''
        <div style={styles.buttonGroup}>
          <a href="/register" style={styles.primaryBtn}>
            Register Marriage
          </a>

          <a href="/verify" style={styles.secondaryBtn}>
            Verify Registration
          </a>
        </div>
'''

new_buttons = '''
        <div style={styles.buttonGroup}>

          <a
            href="/register"
            style={styles.primaryBtn}
          >
            Register Marriage
          </a>

          <a
            href="/book"
            style={styles.primaryBtn}
          >
            Book Appointment
          </a>

          <a
            href="/verify"
            style={styles.secondaryBtn}
          >
            Verify Registration
          </a>

        </div>
'''

if old_buttons in content:

    content = content.replace(
        old_buttons,
        new_buttons
    )

# ==========================================
# ADD APPOINTMENT SECTION
# ==========================================

marker = '''
      {/* MAP SECTION */}
'''

appointment_section = '''
      {/* APPOINTMENT SECTION */}
      <section style={styles.sectionAlt}>

        <h2>
          Appointment Booking
        </h2>

        <p style={styles.sectionText}>
          Approved applicants can
          schedule their official
          marriage appointment online.
          A secure QR appointment slip
          will be generated instantly
          for verification at the
          registry office.
        </p>

        <div style={{
          marginTop: 25
        }}>

          <a
            href="/book"
            style={styles.primaryBtn}
          >
            Schedule Appointment
          </a>

        </div>

      </section>



      {/* MAP SECTION */}
'''

if marker in content:

    content = content.replace(
        marker,
        appointment_section
    )

# ==========================================
# UPGRADE FOOTER
# ==========================================

old_footer = '''
      <footer style={styles.footer}>
        <p>© {new Date().getFullYear()} Abakaliki Local Government</p>
      </footer>
'''

new_footer = '''
      <footer style={styles.footer}>

        <h3>
          Abakaliki Marriage Registry
        </h3>

        <p>
          Abakaliki Local Government
          Council Area,
          Ebonyi State, Nigeria
        </p>

        <p>
          Official Marriage Registration
          and Appointment Portal
        </p>

        <p>
          © {new Date().getFullYear()}
          Abakaliki Local Government
        </p>

      </footer>
'''

if old_footer in content:

    content = content.replace(
        old_footer,
        new_footer
    )

page.write_text(content)

print(
    "Homepage upgraded successfully."
)
