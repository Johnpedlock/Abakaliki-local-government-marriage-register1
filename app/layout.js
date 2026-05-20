export const metadata = {
  title: "Abakaliki Local Government Marriage Register",
  description: "Official Marriage Registration System"
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body style={styles.body}>

        {/* HEADER */}
        <header style={styles.header}>
          
          {/* LEFT SIDE (LOGO + TITLE) */}
          <div style={styles.logoSection}>
            <img
              src="/assets/logo.png"
              alt="Coat of Arms"
              style={styles.logo}
            />

            <div>
              <h1 style={styles.title}>
                ABAKALIKI LOCAL GOVERNMENT
              </h1>
              <p style={styles.subtitle}>
                Marriage Register
              </p>
            </div>
          </div>

          {/* NAVIGATION */}
          <nav style={styles.nav}>
            <a href="/" style={styles.navLink}>Home</a>
            <a href="/register" style={styles.navLink}>Register</a>
            <a href="/verify" style={styles.navLink}>Verify</a>
          </nav>
        </header>

        {/* MAIN CONTENT */}
        <main style={styles.main}>
          {children}
        </main>

        {/* FOOTER */}
        <footer style={styles.footer}>
          © {new Date().getFullYear()} Abakaliki Local Government Area — All Rights Reserved
        </footer>

      </body>
    </html>
  );
}

/* ================= STYLES ================= */

const styles = {
  body: {
    margin: 0,
    fontFamily: "Segoe UI, Arial, sans-serif",
    backgroundColor: "#f4f6f8"
  },

  header: {
    backgroundColor: "#006400",
    color: "white",
    padding: "15px 40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
  },

  logoSection: {
    display: "flex",
    alignItems: "center",
    gap: "15px"
  },

  logo: {
    height: "55px"
  },

  title: {
    margin: 0,
    fontSize: "18px",
    fontWeight: "bold"
  },

  subtitle: {
    margin: 0,
    fontSize: "13px",
    opacity: 0.9
  },

  nav: {
    display: "flex",
    gap: "25px"
  },

  navLink: {
    color: "white",
    textDecoration: "none",
    fontWeight: "500"
  },

  main: {
    maxWidth: "1100px",
    margin: "40px auto",
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
  },

  footer: {
    textAlign: "center",
    padding: "15px",
    backgroundColor: "#eaeaea",
    fontSize: "13px",
    marginTop: "40px"
  }
};
