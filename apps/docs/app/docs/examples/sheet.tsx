'use client';

import { useId, useState } from 'react';
import { Button } from 'react-toolbox/button';
import {
  SheetRoot,
  SheetTrigger,
  SheetPortal,
  SheetOverlay,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetClose,
  SheetHandle,
} from 'react-toolbox/sheet';

export default function SheetExample() {
  const contentId = useId();
  const [snapPoint, setSnapPoint] = useState<number | string | null>(0.5);
  const expanded = snapPoint === 0.9;
  return (
    <SheetRoot snapPoints={[0.5, 0.9]} activeSnapPoint={snapPoint} setActiveSnapPoint={setSnapPoint}>
      <SheetTrigger asChild>
        <Button primary raised>
          Open visit notes
        </Button>
      </SheetTrigger>
      <SheetPortal>
        <SheetOverlay />
        <SheetContent id={contentId}>
          <SheetHandle />
          <div className="mx-auto w-full max-w-xl p-6">
            <SheetTitle>Visit notes</SheetTitle>
            <SheetDescription>
              Drag the handle or use the resize button to switch between two sheet sizes.
            </SheetDescription>
            <p className="my-6 text-toolbox-body">Bring a notebook, a camera, and the latest survey map.</p>
            <Button
              primary
              aria-controls={contentId}
              aria-expanded={expanded}
              onClick={() => setSnapPoint(expanded ? 0.5 : 0.9)}
            >
              {expanded ? 'Reduce notes' : 'Expand notes'}
            </Button>
            <SheetClose asChild>
              <Button primary>Done</Button>
            </SheetClose>
          </div>
        </SheetContent>
      </SheetPortal>
    </SheetRoot>
  );
}
