'use client';
import { Button } from 'react-toolbox/button';
import { TooltipProvider, TooltipRoot, TooltipTrigger, TooltipPortal, TooltipContent } from 'react-toolbox/tooltip';

export default function TooltipComposition() {
  return (
    <TooltipProvider delayDuration={300} skipDelayDuration={800}>
      <div className="flex flex-wrap gap-4">
        <TooltipRoot>
          <TooltipTrigger asChild>
            <Button>Archive</Button>
          </TooltipTrigger>
          <TooltipPortal>
            <TooltipContent>Move this project to the archive</TooltipContent>
          </TooltipPortal>
        </TooltipRoot>
        <TooltipRoot>
          <TooltipTrigger asChild>
            <Button>Duplicate</Button>
          </TooltipTrigger>
          <TooltipPortal>
            <TooltipContent>Create a copy of this project</TooltipContent>
          </TooltipPortal>
        </TooltipRoot>
      </div>
    </TooltipProvider>
  );
}
