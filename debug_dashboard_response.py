from pathlib import Path

page = Path("app/admin/page.js")

content = page.read_text()

old = '''
      const res = await fetch(
        `${API}/admin/dashboard/stats`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await res.json();

      console.log("DASHBOARD:", data);
'''

new = '''
      const res = await fetch(
        `${API}/admin/dashboard/stats`,
        {
          headers: {
            Authorization: token
          }
        }
      );

      console.log(
        "DASHBOARD STATUS:",
        res.status
      );

      const text = await res.text();

      console.log(
        "RAW DASHBOARD RESPONSE:",
        text
      );

      let data = {};

      try {

        data = JSON.parse(text);

      } catch (err) {

        console.error(
          "JSON PARSE ERROR:",
          err
        );

      }

      console.log(
        "PARSED DASHBOARD:",
        data
      );
'''

if old not in content:

    print(
        "Exact dashboard fetch block not found."
    )

    exit()

content = content.replace(
    old,
    new
)

page.write_text(content)

print(
    "Dashboard deep debug installed successfully."
)
