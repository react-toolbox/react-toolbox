import { createRef, useState } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import {
  AccordionRoot,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionPanel,
} from '../src/material/accordion';

function Items({ keepMounted }: { keepMounted?: boolean } = {}) {
  return (
    <>
      <AccordionItem value="details">
        <AccordionHeader>
          <AccordionTrigger>Project details</AccordionTrigger>
        </AccordionHeader>
        <AccordionPanel keepMounted={keepMounted}>
          <input aria-label="Project name" defaultValue="Weekend notes" />
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem value="unavailable" disabled>
        <AccordionHeader>
          <AccordionTrigger>Unavailable</AccordionTrigger>
        </AccordionHeader>
        <AccordionPanel>Not available yet</AccordionPanel>
      </AccordionItem>
      <AccordionItem value="sharing">
        <AccordionHeader>
          <AccordionTrigger>Sharing</AccordionTrigger>
        </AccordionHeader>
        <AccordionPanel>Invite your team</AccordionPanel>
      </AccordionItem>
    </>
  );
}

describe('Accordion', () => {
  it('labels its panels and headings, toggles with Enter and Space, and skips disabled triggers with Tab', async () => {
    const user = userEvent.setup();
    render(
      <AccordionRoot>
        <Items />
      </AccordionRoot>,
    );
    const details = screen.getByRole('button', { name: 'Project details' });
    expect(screen.getByRole('heading', { name: 'Project details', level: 3 })).toContainElement(details);
    expect(details).toHaveAttribute('aria-expanded', 'false');
    expect(details).not.toHaveAttribute('data-panel-open');
    expect(details).toHaveClass('min-h-[48px]', 'data-panel-open:min-h-[64px]');
    expect(screen.queryByRole('region')).not.toBeInTheDocument();
    await user.tab();
    expect(details).toHaveFocus();
    await user.keyboard('{Enter}');
    const panel = screen.getByRole('region', { name: 'Project details' });
    expect(details).toHaveAttribute('data-panel-open');
    expect(details).toHaveAttribute('aria-controls', panel.id);
    expect(panel).toHaveAttribute('aria-labelledby', details.id);
    await user.keyboard(' ');
    await waitFor(() => expect(screen.queryByRole('region')).not.toBeInTheDocument());
    expect(details).toHaveFocus();
    await user.tab();
    expect(screen.getByRole('button', { name: 'Sharing' })).toHaveFocus();
    await user.click(screen.getByRole('button', { name: 'Unavailable' }));
    expect(screen.getByRole('button', { name: 'Unavailable' })).toBeDisabled();
    expect(screen.queryByText('Not available yet')).not.toBeInTheDocument();
  });

  it('supports uncontrolled single and multiple expansion', async () => {
    const user = userEvent.setup();
    const { rerender } = render(
      <AccordionRoot defaultValue={['details']}>
        <Items />
      </AccordionRoot>,
    );
    await user.click(screen.getByRole('button', { name: 'Sharing' }));
    await waitFor(() => expect(screen.queryByRole('region', { name: 'Project details' })).not.toBeInTheDocument());
    expect(screen.getByRole('region', { name: 'Sharing' })).toBeVisible();
    rerender(
      <AccordionRoot multiple>
        <Items />
      </AccordionRoot>,
    );
    await user.click(screen.getByRole('button', { name: 'Project details' }));
    expect(screen.getAllByRole('region')).toHaveLength(2);
    await user.click(screen.getByRole('button', { name: 'Sharing' }));
    await waitFor(() => expect(screen.queryByRole('region', { name: 'Sharing' })).not.toBeInTheDocument());
    expect(screen.getByRole('region', { name: 'Project details' })).toBeVisible();
  });

  it('reports controlled changes without mutating the supplied value', async () => {
    const change = vi.fn();
    const { rerender } = render(
      <AccordionRoot value={['details']} onValueChange={change}>
        <Items />
      </AccordionRoot>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Sharing' }));
    expect(change).toHaveBeenCalledWith(['sharing'], expect.objectContaining({ reason: 'trigger-press' }));
    expect(screen.getByRole('button', { name: 'Project details' })).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('button', { name: 'Sharing' })).toHaveAttribute('aria-expanded', 'false');
    rerender(
      <AccordionRoot value={['sharing']} onValueChange={change}>
        <Items />
      </AccordionRoot>,
    );
    expect(screen.getByRole('region', { name: 'Sharing' })).toBeVisible();
  });

  it('supports a controlled state owner and root-level disabling', async () => {
    function Example({ disabled = false }: { disabled?: boolean }) {
      const [value, setValue] = useState<string[]>([]);
      return (
        <AccordionRoot value={value} onValueChange={setValue} disabled={disabled}>
          <Items />
        </AccordionRoot>
      );
    }
    const { rerender } = render(<Example />);
    await userEvent.click(screen.getByRole('button', { name: 'Sharing' }));
    expect(screen.getByRole('region', { name: 'Sharing' })).toBeVisible();
    rerender(<Example disabled />);
    for (const trigger of screen.getAllByRole('button')) expect(trigger).toBeDisabled();
    await userEvent.click(screen.getByRole('button', { name: 'Sharing' }));
    expect(screen.getByRole('button', { name: 'Sharing' })).toHaveAttribute('aria-expanded', 'true');
  });

  it.each(['root', 'panel'] as const)('preserves form state with %s keepMounted without submitting', async (owner) => {
    const submit = vi.fn((event) => event.preventDefault());
    const user = userEvent.setup();
    render(
      <form onSubmit={submit}>
        <AccordionRoot keepMounted={owner === 'root'}>
          <Items keepMounted={owner === 'panel' ? true : undefined} />
        </AccordionRoot>
      </form>,
    );
    const trigger = screen.getByRole('button', { name: 'Project details' });
    expect(trigger).toHaveAttribute('type', 'button');
    await user.click(trigger);
    await user.clear(screen.getByRole('textbox', { name: 'Project name' }));
    await user.type(screen.getByRole('textbox', { name: 'Project name' }), 'Updated notes');
    await user.click(trigger);
    await waitFor(() => expect(screen.queryByRole('textbox')).not.toBeInTheDocument());
    expect(screen.getByDisplayValue('Updated notes')).toBeInTheDocument();
    await user.tab();
    expect(screen.getByRole('button', { name: 'Sharing' })).toHaveFocus();
    await user.click(trigger);
    expect(screen.getByRole('textbox', { name: 'Project name' })).toHaveValue('Updated notes');
    expect(submit).not.toHaveBeenCalled();
  });

  it('unmounts closed content by default', async () => {
    const user = userEvent.setup();
    render(
      <AccordionRoot defaultValue={['details']}>
        <Items />
      </AccordionRoot>,
    );
    const input = screen.getByRole('textbox', { name: 'Project name' });
    await user.click(screen.getByRole('button', { name: 'Project details' }));
    await waitFor(() => expect(input).not.toBeInTheDocument());
  });

  it('allows the state owner to cancel an expansion request', async () => {
    render(
      <AccordionRoot onValueChange={(_, details) => details.cancel()}>
        <Items />
      </AccordionRoot>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Project details' }));
    expect(screen.getByRole('button', { name: 'Project details' })).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('region')).not.toBeInTheDocument();
  });

  it('forwards refs, heading render, IDs, state-aware styles, and part classes', () => {
    const rootRef = createRef<HTMLDivElement>();
    const itemRef = createRef<HTMLDivElement>();
    const headerRef = createRef<HTMLHeadingElement>();
    const triggerRef = createRef<HTMLElement>();
    const panelRef = createRef<HTMLDivElement>();
    render(
      <AccordionRoot ref={rootRef} defaultValue={['details']}>
        <AccordionItem ref={itemRef} value="details" className={(state) => (state.open ? 'bg-red-500' : '')}>
          <AccordionHeader ref={headerRef} render={<h2 />}>
            <AccordionTrigger ref={triggerRef} id="details-trigger" className="px-2" style={{ color: 'red' }}>
              Project details
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionPanel ref={panelRef} id="details-panel" className={(state) => (state.open ? 'px-3' : '')}>
            Details
          </AccordionPanel>
        </AccordionItem>
      </AccordionRoot>,
    );
    const trigger = screen.getByRole('button', { name: 'Project details' });
    expect(screen.getByRole('heading', { level: 2 })).toContainElement(trigger);
    expect(rootRef.current).toBe(trigger.closest('[data-slot="AccordionRoot"]'));
    expect(itemRef.current).toBe(trigger.closest('[data-slot="AccordionItem"]'));
    expect(headerRef.current).toBe(screen.getByRole('heading', { level: 2 }));
    expect(triggerRef.current).toBe(trigger);
    expect(panelRef.current).toBe(screen.getByRole('region', { name: 'Project details' }));
    expect(trigger).toHaveAttribute('aria-controls', 'details-panel');
    expect(panelRef.current).toHaveAttribute('aria-labelledby', 'details-trigger');
    expect(trigger).toHaveClass('px-2');
    expect(trigger).not.toHaveClass('px-[24px]');
    expect(trigger).toHaveStyle({ color: 'rgb(255, 0, 0)' });
    expect(panelRef.current).toHaveClass('px-3');
    expect(panelRef.current).not.toHaveClass('px-[24px]');
    expect(trigger.closest('[data-slot="AccordionItem"]')).toHaveClass('bg-red-500');
    expect(trigger.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
  });
});
