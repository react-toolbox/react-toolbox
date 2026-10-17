import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import {
  AppBar,
  Button,
  DatePicker,
  Input,
  Layout,
  RadioButton,
  RadioGroup,
  Tab,
  TabContent,
  Tabs,
  ThemeProvider,
  tooltipFactory,
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

describe('classNames style slots', () => {
  it('preserves structural classes and consumes classNames before the DOM', () => {
    render(<Button label="Save" icon="save" classNames={{ button: 'h-16 current', icon: 'custom-icon' }} />);
    const button = screen.getByRole('button', { name: /Save/ });
    expect(button).toHaveClass('rt-button-button', 'h-16', 'current');
    expect(button).not.toHaveClass('h-(--button-height)');
    expect(button).not.toHaveAttribute('classnames');
    expect(button.querySelector('[data-react-toolbox="font-icon"]')).toHaveClass('custom-icon');
  });

  it('composes layout slots with app-bar overrides', () => {
    render(
      <Layout classNames={{ appbarAppBar: 'layout-slot h-12' }}>
        <AppBar title="Workspace" classNames={{ appBar: 'app-bar-slot h-16' }} />
      </Layout>,
    );
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('rt-app-bar-appBar', 'rt-layout-appbarAppBar', 'layout-slot', 'app-bar-slot', 'h-16');
    expect(header).not.toHaveClass('h-12');
  });

  it('composes radio-group slots through wrappers with individual radio overrides', () => {
    render(
      <RadioGroup classNames={{ field: 'group-slot h-12' }}>
        <div>
          <RadioButton label="Daily" classNames={{ field: 'radio-slot h-16' }} />
        </div>
      </RadioGroup>,
    );
    const field = screen.getByRole('radio', { name: 'Daily' }).closest('label');
    expect(field).toHaveClass('group-slot', 'radio-slot', 'h-16');
    expect(field).not.toHaveClass('h-12');
  });

  it('passes field slots through composite pickers and keeps design tokens separate', () => {
    const { container } = render(
      <ThemeProvider variables={{ '--rt-color-primary': '#00695c' }}>
        <Input label="Name" classNames={{ label: 'custom-label' }} />
        <DatePicker label="Date" classNames={{ container: 'date-container', inputElement: 'date-field' }} />
      </ThemeProvider>,
    );
    expect(screen.getByText('Name')).toHaveClass('custom-label');
    expect(screen.getByLabelText('Date')).toHaveClass('date-field');
    expect(container.querySelector('[data-react-toolbox="date-picker"]')).toHaveClass('date-container');
    expect(container.querySelector('[data-react-toolbox-theme]')).toHaveStyle('--rt-color-primary: #00695c');
    expect(container.querySelector('[classnames]')).toBeNull();
  });

  it('composes tabs slots with individual tab and panel overrides', () => {
    render(
      <Tabs classNames={{ label: 'group-label h-12', tab: 'group-panel p-4' }}>
        <Tab label="Overview" classNames={{ label: 'tab-label h-16' }} />
        <TabContent classNames={{ tab: 'tab-panel p-8' }}>Workspace details</TabContent>
      </Tabs>,
    );
    const tab = screen.getByRole('tab', { name: 'Overview' });
    const panel = screen.getByRole('tabpanel', { name: 'Overview' });
    expect(tab).toHaveClass('group-label', 'tab-label', 'h-16');
    expect(tab).not.toHaveClass('h-12');
    expect(panel).toHaveClass('group-panel', 'tab-panel', 'p-8');
    expect(panel).not.toHaveClass('p-4');
  });

  it('merges factory and instance tooltip slots without forwarding them to a native trigger', () => {
    const Hint = tooltipFactory({ classNames: { tooltipInner: 'factory-slot h-12' } })('button');
    const { container } = render(
      <Hint tooltip="Helpful" classNames={{ tooltipInner: 'instance-slot h-16' }}>
        Help
      </Hint>,
    );
    fireEvent.focus(screen.getByRole('button'));
    expect(screen.getByText('Helpful')).toHaveClass('factory-slot', 'instance-slot', 'h-16');
    expect(screen.getByText('Helpful')).not.toHaveClass('h-12');
    expect(container.querySelector('[classnames]')).toBeNull();
  });

  it('passes instance slots to a wrapped component while composing tooltip slots', () => {
    const Hint = tooltipFactory({ classNames: { tooltipInner: 'factory-slot' } })(Button);
    render(
      <Hint tooltip="Helpful" classNames={{ button: 'trigger-slot', tooltipInner: 'instance-slot' }}>
        Help
      </Hint>,
    );
    const button = screen.getByRole('button', { name: 'Help' });
    expect(button).toHaveClass('trigger-slot');
    fireEvent.focus(button);
    expect(screen.getByText('Helpful')).toHaveClass('factory-slot', 'instance-slot');
    expect(button).not.toHaveAttribute('classnames');
  });
});
