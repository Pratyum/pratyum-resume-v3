import { getAllCaseIds, getCaseData, getAllCases } from '@/lib/mdx';
import CaseDetailsClient from './CaseDetailsClient';
import { Suspense } from 'react';

export async function generateStaticParams() {
  const caseIds = await getAllCaseIds();
  return caseIds;
}

export async function generateMetadata({ params }) {
  const { caseId } = await params;
  const caseData = await getCaseData(caseId);
  const { frontMatter } = caseData;
  if (!caseData?.frontMatter) {
      return {
        title: 'Case Not Found',
        description: 'The requested case study could not be found.'
      };
    }

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
  const {caseId} = await params;
  const caseData = await getCaseData(caseId);
  // Guard against missing case data
  if (!caseData || !caseData.frontMatter) {
    // Handle missing case data (redirect or show error)
    return <div>Case not found</div>;
  }
  
  const allCases = await getAllCases();
  
  // Find the next case or use a fallback
  let nextCase;
  if (caseData.frontMatter.nextCaseId) {
    nextCase = allCases.find(item => item.caseId === caseData.frontMatter.nextCaseId);
  }
  
  // If nextCase is still undefined, use the first case from allCases as a fallback
  if (!nextCase && allCases.length > 0) {
    nextCase = allCases[0];
  }
  return <Suspense fallback={<div>Loading...</div>}><CaseDetailsClient caseId={params.caseId} caseData={caseData} nextCase={nextCase} /></Suspense>;
}