import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import HackerTerminalMemo from '@/components/HackerTerminalMemo';
import terminalFiles from '../../../../../public/terminal/manifest.json';

type TerminalFile = {
  name: string;
  path: string;
  hidden?: boolean;
};

type MemoPageProps = {
  params: Promise<{
    memo: string;
  }>;
};

const hiddenFiles = (terminalFiles as TerminalFile[]).filter(
  (file) => file.hidden
);

function fileNameToMemoSlug(fileName: string) {
  return fileName.replace(/^\./, '').replace(/\.txt$/, '');
}

function titleFromSlug(slug: string) {
  return slug
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function findMemoFile(slug: string) {
  return hiddenFiles.find((file) => fileNameToMemoSlug(file.name) === slug);
}

export async function generateStaticParams() {
  return hiddenFiles.map((file) => ({
    memo: fileNameToMemoSlug(file.name),
  }));
}

export async function generateMetadata({
  params,
}: MemoPageProps): Promise<Metadata> {
  const { memo } = await params;
  const file = findMemoFile(memo);
  const title = titleFromSlug(memo);

  if (!file) {
    return {
      title: 'Terminal Memo | Logan Pinney Lab',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: `${title} | Logan Pinney Lab`,
    description: `Hidden terminal archive memo: ${file.name}`,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function TerminalArchiveMemoPage({
  params,
}: MemoPageProps) {
  const { memo } = await params;
  const file = findMemoFile(memo);

  if (!file) {
    notFound();
  }

  const filePath = path.join(
    process.cwd(),
    'public',
    file.path.replace(/^\//, '')
  );
  const text = await readFile(filePath, 'utf8');
  const lines = text.replace(/\r\n/g, '\n').split('\n');

  return (
    <HackerTerminalMemo
      eyebrow="terminal archive"
      title={titleFromSlug(memo)}
      lines={lines}
      backHref="/"
    />
  );
}
