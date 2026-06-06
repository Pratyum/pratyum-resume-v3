import { NextResponse } from 'next/server';

const BASE = 'https://www.pratyum.xyz';

const discovery = {
  issuer: BASE,
  authorization_endpoint: `${BASE}/oauth/authorize`,
  token_endpoint: `${BASE}/oauth/token`,
  jwks_uri: `${BASE}/.well-known/jwks.json`,
  response_types_supported: ['code'],
  grant_types_supported: ['authorization_code'],
  subject_types_supported: ['public'],
  id_token_signing_alg_values_supported: ['RS256'],
  scopes_supported: ['openid', 'profile'],
  claims_supported: ['sub', 'name', 'email'],
  service_documentation: `${BASE}/about`,
};

export async function GET() {
  return NextResponse.json(discovery, {
    headers: {
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
