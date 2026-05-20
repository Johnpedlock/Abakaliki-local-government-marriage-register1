"use client";

export default function Home() {
  return (
    <div style={styles.container}>

      {/* HERO SECTION */}
      <section style={styles.hero}>
        <img src="/logo.png" alt="Government Logo" style={styles.logo} />

        <h1 style={styles.title}>
          Abakaliki Local Government
        </h1>

        <h2 style={styles.subtitle}>
          Marriage Registration Portal
        </h2>

        <p style={styles.text}>
          Official platform for marriage registration in Abakaliki Local Government Area.
        </p>

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
      </section>

      {/* ABOUT SECTION */}
      <section style={styles.section}>
        <h2>About This Service</h2>

        <p style={styles.sectionText}>
          This platform enables residents to register their marriage online,
          receive a reference number, and complete the process at the local
          government office. All registrations are verified and processed
          officially.
        </p>
      </section>

      {/* PROCESS SECTION */}
      <section style={styles.sectionAlt}>
        <h2>How It Works</h2>

        <div style={styles.steps}>
          <div style={styles.card}>
            <h3>1. Register</h3>
            <p>Fill out your marriage details online.</p>
          </div>

          <div style={styles.card}>
            <h3>2. Get Reference</h3>
            <p>Receive a unique registration number.</p>
          </div>

          <div style={styles.card}>
            <h3>3. Visit Office</h3>
            <p>Present your receipt at the council office.</p>
          </div>

          <div style={styles.card}>
            <h3>4. Collect Certificate</h3>
            <p>Get your official marriage certificate.</p>
          </div>
        </div>
      </section>

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
      <section style={styles.section}>
        <h2>Office Location</h2>

        <div style={styles.mapWrapper}>
          <iframe
            src="https://www.google.com/maps?q=Abakaliki+Ebonyi+State&output=embed"
            width="100%"
            height="300"
            style={{ border: 0 }}
            loading="lazy"
          ></iframe>
        </div>

        <p style={styles.sectionText}>
          Abakaliki Local Government Council Area, Nkaliki, Ebonyi State.
        </p>
      </section>

      {/* FOOTER */}
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

    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    width: "100%",
    overflowX: "hidden"
  },

  hero: {
    background: "#006400",
    color: "white",
    textAlign: "center",
    padding: "60px 20px",
    width: "100%",
    overflow: "hidden"
  },

  logo: {
    width: "80px",
    marginBottom: "10px"
  },

  title: {
    margin: "10px 0",
    fontSize: "28px"
  },

  subtitle: {
    margin: "5px 0",
    fontSize: "20px",
    fontWeight: "normal"
  },

  text: {
    maxWidth: "500px",
    margin: "10px auto"
  },

  buttonGroup: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    flexWrap: "wrap",
    width: "100%"
  },

  primaryBtn: {
    background: "white",
    color: "#006400",
    padding: "12px 20px",
    textDecoration: "none",
    borderRadius: "5px",
    fontWeight: "bold"
  },

  secondaryBtn: {
    border: "1px solid white",
    color: "white",
    padding: "12px 20px",
    textDecoration: "none",
    borderRadius: "5px"
  },

  section: {
    padding: "40px 20px",
    textAlign: "center"
  },

  sectionAlt: {
    padding: "40px 20px",
    background: "#f5f5f5",
    textAlign: "center"
  },

  sectionText: {
    maxWidth: "600px",
    margin: "10px auto"
  },

  steps: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "15px",
    marginTop: "20px"
  },

  card: {
    background: "white",
    padding: "20px",
    width: "100%",
    maxWidth: "220px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
  },

  mapWrapper: {
    maxWidth: "600px",
    margin: "auto"
  },

  footer: {
    background: "#006400",
    color: "white",
    textAlign: "center",
    padding: "15px",
    marginTop: "40px"
  }
};
