from pathlib import Path

page = Path("app/admin/page.js")

content = page.read_text()

old = '''
      {/* STATS */}
      <div style={styles.grid}>

        <Card
          title="Registrations"
          value={stats.total_registrations}
        />

        <Card
          title="Appointments"
          value={stats.total_appointments}
        />

        <Card
          title="Approved"
          value={stats.approved_appointments}
        />

        <Card
          title="Completed"
          value={stats.completed_appointments}
        />

        <Card
          title="Rejected"
          value={stats.rejected_appointments}
        />

        <Card
          title="Rescheduled"
          value={stats.rescheduled_appointments}
        />

        <Card
          title="Audit Logs"
          value={stats.audit_logs}
        />

      </div>
'''

new = '''
      {/* STATS */}
      {stats ? (

        <div style={styles.grid}>

          <Card
            title="Registrations"
            value={stats.total_registrations || 0}
          />

          <Card
            title="Appointments"
            value={stats.total_appointments || 0}
          />

          <Card
            title="Approved"
            value={stats.approved_appointments || 0}
          />

          <Card
            title="Completed"
            value={stats.completed_appointments || 0}
          />

          <Card
            title="Rejected"
            value={stats.rejected_appointments || 0}
          />

          <Card
            title="Rescheduled"
            value={stats.rescheduled_appointments || 0}
          />

          <Card
            title="Audit Logs"
            value={stats.audit_logs || 0}
          />

        </div>

      ) : (

        <div style={{
          padding: 20
        }}>
          Loading statistics...
        </div>

      )}
'''

if old not in content:

    print("Stats block not found.")
    exit()

content = content.replace(old, new)

page.write_text(content)

print(
    "Dashboard statistics rendering fixed successfully."
)
