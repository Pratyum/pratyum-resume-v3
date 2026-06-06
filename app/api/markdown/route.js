import { NextResponse } from 'next/server';

const PAGE_MARKDOWN = {
  '/': `# Pratyum Jagannath — Full Stack Developer & Web3 Enthusiast

**URL:** https://www.pratyum.xyz
**Role:** Full Stack Developer
**Skills:** React, Next.js, Node.js, Python, Django, Web3, JavaScript

## About

Pratyum Jagannath is a Full Stack Developer specialized in React, Node.js, Python, and Web3 technologies with experience in building innovative applications.

## Links

- [Portfolio](https://www.pratyum.xyz)
- [GitHub](https://github.com/pratyum)
- [LinkedIn](https://linkedin.com/in/pratyumjagannath)
- [Cases / Projects](https://www.pratyum.xyz/cases)
- [About](https://www.pratyum.xyz/about)
- [Contact](https://www.pratyum.xyz/contact)

## Agent Discovery

- [API Catalog](https://www.pratyum.xyz/.well-known/api-catalog)
- [MCP Server Card](https://www.pratyum.xyz/.well-known/mcp/server-card.json)
- [Agent Skills Index](https://www.pratyum.xyz/.well-known/agent-skills/index.json)
- [Auth Info](https://www.pratyum.xyz/auth.md)
`,
  '/about': `# About — Pratyum Jagannath

Full Stack Developer & Web3 Enthusiast based in Singapore.
Alumnus of Nanyang Technological University.

**URL:** https://www.pratyum.xyz/about
`,
  '/cases': `# Projects & Case Studies — Pratyum Jagannath

A curated selection of projects across web3, SaaS, and full-stack development.

**URL:** https://www.pratyum.xyz/cases
`,
  '/contact': `# Contact — Pratyum Jagannath

Reach out via [LinkedIn](https://linkedin.com/in/pratyumjagannath) or the contact form at https://www.pratyum.xyz/contact.
`,
};

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get('path') || '/';
  const content = PAGE_MARKDOWN[path] ?? PAGE_MARKDOWN['/'];

  return new NextResponse(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Vary': 'Accept',
    },
  });
}
