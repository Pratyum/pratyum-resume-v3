import { NextResponse } from 'next/server';

const BASE = 'https://www.pratyum.xyz';

const metadata = {
  resource: BASE,
  authorization_servers: [BASE],
  scopes_supported: ['openid', 'profile'],
  bearer_methods_supported: ['header'],
  resource_documentation: `${BASE}/about`,
};

export async function GET() {
  return NextResponse.json(metadata, {
    headers: {
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
