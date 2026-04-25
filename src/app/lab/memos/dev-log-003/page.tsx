import type { Metadata } from 'next';
import HackerTerminalMemo from '@/components/HackerTerminalMemo';

export const metadata: Metadata = {
  title: 'Dev Log 003 | Logan Pinney Lab',
  description: 'A hidden public terminal dev log.',
  robots: {
    index: false,
    follow: false,
  },
};

const lines = [
  'DEV_LOG_003',
  'TITLE: THE MAP IS NOT THE TERRITORY',
  'STATUS: PUBLIC_BREADCRUMB',
  '',
  'A clean diagram can lie.',
  '',
  'A workflow map can look perfect while the real process is held together by memory, Slack messages, and one person who knows which column nobody is allowed to touch.',
  '',
  'That person is usually the load-bearing wall.',
  '',
  'Nobody planned it that way.',
  'It just happened.',
  '',
  'Someone made a sheet.',
  'Someone added a color rule.',
  'Someone added a status.',
  'Someone added a second tab because the first tab got scary.',
  'Someone built a workaround for the workaround.',
  '',
  'Then the workaround became tradition.',
  '',
  'This is how operational systems become folklore.',
  '',
  'The fix is not to insult the old system.',
  'The old system probably carried the business longer than it should have.',
  '',
  'The fix is to respect what it was trying to do, then replace the fragile parts with structure.',
  '',
  'Names.',
  'States.',
  'Rules.',
  'Logs.',
  'Ownership.',
  'A real path for failure.',
  '',
  'A system should not need a campfire story to explain how it works.',
  '',
  'RIDDLE:',
  'I am trusted because I have always been there.',
  'I am dangerous because nobody remembers who made me.',
  'I am copied forward until I become policy.',
  'What am I?',
  '',
  'POSSIBLE ANSWER:',
  'the old spreadsheet',
  '',
  'END LOG',
];

export default function DevLog003Page() {
  return (
    <HackerTerminalMemo
      eyebrow="dev log"
      title="Dev Log 003"
      lines={lines}
      backHref="/"
      nextHref="/"
      nextLabel="main system"
    />
  );
}