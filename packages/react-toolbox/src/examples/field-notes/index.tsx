'use client';

import './styles.css';

import { useId, useState } from 'react';
import { ThemeProvider } from '../../material/theme';
import { AppBar } from '../../material/app-bar';
import { Avatar } from '../../material/avatar';
import { Button, IconButton } from '../../material/button';
import { Card, CardTitle, CardText, CardActions } from '../../material/card';
import { Checkbox } from '../../material/checkbox';
import { DatePicker } from '../../material/date-picker';
import {
  DialogRoot,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogBody,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '../../material/dialog';
import {
  DrawerRoot,
  DrawerTrigger,
  DrawerPortal,
  DrawerContent,
  DrawerTitle,
  DrawerClose,
} from '../../material/drawer';
import { Dropdown } from '../../material/dropdown';
import { Input } from '../../material/input';
import {
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuContent,
  DropdownMenuItem,
} from '../../material/menu';
import { ProgressBar } from '../../material/progress-bar';
import { SliderRoot, SliderTrack, SliderRange, SliderThumb } from '../../material/slider';
import { Snackbar } from '../../material/snackbar';
import { Switch } from '../../material/switch';
import { TableRoot, TableHeader, TableBody, TableRow, TableCell } from '../../material/table';
import { TimePicker } from '../../material/time-picker';
import { TooltipRoot, TooltipTrigger, TooltipPortal, TooltipContent } from '../../material/tooltip';
import { fieldNotesTheme, fieldNotesNightTheme } from './theme';

export { fieldNotesTheme, fieldNotesNightTheme } from './theme';
export interface FieldNotesProps {
  appearance?: 'material' | 'field-notes' | 'night';
}

/** An editable distribution: brand tokens, native forms and composable overlays. */
export function FieldNotes({ appearance = 'field-notes' }: FieldNotesProps) {
  const id = useId();
  const [viewport, setViewport] = useState<HTMLDivElement | null>(null);
  const [notifications, setNotifications] = useState(true);
  const [offline, setOffline] = useState(true);
  const [name, setName] = useState('Coastal survey');
  const [date, setDate] = useState(new Date(2026, 9, 20));
  const [time, setTime] = useState(new Date(2026, 9, 20, 9, 30));
  const [region, setRegion] = useState('North coast');
  const [message, setMessage] = useState<string>();
  return (
    <DrawerRoot modal={false}>
      <ThemeProvider
        variables={appearance === 'material' ? {} : appearance === 'night' ? fieldNotesNightTheme : fieldNotesTheme}
        className="overflow-hidden rounded-[2px] border border-toolbox-divider bg-toolbox-background text-toolbox-text"
      >
        <div ref={setViewport} data-field-notes-viewport="" className="@container/field-notes relative isolate">
          <AppBar
            title={
              <>
                <DrawerTrigger asChild>
                  <IconButton
                    inverse
                    icon="menu"
                    aria-label="Open field navigation"
                    className="shrink-0 ms-[calc((var(--button-toggle-font-size)-var(--button-toggle-size))/2)] me-[calc(var(--appbar-title-distance)-(var(--button-toggle-size)+var(--button-toggle-font-size))/2)]"
                  />
                </DrawerTrigger>
                <h1 className="m-0 grow truncate text-(length:--appbar-title-font-size) font-(--appbar-title-font-weight)">
                  Field Notes
                </h1>
              </>
            }
          >
            <TooltipRoot>
              <TooltipTrigger asChild>
                <IconButton inverse icon="help_outline" aria-label="About this workspace" className="shrink-0" />
              </TooltipTrigger>
              <TooltipPortal>
                <TooltipContent>Plan a field visit and share observations.</TooltipContent>
              </TooltipPortal>
            </TooltipRoot>
            <Avatar className="size-8! text-sm! bg-toolbox-primary-contrast text-toolbox-primary" title="Alex Morgan">
              AM
            </Avatar>
          </AppBar>
          <div className="grid gap-6 p-4 @min-[600px]/field-notes:p-6 @min-[720px]/field-notes:grid-cols-[minmax(0,2fr)_minmax(240px,1fr)]">
            <Card>
              <CardTitle title="Coastal survey" subtitle="North coast · October 2026" heading="h3" />
              <CardText>
                <p>Record shoreline habitats, compare observations, and plan the next visit.</p>
                <div className="mt-6 flex items-center justify-between gap-4">
                  <span>12 of 18 observations reviewed</span>
                  <DropdownMenuRoot>
                    <DropdownMenuTrigger asChild>
                      <IconButton icon="more_vert" aria-label="Survey actions" className="shrink-0" />
                    </DropdownMenuTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onSelect={() => setMessage('Survey link copied to your notes')}>
                          Save survey link
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => setMessage('Survey archived')}>
                          Archive survey
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenuPortal>
                  </DropdownMenuRoot>
                </div>
                <ProgressBar aria-label="Reviewed observations" mode="determinate" value={12} max={18} />
              </CardText>
              <div className="overflow-x-auto">
                <TableRoot aria-label="Recent observations">
                  <TableHeader>
                    <TableRow>
                      <TableCell>Site</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell numeric>Records</TableCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Salt marsh</TableCell>
                      <TableCell>Reviewed</TableCell>
                      <TableCell numeric>8</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Sand dunes</TableCell>
                      <TableCell>In progress</TableCell>
                      <TableCell numeric>4</TableCell>
                    </TableRow>
                  </TableBody>
                </TableRoot>
              </div>
              <CardActions className="justify-end">
                <DialogRoot>
                  <DialogTrigger asChild>
                    <Button primary>Plan a visit</Button>
                  </DialogTrigger>
                  <DialogPortal>
                    <DialogOverlay />
                    <DialogContent>
                      <DialogBody>
                        <DialogTitle>Plan a visit</DialogTitle>
                        <DialogDescription>Choose when and where your team will meet.</DialogDescription>
                        <Input label="Visit name" name="visit" value={name} onChange={setName} />
                        <Dropdown
                          label="Region"
                          source={['North coast', 'River valley', 'Woodland']}
                          value={region}
                          onChange={(value) => setRegion(String(value))}
                        />
                        <DatePicker label="Date" value={date} onChange={setDate} />
                        <TimePicker label="Meeting time" value={time} onChange={setTime} />
                      </DialogBody>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button>Cancel</Button>
                        </DialogClose>
                        <DialogClose asChild>
                          <Button primary onClick={() => setMessage('Visit planned')}>
                            Save visit
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </DialogPortal>
                </DialogRoot>
              </CardActions>
            </Card>
            <Card>
              <CardTitle title="Field preferences" heading="h3" />
              <CardText>
                <Switch label="Visit reminders" checked={notifications} onChange={setNotifications} />
                <Checkbox label="Keep notes available offline" checked={offline} onChange={setOffline} />
                <p id={`${id}-range`} className="mt-6!">
                  Preferred temperature (°C)
                </p>
                <SliderRoot
                  defaultValue={[16, 26]}
                  min={0}
                  max={40}
                  minStepsBetweenThumbs={2}
                  aria-labelledby={`${id}-range`}
                >
                  <SliderTrack>
                    <SliderRange />
                  </SliderTrack>
                  <SliderThumb aria-label="Minimum temperature" />
                  <SliderThumb aria-label="Maximum temperature" />
                </SliderRoot>
              </CardText>
            </Card>
          </div>
          {viewport && (
            <DrawerPortal container={viewport}>
              <DrawerContent
                aria-describedby={undefined}
                className="absolute h-full max-w-[calc(100%-var(--standard-increment-mobile))]"
              >
                <nav aria-label="Field sections" className="flex flex-col p-4">
                  <DrawerTitle className="my-4">Field navigation</DrawerTitle>
                  {['Surveys', 'Observations', 'Team'].map((section) => (
                    <DrawerClose key={section} asChild>
                      <Button className="text-left" onClick={() => setMessage(`${section} selected`)}>
                        {section}
                      </Button>
                    </DrawerClose>
                  ))}
                  <DrawerClose asChild>
                    <Button primary>Close navigation</Button>
                  </DrawerClose>
                </nav>
              </DrawerContent>
            </DrawerPortal>
          )}
          <Snackbar
            active={Boolean(message)}
            label={message}
            timeout={4000}
            onTimeout={() => setMessage(undefined)}
            action="Dismiss"
            onClick={() => setMessage(undefined)}
          />
        </div>
      </ThemeProvider>
    </DrawerRoot>
  );
}
