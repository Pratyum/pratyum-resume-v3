// app/feed.xml/route.js
import { getAllCases } from '@/lib/mdx';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://pratyumjagan.in';
export async function GET() {
  const cases = await getAllCases();
  
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <title>Pratyum Jagannath - Projects</title>
        <link>${BASE_URL}/cases</link>
        <description>Full Stack Developer Projects and Case Studies</description>
        <language>en</language>
        <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
        ${cases.map(caseItem => `
          <item>
            <title>${caseItem.title}</title>
            <link>${BASE_URL}/cases/${caseItem.caseId}</link>
            <description>${caseItem.desc}</description>
            <pubDate>${new Date(caseItem.date).toUTCString()}</pubDate>
            <guid>${BASE_URL}/cases/${caseItem.caseId}</guid>
          </item>
        `).join('')}
      </channel>
    </rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}