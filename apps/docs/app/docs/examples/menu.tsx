'use client';
import { useState } from 'react';
import { Button } from 'react-toolbox/button';
import { FontIcon } from 'react-toolbox/font-icon';
import {
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuItemIndicator,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
} from 'react-toolbox/menu';

export default function MenuComposition() {
  const [toolbar, setToolbar] = useState(true);
  const [density, setDensity] = useState('comfortable');
  const [action, setAction] = useState('No action yet');
  return (
    <div className="space-y-4">
      <DropdownMenuRoot>
        <DropdownMenuTrigger asChild>
          <Button raised primary>
            Project actions
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuPortal>
          <DropdownMenuContent className="min-w-56">
            <DropdownMenuItem onSelect={() => setAction('Renamed')}>Rename</DropdownMenuItem>
            <DropdownMenuCheckboxItem
              checked={toolbar}
              onCheckedChange={setToolbar}
              onSelect={(event) => event.preventDefault()}
            >
              <span className="size-6">
                <DropdownMenuItemIndicator>
                  <FontIcon value="check" aria-hidden />
                </DropdownMenuItemIndicator>
              </span>
              Show toolbar
            </DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                Density <FontIcon value="chevron_right" aria-hidden className="ml-auto" />
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuLabel>Row spacing</DropdownMenuLabel>
                  <DropdownMenuRadioGroup value={density} onValueChange={setDensity}>
                    <DropdownMenuRadioItem value="comfortable">
                      <DropdownMenuItemIndicator>
                        <FontIcon value="check" aria-hidden />
                      </DropdownMenuItemIndicator>
                      Comfortable
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="compact">
                      <DropdownMenuItemIndicator>
                        <FontIcon value="check" aria-hidden />
                      </DropdownMenuItemIndicator>
                      Compact
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuItem disabled>Delete project</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenuRoot>
      <output className="block text-toolbox-body">
        {action}; {density}; toolbar {toolbar ? 'shown' : 'hidden'}
      </output>
    </div>
  );
}
