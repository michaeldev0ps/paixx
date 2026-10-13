# Security Guidance

This project follows the security guidance in `docs/IMPLEMENTATION/SECURITY_RULES.md`.

Key points:
- Never commit secrets. Use environment variables and CI secrets.
- Use row-level security (RLS) in Supabase for per-user data protection.
- Validate and sanitize inputs server-side.
- Use least-privilege service keys for server-side operations only.
