import type { Metadata } from 'next';
import { labGames } from '@/config/lab.config';
import LabAccessClient from './LabAccessClient';

export const metadata: Metadata = {
  title: 'Lab Access | Logan Pinney',
  description: 'Private lab access console for Logan Pinney experiments.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function LabPage() {
  return <LabAccessClient games={labGames} />;
}
