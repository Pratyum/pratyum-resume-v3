
import { personData } from '@/assets/data/personal-data';
import HomeContent from '@/components/HomeContent';
import StructuredData from '@/components/StructuredData';

export const metadata = {
  title: 'Pratyum Jagannath',
  description: 'Personal Resume for Pratyum Jagannath'
};

const Home = () => {
  return <>
  <HomeContent />
  <StructuredData data={personData} />
  </>;
};

export default Home;