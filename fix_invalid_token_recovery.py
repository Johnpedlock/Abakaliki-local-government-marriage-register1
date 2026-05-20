from pathlib import Path

page = Path("app/admin/page.js")

content = page.read_text()

old = '''
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

new = '''
      if (
        data &&
        data.success &&
        data.stats
      ) {

        setStats(data.stats);

      } else {

        console.error(
          "Invalid dashboard response:",
          data
        );

        // AUTO CLEAR BAD TOKEN
        if (
          data.message &&
          data.message.includes(
            "Invalid authorization token"
          )
        ) {

          localStorage.removeItem(
            "admin_token"
          );

          alert(
            "Session expired. Please login again."
          );

          router.push(
            "/admin/login"
          );

          return;
        }

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

    print(
        "Dashboard response block not found."
    )

    exit()

content = content.replace(
    old,
    new
)

page.write_text(content)

print(
    "Invalid token auto-recovery added successfully."
)
