import type { Metadata } from 'next';
import HackerTerminalMemo from '@/components/HackerTerminalMemo';

export const metadata: Metadata = {
  title: 'Future Self Memo | Logan Pinney Lab',
  description: 'A hidden public terminal memo from the lab.',
  robots: {
    index: false,
    follow: false,
  },
};

const lines = [
  'FUTURE_SELF_MEMO',
  'STATUS: PUBLIC_BREADCRUMB',
  'CLASSIFICATION: reminder, warning, breadcrumb',
  '',
  'This is not a portfolio page.',
  'This is not a case study.',
  'This is not for the normal visitor.',
  '',
  'This is for future me.',
  '',
  'Read this when the system gets too polished.',
  'Read this when the useful thing starts getting buried under the clever thing.',
  'Read this when the weird layer tries to become the whole site.',
  '',
  'The job is still the same:',
  '',
  'Build the useful thing first.',
  'Make the system clear.',
  'Reduce friction.',
  'Remove ambiguity.',
  'Leave evidence.',
  'Do not worship complexity.',
  '',
  'The hidden layer is allowed to be strange.',
  'The public layer has to convert.',
  '',
  'That is the line.',
  '',
  'Do not let the raccoon drive the forklift.',
  'Do not let the goblin own the schema.',
  'Do not let the moth write the deployment checklist.',
  '',
  'The creature layer is decoration.',
  'The operational layer is the work.',
  '',
  'If this site stops saying what you actually do, fix it.',
  'If the terminal becomes more important than the message, cut it back.',
  'If the joke starts costing maintenance time, delete the joke.',
  '',
  'Good systems can have personality.',
  'Bad systems hide behind personality.',
  '',
  'RIDDLE:',
  'I am written by the past, read by the future, and ignored by the present until something breaks.',
  'What am I?',
  '',
  'POSSIBLE ANSWER:',
  'a note',
  '',
  'END MEMO',
];

export default function FutureSelfPage() {
  return (
    <HackerTerminalMemo
      eyebrow="future self"
      title="Future Self Memo"
      lines={lines}
      backHref="/"
      nextHref="/lab/memos/bean-protocol"
      nextLabel="bean protocol"
    />
  );
}