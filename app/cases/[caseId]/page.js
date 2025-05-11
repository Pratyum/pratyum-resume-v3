import { getAllCaseIds, getCaseData, getAllCases } from '@/lib/mdx';
import CaseDetailsClient from './CaseDetailsClient';

export async function generateStaticParams() {
  return getAllCaseIds();
}

export async function generateMetadata({ params }) {
  const caseData = await getCaseData(params.caseId);
  const { frontMatter } = caseData;
  console.warn({frontMatter});
  // Extract first paragraph for description if not provided
  const description = frontMatter.desc || frontMatter.excerpt || 
    frontMatter.content?.substring(0, 160).replace(/\n/g, ' ') + '...';
  
  return {
    title: `${frontMatter.title} | Pratyum Jagannath - Full Stack Developer`,
    description,
    keywords: [...(frontMatter.keywords || []), ...(frontMatter.filterBy || []), 'Pratyum Jagannath', 'Full Stack Developer'],
    openGraph: {
      title: frontMatter.title,
      description,
      type: 'article',
      publishedTime: frontMatter.date,
      authors: ['Pratyum Jagannath'],
      images: [
        {
          url: frontMatter.url,
          width: 1200,
          height: 630,
          alt: frontMatter.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: frontMatter.title,
      description,
      images: [frontMatter.url],
    },
    alternates: {
      canonical: `https://pratyumjagan.in/cases/${params.caseId}`,
    },
  };
}

export default async function CaseDetails({ params }) {
  const caseData = await getCaseData(params.caseId);
  const allCases = await getAllCases();
  const nextCase = allCases.find(item => item.caseId === caseData.frontMatter.nextCaseId);
  return <CaseDetailsClient caseId={params.caseId} caseData={caseData} nextCase={nextCase} />;
}