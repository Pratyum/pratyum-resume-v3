'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function WebMCP() {
  const router = useRouter();

  useEffect(() => {
    const mc = navigator.modelContext;
    if (!mc || typeof mc.provideContext !== 'function') return;
    if (mc.__webmcp_tools_registered) return;

    const tools = [
      {
        name: 'get_portfolio_summary',
        description: "Returns a brief summary of Pratyum Jagannath's portfolio including skills, roles, and links.",
        inputSchema: { type: 'object', properties: {}, required: [] },
        execute: async () => ({
          name: 'Pratyum Jagannath',
          role: 'Full Stack Developer & Web3 Enthusiast',
          skills: ['React', 'Next.js', 'Node.js', 'Python', 'Django', 'Web3'],
          links: {
            portfolio: 'https://www.pratyum.xyz',
            cases: 'https://www.pratyum.xyz/cases',
            about: 'https://www.pratyum.xyz/about',
            contact: 'https://www.pratyum.xyz/contact',
            github: 'https://github.com/pratyum',
            linkedin: 'https://linkedin.com/in/pratyumjagannath',
          },
        }),
      },
      {
        name: 'navigate_to',
        description: 'Navigate the browser to a named section of the portfolio.',
        inputSchema: {
          type: 'object',
          properties: {
            section: {
              type: 'string',
              enum: ['home', 'about', 'cases', 'contact'],
              description: 'The portfolio section to navigate to.',
            },
          },
          required: ['section'],
        },
        execute: async ({ section }) => {
          const routes = { home: '/', about: '/about', cases: '/cases', contact: '/contact' };
          const path = routes[section] ?? '/';
          router.push(path);
          return { navigated: true, path };
        },
      },
      {
        name: 'get_contact_info',
        description: 'Returns contact information and social profile links for Pratyum Jagannath.',
        inputSchema: { type: 'object', properties: {}, required: [] },
        execute: async () => ({
          github: 'https://github.com/pratyum',
          linkedin: 'https://linkedin.com/in/pratyumjagannath',
          twitter: 'https://twitter.com/pratyumjagan',
          contact_form: 'https://www.pratyum.xyz/contact',
        }),
      },
    ];

    mc.provideContext({ tools })
      .then(() => { mc.__webmcp_tools_registered = true; })
      .catch((err) => { console.error('[WebMCP] provideContext failed:', err); });

    return () => {
      if (typeof mc.unregisterTool === 'function') {
        tools.forEach(({ name }) => mc.unregisterTool(name));
      }
      delete mc.__webmcp_tools_registered;
    };
  }, [router]);

  return null;
}
