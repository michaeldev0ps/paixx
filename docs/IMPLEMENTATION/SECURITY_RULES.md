# Security Rules

Security always takes priority over convenience.

Authentication is security-critical.

Never implement custom authentication.

Always use a battle-tested provider.

Never store passwords yourself.

Never create custom JWT logic.

Always use battle-tested providers.

Preferred Providers

1. Supabase Auth

2. Clerk

3. Auth0

Every authentication feature must first define:

Threats

Abuse cases

Rate limiting

Session lifecycle

Recovery

MFA strategy

Only after approval may implementation begin.





Implementation Phases

1.

Provider selection.

Pause.

2.

Threat model.

Pause.

3.

Edge cases.

Pause.

4.

Configuration.

Pause.

5.

Database integration.

Pause.

6.

Session management.

Pause.

7.

Testing.

Pause.

8.

Deployment.

Never skip a phase.

Never write code before approval.
