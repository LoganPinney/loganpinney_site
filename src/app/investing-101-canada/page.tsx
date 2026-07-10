import type { Metadata } from 'next'
import Investing101 from './Investing101'

export const metadata: Metadata = {
  title: 'Investing 101 Canada',
  description:
    'A plain-language educational planning tool for Canadians who are learning how investing works.',
}

export default function Investing101CanadaPage() {
  return <Investing101 />
}
