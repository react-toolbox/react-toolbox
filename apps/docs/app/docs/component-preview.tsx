'use client';

import { useState, type ReactNode } from 'react';
import { IconButton, Tab, Tabs, Tooltip } from 'react-toolbox';
import type { ComponentSlug } from './catalog';
import ComponentDemo from './component-demo';

const ResetButton = Tooltip(IconButton);

export default function ComponentPreview({ slug, code }: { slug: ComponentSlug; code: ReactNode }) {
  const [view, setView] = useState(0);
  const [reset, setReset] = useState(0);
  return (
    <div className="relative min-w-0">
      <Tabs
        index={view}
        onChange={setView}
        aria-label="Example view"
        theme={{
          navigationContainer: 'pr-12',
          label:
            'min-w-[72px] flex-1 text-center min-[600px]:min-w-[160px] min-[600px]:flex-none min-[600px]:text-[13px]',
          tab: 'overflow-visible px-0 pb-0 pt-4',
        }}
      >
        <Tab label="Preview">
          <div className="flex min-h-64 min-w-0 items-center justify-center rounded-toolbox border border-toolbox-divider bg-white p-4 sm:p-8">
            <ComponentDemo key={reset} slug={slug} />
          </div>
        </Tab>
        <Tab label="Code">{code}</Tab>
      </Tabs>
      {view === 0 && (
        <ResetButton
          icon="refresh"
          aria-label="Reset demo"
          tooltip="Reset demo"
          tooltipPosition="left"
          onClick={() => setReset((value) => value + 1)}
          className="absolute top-0 right-0"
        />
      )}
    </div>
  );
}
