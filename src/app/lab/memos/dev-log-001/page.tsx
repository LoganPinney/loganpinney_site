import type { Metadata } from 'next';
import HackerTerminalMemo from '@/components/HackerTerminalMemo';

export const metadata: Metadata = {
  title: 'Dev Log 001 | Logan Pinney Lab',
  description: 'A hidden public terminal dev log.',
  robots: {
    index: false,
    follow: false,
  },
};

const lines = [
  'DEV_LOG_001',
  'TITLE: THE SURFACE IS NOT THE SYSTEM',
  'STATUS: PUBLIC_BREADCRUMB',
  '',
  'A website is never just a website.',
  '',
  'It is a sorting machine.',
  'It tells people what kind of work you do before they ask.',
  'It tells the wrong people to keep moving.',
  'It tells the right people there might be something useful here.',
  '',
  'The visible layer has to be clean.',
  'The visible layer has to be serious.',
  'The visible layer has to say: I rebuild broken operational systems.',
  '',
  'But the hidden layer can tell the truth in a different voice.',
  '',
  'The truth is that systems are strange.',
  'They rot quietly.',
  'They collect exceptions.',
  'They hide manual labor inside polite language.',
  'They ask people to remember things software should have enforced.',
  '',
  'That is where the work starts.',
  '',
  'Not with a new tool.',
  'Not with another dashboard.',
  'Not with another meeting where everyone agrees the process is bad and then returns to the same process.',
  '',
  'The work starts underneath.',
  '',
  'Schema.',
  'Validation.',
  'Ownership.',
  'Permissions.',
  'Failure states.',
  'The boring bones.',
  '',
  'Most people want the button.',
  'The button is not the system.',
  '',
  'RIDDLE:',
  'I am invisible when I work.',
  'I am blamed when I fail.',
  'I live below the button.',
  'What am I?',
  '',
  'POSSIBLE ANSWER:',
  'infrastructure',
  '',
  'END LOG',
];

export default function DevLog001Page() {
  return (
    <HackerTerminalMemo
      eyebrow="dev log"
      title="Dev Log 001"
      lines={lines}
      backHref="/"
      nextHref="/lab/memos/dev-log-002"
      nextLabel="dev log 002"
    />
  );
}