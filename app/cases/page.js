import { CaseContent } from '@/components/CaseContent';
import { getAllCases } from '@/lib/mdx';

export const metadata = {
    title: 'Projects',
    description: 'Explore projects by Pratyum Jagannath including NFT minting platforms, mobile apps, and innovative technology solutions.',
    openGraph: {
      title: 'Projects by Pratyum Jagannath',
      description: 'Explore projects by Pratyum Jagannath including NFT minting platforms, mobile apps, and innovative technology solutions.',
    },
};
  
export default async function Cases() {
  const cases = await getAllCases();
  return <CaseContent cases={cases} />;
}
