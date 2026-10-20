import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import {
  Button,
  Checkbox,
  Input,
  DatePicker,
  RadioButton,
  Switch,
  TabsRoot,
  TabsList,
  TabsTrigger,
  TabsContent,
  ThemeProvider,
  useTooltip,
} from '../src';
import { cn } from '../src/material/foundations/styles/cn';

describe('Material Tailwind classes', () => {
  it('keeps named text sizes independent of colors and lets consumer sizes win', () => {
    expect(cn('text-toolbox-small', 'text-toolbox-primary')).toBe('text-toolbox-small text-toolbox-primary');
    expect(cn('text-toolbox-title text-toolbox-primary', 'text-[17px] text-toolbox-accent')).toBe(
      'text-[17px] text-toolbox-accent',
    );
    expect(cn('text-xl text-toolbox-primary', 'text-toolbox-title')).toBe('text-toolbox-primary text-toolbox-title');
  });
});

describe('component styling', () => {
  it.each([
    ['checkbox', Checkbox],
    ['radio', RadioButton],
    ['switch', Switch],
  ] as const)(
    'applies %s styles and classes to its root while keeping native form props on its input',
    (role, Control) => {
      const { container } = render(
        <form>
          <Control
            label="Alerts"
            className="alerts-control"
            style={{ marginTop: 12 }}
            name="alerts"
            value="enabled"
            defaultChecked
            required
          />
        </form>,
      );
      const input = screen.getByRole(role, { name: 'Alerts' });
      const label = input.closest('label');
      expect(label).toHaveClass('alerts-control');
      expect(label).toHaveStyle({ marginTop: '12px' });
      expect(input).not.toHaveClass('alerts-control');
      expect(input.style.marginTop).toBe('');
      expect(input).toBeRequired();
      expect(new FormData(container.querySelector('form')!).get('alerts')).toBe('enabled');
    },
  );

  it('keeps local classes and scoped design tokens on composite fields', () => {
    const { container } = render(
      <ThemeProvider variables={{ '--rt-color-primary': '#00695c' }}>
        <Input label="Name" className="name-field" />
        <DatePicker label="Date" inputClassName="date-field" />
      </ThemeProvider>,
    );
    expect(screen.getByLabelText('Name').closest('[data-react-toolbox="input"]')).toHaveClass('name-field');
    expect(screen.getByLabelText('Date').closest('[data-react-toolbox="input"]')).toHaveClass('date-field');
    expect(container.querySelector('[data-react-toolbox-theme]')).toHaveStyle('--rt-color-primary: #00695c');
  });

  it('customizes a tab trigger and panel independently through explicit parts', () => {
    render(
      <TabsRoot defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview" className="h-16">
            Overview
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="p-8">
          Workspace details
        </TabsContent>
      </TabsRoot>,
    );
    expect(screen.getByRole('tab', { name: 'Overview' })).toHaveClass('h-16');
    expect(screen.getByRole('tabpanel', { name: 'Overview' })).toHaveClass('p-8');
  });

  it('keeps tooltip surface classes independent of the trigger', () => {
    function Hint() {
      const behavior = useTooltip({ tooltip: 'Helpful', className: 'hint-surface h-16' });
      return (
        <>
          <Button {...behavior.triggerProps} className="trigger">
            Help
          </Button>
          {behavior.tooltip}
        </>
      );
    }
    render(<Hint />);
    const button = screen.getByRole('button', { name: 'Help' });
    fireEvent.focus(button);
    expect(button).toHaveClass('trigger');
    expect(button).not.toHaveClass('hint-surface');
    expect(screen.getByRole('tooltip')).toHaveClass('hint-surface', 'h-16');
  });
});
