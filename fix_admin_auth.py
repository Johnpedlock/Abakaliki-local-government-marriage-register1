from pathlib import Path

page = Path("app/admin/page.js")

content = page.read_text()

# ==========================================
# ADD ROUTER IMPORT
# ==========================================

old_import = '''
import Link from "next/link";
import { useEffect, useState } from "react";
'''

new_import = '''
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
'''

content = content.replace(
    old_import,
    new_import
)

# ==========================================
# ADD ROUTER
# ==========================================

old_router = '''
  const API =
    process.env.NEXT_PUBLIC_API_URL;
'''

new_router = '''
  const API =
    process.env.NEXT_PUBLIC_API_URL;

  const router = useRouter();
'''

content = content.replace(
    old_router,
    new_router
)

# ==========================================
# PROTECT USE EFFECT
# ==========================================

old_effect = '''
  useEffect(() => {

    loadStats();

  }, []);
'''

new_effect = '''
  useEffect(() => {

    if (!token) {

      router.push("/admin/login");

      return;
    }

    loadStats();

  }, []);
'''

content = content.replace(
    old_effect,
    new_effect
)

page.write_text(content)

print(
    "Admin authentication protection fixed successfully."
)
