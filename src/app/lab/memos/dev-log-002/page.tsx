import type { Metadata } from 'next';
import HackerTerminalMemo from '@/components/HackerTerminalMemo';

export const metadata: Metadata = {
  title: 'Dev Log 002 | Logan Pinney Lab',
  description: 'A hidden public terminal dev log.',
  robots: {
    index: false,
    follow: false,
  },
};

const lines = [
  'DEV_LOG_002',
  'TITLE: MANUAL WORK HAS A SMELL',
  'STATUS: PUBLIC_BREADCRUMB',
  '',
  'Manual work has a smell.',
  '',
  'It smells like copy paste.',
  'It smells like three people checking the same spreadsheet.',
  'It smells like someone saying: just ping me if it breaks.',
  '',
  'That sentence is usually where the goblin lives.',
  '',
  'The goblin is not evil.',
  'The goblin is underfunded.',
  'The goblin was born because the business moved faster than the system.',
  'The goblin survived because everyone got used to stepping around it.',
  '',
  'Then one day the volume doubles.',
  'The event gets bigger.',
  'The spreadsheet gets wider.',
  'The handoff chain gets longer.',
  'The goblin becomes a department.',
  '',
  'That is when automation matters.',
  '',
  'Not fake automation.',
  'Not cosmetic automation.',
  'Not a button that saves six seconds while creating four new failure modes.',
  '',
  'Real automation means the system knows what good looks like.',
  'It knows what bad looks like.',
  'It knows when to stop.',
  'It knows who owns the next step.',
  'It leaves evidence.',
  '',
  'That last part matters.',
  '',
  'If a system fails silently, it is not automated.',
  'It is haunted.',
  '',
  'RIDDLE:',
  'I look like progress because I move fast.',
  'I become dangerous because nobody checks where I land.',
  'What am I?',
  '',
  'POSSIBLE ANSWER:',
  'automation without validation',
  '',
  'END LOG',
];

export default function DevLog002Page() {
  return (
    <HackerTerminalMemo
      eyebrow="dev log"
      title="Dev Log 002"
      lines={lines}
      backHref="/"
      nextHref="/lab/memos/dev-log-003"
      nextLabel="dev log 003"
    />
  );
}