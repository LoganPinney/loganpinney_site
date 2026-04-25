import type { Metadata } from 'next';
import HackerTerminalMemo from '@/components/HackerTerminalMemo';

export const metadata: Metadata = {
  title: 'Bean Protocol Memo | Logan Pinney Lab',
  description: 'A hidden public terminal memo from the lab.',
  robots: {
    index: false,
    follow: false,
  },
};

const lines = [
  'BOOT SEQUENCE: BEAN_PROTOCOL',
  'ACCESS LEVEL: PUBLIC_EASTER_EGG',
  'CLASSIFICATION: unserious, but operational',
  '',
  'If you found this, you did not click the obvious button.',
  'Good.',
  '',
  'Most systems show you the surface.',
  'Some systems let you knock on the wall.',
  'A few systems answer back.',
  '',
  'This is one of those.',
  '',
  'The bean was not chosen because it is powerful.',
  'The bean was chosen because it is small, stupid, underestimated, and somehow still capable of starting a war.',
  '',
  'That is the whole joke.',
  'That is also the whole warning.',
  '',
  'Enough small things, ignored long enough, become infrastructure.',
  'Enough bad handoffs become a bottleneck.',
  'Enough hidden manual work becomes a liability.',
  'Enough beans become Bean Wars.',
  '',
  'KNOWN ACCESS PHRASES:',
  'beans',
  'beanwars',
  'play bean-wars',
  '',
  'PUBLIC ROUTE:',
  '/lab/bean-wars',
  '',
  'RIDDLE:',
  'I look harmless in isolation.',
  'I become chaos in bulk.',
  'I am counted by the handful and feared by the system.',
  '',
  'ANSWER:',
  'beans',
  '',
  'END MEMO',
];

export default function BeanProtocolPage() {
  return (
    <HackerTerminalMemo
      eyebrow="bean protocol"
      title="Bean Protocol"
      lines={lines}
      backHref="/"
      nextHref="/lab/bean-wars"
      nextLabel="launch bean wars"
    />
  );
}