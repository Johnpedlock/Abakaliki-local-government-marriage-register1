from pathlib import Path

page = Path(
    "app/register/page.js"
)

content = page.read_text()

# ==========================================
# ADD EMAIL VALIDATION
# ==========================================

old_validation = '''
    if (isNaN(form.age)) {
      setError("Age must be a number");
      return;
    }
'''

new_validation = '''
    if (isNaN(form.age)) {
      setError("Age must be a number");
      return;
    }

    if (
      !form.email ||
      !form.email.includes("@")
    ) {
      setError(
        "Valid email address is required"
      );
      return;
    }
'''

if old_validation in content:

    content = content.replace(
        old_validation,
        new_validation
    )

# ==========================================
# ADD EMAIL INPUT
# ==========================================

old_inputs = '''
            <Input name="occupation" placeholder="Occupation" onChange={handleChange} />
            <Input name="phone" placeholder="Phone Number" onChange={handleChange} />
            <Input name="address" placeholder="Address" onChange={handleChange} />
'''

new_inputs = '''
            <Input name="occupation" placeholder="Occupation" onChange={handleChange} />

            <Input
              name="email"
              type="email"
              placeholder="Email Address"
              onChange={handleChange}
            />

            <Input
              name="phone"
              placeholder="Phone Number"
              onChange={handleChange}
            />

            <Input
              name="address"
              placeholder="Address"
              onChange={handleChange}
            />
'''

if old_inputs in content:

    content = content.replace(
        old_inputs,
        new_inputs
    )

page.write_text(content)

print(
    "Registration email field added successfully."
)
