import { getAllCases } from '@/lib/mdx';

export default async function sitemap() {
  const casesData = await getAllCases();
  // Get all case studies
  const cases = casesData.map((caseItem) => ({
    url: `https://pratyum.xyz/cases/${caseItem.caseId}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  // Add main pages
  const routes = [
    '',
    '/about',
    '/cases',
    '/contact',
  ].map((route) => ({
    url: `https://pratyum.xyz${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  return [...routes, ...cases];
}