import { NextResponse } from 'next/server';

const BASE = 'https://www.pratyum.xyz';

const metadata = {
  issuer: BASE,
  authorization_endpoint: `${BASE}/oauth/authorize`,
  token_endpoint: `${BASE}/oauth/token`,
  jwks_uri: `${BASE}/.well-known/jwks.json`,
  response_types_supported: ['code'],
  grant_types_supported: ['authorization_code'],
  scopes_supported: ['openid', 'profile'],
  token_endpoint_auth_methods_supported: ['none'],
  service_documentation: `${BASE}/about`,

  // agent_auth block per Auth.md spec (https://github.com/workos/auth.md)
  agent_auth: {
    register_uri: null,
    identity_types: ['anonymous'],
    credential_types: ['none'],
    claim_uri: null,
    revocation_uri: null,
    note: 'All public endpoints are accessible without registration or credentials.',
  },
};

export async function GET() {
  return NextResponse.json(metadata, {
    headers: {
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
