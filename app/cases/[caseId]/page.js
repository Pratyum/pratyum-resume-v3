import { notFound } from 'next/navigation';
import { casesData } from '../../../assets/data/cases-data';
import CaseDetailsClient from './CaseDetailsClient';

export async function generateStaticParams() {
  return casesData.map((item) => ({
    caseId: item.caseId,
  }));
}

export async function generateMetadata({ params }) {
  const caseData = casesData.find((item) => item.caseId === params.caseId);
  
  if (!caseData) {
    return {
      title: 'Not Found',
      description: 'The page you\'re looking for does not exist',
    };
  }

  return {
    title: `${caseData.title} | Pratyum Jagan`,
    description: caseData.desc,
  };
}

export default async function CaseDetails({ params }) {
  try {
    const caseData = casesData.find((item) => item.caseId === params.caseId);
    if (!caseData) return notFound();

    const nextCaseData = casesData.find((item) => item.caseId === caseData.nextCaseId);
    
    const props = {
      caseId: params.caseId,
      caseData,
      ...(nextCaseData && {
        nextCaseTitle: nextCaseData.title,
        nextCaseImgUrl: nextCaseData.url,
        nextCaseObjectPosition: nextCaseData.objectPosition || '0% 0%',
      }),
    };

    return <CaseDetailsClient {...props} />;
  } catch (error) {
    return notFound();
  }
}
