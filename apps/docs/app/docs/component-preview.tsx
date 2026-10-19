'use client';

import { useState, type ReactNode } from 'react';
import { IconButton, TabsContent, TabsIndicator, TabsList, TabsRoot, TabsTrigger, Tooltip } from 'react-toolbox';
import type { ComponentSlug } from './catalog';
import ComponentDemo from './component-demo';

const ResetButton = Tooltip(IconButton);

export default function ComponentPreview({ slug, code }: { slug: ComponentSlug; code: ReactNode }) {
  const [view, setView] = useState('preview');
  const [reset, setReset] = useState(0);
  return (
    <TabsRoot value={view} onValueChange={setView} className="min-w-0">
      <div className="flex items-center border-b border-toolbox-divider">
        <TabsList aria-label="Example view" className="min-w-0 flex-1 border-b-0">
          <TabsTrigger value="preview" className="flex-1 min-[600px]:flex-none min-[600px]:text-[13px]">
            Preview
          </TabsTrigger>
          <TabsTrigger value="code" className="flex-1 min-[600px]:flex-none min-[600px]:text-[13px]">
            Code
          </TabsTrigger>
          <TabsIndicator />
        </TabsList>
        <ResetButton
          icon="refresh"
          aria-label="Reset demo"
          tooltip="Reset demo"
          tooltipPosition="left"
          onClick={() => {
            setReset((value) => value + 1);
            setView('preview');
          }}
          className="shrink-0"
        />
      </div>
      <TabsContent value="preview" className="overflow-visible px-0 pb-0 pt-4">
        <div className="flex min-h-64 min-w-0 items-center justify-center rounded-toolbox border border-toolbox-divider bg-white p-4 @min-[600px]/article:p-6">
          <ComponentDemo key={reset} slug={slug} />
        </div>
      </TabsContent>
      <TabsContent value="code" className="overflow-visible px-0 pb-0 pt-4">{code}</TabsContent>
    </TabsRoot>
  );
}
