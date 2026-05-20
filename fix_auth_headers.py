from pathlib import Path

files = [
    "app/admin/page.js",
    "app/admin/registrations/page.js",
    "app/admin/appointments/page.js"
]

for file_path in files:

    path = Path(file_path)

    content = path.read_text()

    content = content.replace(
        'Authorization: token',
        'Authorization: `Bearer ${token}`'
    )

    path.write_text(content)

    print(f"Fixed auth headers in {file_path}")

print(
    "All admin authorization headers fixed successfully."
)
