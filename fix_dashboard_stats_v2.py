from pathlib import Path
import re

page = Path("app/admin/page.js")

content = page.read_text()

pattern = r'<div style=\{styles\.grid\}>[\s\S]*?</div>'

replacement = '''
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

new_content = re.sub(
    pattern,
    replacement,
    content,
    count=1
)

page.write_text(new_content)

print(
    "Dashboard statistics fixed successfully."
)
