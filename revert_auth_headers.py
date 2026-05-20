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
        'Authorization: `Bearer ${token}`',
        'Authorization: token'
    )

    path.write_text(content)

    print(f"Reverted auth header in {file_path}")

print(
    "All admin auth headers reverted successfully."
)
