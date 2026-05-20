from pathlib import Path

page = Path("app/admin/page.js")

content = page.read_text()

old = '''
      const data = await res.json();

      console.log("DASHBOARD:", data);

      setStats(data.stats);
'''

new = '''
      const data = await res.json();

      console.log("DASHBOARD:", data);

      if (
        data &&
        data.success &&
        data.stats
      ) {

        setStats(data.stats);

      } else {

        console.error(
          "Invalid dashboard response"
        );

        setStats({
          total_registrations: 0,
          total_appointments: 0,
          approved_appointments: 0,
          completed_appointments: 0,
          rejected_appointments: 0,
          rescheduled_appointments: 0,
          audit_logs: 0
        });

      }
'''

if old not in content:

    print("Dashboard fetch block not found.")
    exit()

content = content.replace(old, new)

page.write_text(content)

print(
    "Dashboard fetch hardened successfully."
)
