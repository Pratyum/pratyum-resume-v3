import { casesData } from '@/assets/data/cases-data';

export default async function sitemap() {
  // Get all case studies
  const cases = casesData.map((caseItem) => ({
    url: `https://pratyumjagan.in/cases/${caseItem.caseId}`,
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
    url: `https://pratyumjagan.in${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  return [...routes, ...cases];
}