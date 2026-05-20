from pathlib import Path

css = Path("app/globals.css")

content = css.read_text()

responsive_styles = '''

/* ==========================================
GLOBAL RESET
========================================== */

* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  font-family: Arial, sans-serif;
  background: #f5f5f5;
}

/* ==========================================
RESPONSIVE IMAGES
========================================== */

img {
  max-width: 100%;
  height: auto;
}

/* ==========================================
RESPONSIVE TABLES
========================================== */

table {
  width: 100%;
  border-collapse: collapse;
}

.table-wrapper {
  width: 100%;
  overflow-x: auto;
}

/* ==========================================
FORM ELEMENTS
========================================== */

input,
select,
textarea,
button {
  width: 100%;
  max-width: 100%;
  font-size: 16px;
}

/* ==========================================
MOBILE RESPONSIVE UTILITIES
========================================== */

@media (max-width: 768px) {

  h1 {
    font-size: 24px !important;
  }

  h2 {
    font-size: 20px !important;
  }

  h3 {
    font-size: 18px !important;
  }

  p {
    font-size: 14px !important;
  }

  button,
  a {
    font-size: 14px !important;
  }

}

/* ==========================================
SCROLLBAR
========================================== */

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-thumb {
  background: #006400;
  border-radius: 10px;
}
'''

if responsive_styles not in content:

    content += responsive_styles

css.write_text(content)

print(
    "Global responsive styles added successfully."
)
