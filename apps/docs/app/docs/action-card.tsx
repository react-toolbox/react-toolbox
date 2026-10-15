'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { Card, useRipple } from 'react-toolbox';

export default function ActionCard({ href, children }: { href: string; children: ReactNode }) {
  const ink = useRipple();
  return (
    <Link
      href={href}
      onMouseDown={ink.onMouseDown}
      onTouchStart={ink.onTouchStart}
      onTouchEnd={ink.onTouchEnd}
      onTouchCancel={ink.onTouchCancel}
      className="group block rounded-toolbox focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-toolbox-primary"
    >
      <Card className="relative h-full">
        {children}
        {ink.ripple}
      </Card>
    </Link>
  );
}
