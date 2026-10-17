import type { ComponentSlug } from './catalog';

/** Complete, copyable recipes for capabilities beyond the introductory preview. */
export const workflowExamples: Partial<Record<ComponentSlug, { title: string; code: string }>> = {
  button: {
    title: 'Use a router link',
    code: `'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/material/button';

export default function Example() {
  return <Button asChild primary raised><Link href="/projects">Projects</Link></Button>;
}`,
  },
};
