# Authentication release gates

- Resume the existing free project; verify healthy status before connecting.
- Use only its publishable key in browser code. Never ship a secret or service-role key.
- Inspect existing users, tables and provider configuration before changing shared settings.
- Configure exact production and local callback URLs; preserve existing allowed URLs.
- Keep email confirmation enabled. Verify recovery emails and production email delivery.
- Google requires a configured OAuth client. Do not display a working Google signup claim until tested.
- Account data tables require RLS and per-user ownership policies before exposure.
- Test signed-out access rejection and cross-account isolation using disposable test accounts.
- Verify login, logout, recovery and deletion before public release.
- No analytics or advertising scripts are part of this initial scaffold.
