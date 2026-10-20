import { createRef, useState } from 'react';
import {
  AccordionRoot,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionPanel,
  Divider,
  type AccordionRootProps,
  type DividerProps,
} from '../../src';

export function ExpansionPanelTypes() {
  const [value, setValue] = useState<number[]>([1]);
  const trigger = createRef<HTMLElement>();
  const panel = createRef<HTMLDivElement>();
  const divider = createRef<HTMLHRElement>();
  const rootProps: AccordionRootProps<number> = { value, onValueChange: setValue, multiple: true };
  const dividerProps: DividerProps = { orientation: 'vertical', decorative: true };
  return (
    <AccordionRoot {...rootProps} className={(state) => (state.disabled ? 'opacity-50' : '')}>
      <AccordionItem value={1}>
        <AccordionHeader render={<h2 />}>
          <AccordionTrigger ref={trigger}>Details</AccordionTrigger>
        </AccordionHeader>
        <AccordionPanel ref={panel} keepMounted>
          Content <Divider ref={divider} {...dividerProps} />
        </AccordionPanel>
      </AccordionItem>
    </AccordionRoot>
  );
}
