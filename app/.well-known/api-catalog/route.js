import { NextResponse } from 'next/server';

const BASE = 'https://www.pratyum.xyz';

const catalog = {
  linkset: [
    {
      anchor: `${BASE}/feed.xml`,
      'service-doc': [{ href: `${BASE}/feed.xml`, type: 'application/rss+xml' }],
      describedby: [{ href: `${BASE}/feed.xml`, type: 'application/rss+xml' }],
    },
    {
      anchor: BASE,
      'service-doc': [{ href: `${BASE}/about` }],
      status: [{ href: `${BASE}/api/health` }],
    },
  ],
};

export async function GET() {
  return new NextResponse(JSON.stringify(catalog, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/linkset+json',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
