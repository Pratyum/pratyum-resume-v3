# Auth.md — Agent Registration for pratyum.xyz

This site is the personal portfolio of Pratyum Jagannath. There are no user accounts or commercial APIs. Agent access is fully open and read-only.

## Agent Registration

No registration is required to access publicly available content.

## Identity Types Supported

- `anonymous` — all public endpoints are accessible without authentication

## Credential Types

None required for public read access.

## OAuth / OIDC Discovery

- OpenID Configuration: <https://www.pratyum.xyz/.well-known/openid-configuration>
- Protected Resource Metadata: <https://www.pratyum.xyz/.well-known/oauth-protected-resource>

## Endpoints Accessible Without Authentication

- `GET /` — Homepage
- `GET /about` — About page
- `GET /cases` — Case studies
- `GET /contact` — Contact page
- `GET /feed.xml` — RSS feed
- `GET /.well-known/api-catalog` — API catalog (RFC 9727)
- `GET /.well-known/agent-skills/index.json` — Agent skills index
- `GET /.well-known/mcp/server-card.json` — MCP server card

## Contact

For questions about agent access, open an issue at <https://github.com/Pratyum/pratyum-resume-v3/issues> or use the contact form at <https://www.pratyum.xyz/contact>.
