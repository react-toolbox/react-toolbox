import { createRef, Fragment } from 'react';
import { cleanup, fireEvent, render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { List, ListItem, ListItemContent, ListCheckbox, ListDivider, ListItemAction, ListItemActions, ListSubHeader } from '../src/material/list';

describe('list defaults and ripple', () => {
  afterEach(cleanup);

  it('inherits list selection and ink while respecting explicit item overrides', () => {
    const { container } = render(<List selectable ripple>
      <ListItem caption="Inherited" />
      <ListItem caption="Explicit" selectable={false} ripple={false} />
      <ListItem><ListItemContent caption="Custom content" /></ListItem>
    </List>);
    const items = screen.getAllByRole('listitem');
    expect(items[0]?.firstChild).toHaveClass('rt-list-selectable');
    expect(items[1]?.firstChild).not.toHaveClass('rt-list-selectable');
    fireEvent.mouseDown(items[0]!, { button: 0 });
    expect(items[0]?.querySelector('[data-react-toolbox="ripple"]')).not.toBeNull();
    fireEvent.mouseDown(items[1]!, { button: 0 });
    expect(items[1]?.querySelector('[data-react-toolbox="ripple"]')).toBeNull();
    expect(container.querySelectorAll('.rt-list-itemContentRoot')).toHaveLength(3);
  });
});

describe('composed Material lists', () => {
  it('keeps wrapped secondary list actions independent and disables a custom primary action', async () => {
    const select = vi.fn();
    const archive = vi.fn();
    function ArchiveAction() {
      return (
        <button type="button" onClick={archive}>
          Archive
        </button>
      );
    }
    const { rerender } = render(
      <List>
        <ListItem caption="Task" onClick={select} rightActions={[<ArchiveAction key="archive" />]} />
      </List>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Archive' }));
    expect(archive).toHaveBeenCalledOnce();
    expect(select).not.toHaveBeenCalled();
    rerender(
      <List>
        <ListItem caption="Task" disabled primaryAction={<button type="button" onClick={select} />} />
      </List>,
    );
    expect(screen.getByRole('button', { name: 'Task' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Task' })).toHaveAttribute('tabindex', '-1');
  });

  it('renders ordinary children and gives primary and secondary actions independent keyboard behavior', async () => {
    const open = vi.fn();
    const remove = vi.fn();
    render(
      <List>
        <ListItem
          onClick={open}
          leftIcon="folder"
          rightActions={[
            <button key="remove" type="button" onClick={remove}>
              Remove
            </button>,
          ]}
        >
          Project files
        </ListItem>
      </List>,
    );
    const primary = screen.getByRole('button', { name: 'Project files' });
    expect(primary.querySelector('button')).toBeNull();
    primary.focus();
    await userEvent.keyboard('{Enter}');
    expect(open).toHaveBeenCalledOnce();
    await userEvent.click(screen.getByRole('button', { name: 'Remove' }));
    expect(remove).toHaveBeenCalledOnce();
    expect(open).toHaveBeenCalledOnce();
  });

  it('inherits defaults through wrappers and retains wrapped content', () => {
    function Row() {
      return (
        <ListItem>
          <Content />
        </ListItem>
      );
    }
    function Content() {
      return <ListItemContent caption="Wrapped row" />;
    }
    render(
      <List selectable ripple>
        <Fragment>
          <Row />
        </Fragment>
      </List>,
    );
    const row = screen.getByRole('listitem');
    expect(row.firstChild).toHaveClass('rt-list-selectable');
    expect(screen.getByText('Wrapped row')).toBeInTheDocument();
    fireEvent.mouseDown(row, { button: 0 });
    expect(row.querySelector('[data-react-toolbox="ripple"]')).not.toBeNull();
  });

  it('keeps direct list helpers valid while standalone helpers preserve their native elements', () => {
    const { rerender } = render(
      <List>
        <ListSubHeader caption="People" />
        <ListItem caption="Ada" />
        <ListDivider />
      </List>,
    );
    expect([...screen.getByRole('list').children].map((node) => node.tagName)).toEqual(['LI', 'LI', 'LI']);
    expect(screen.getByRole('heading', { name: 'People' })).toBeInTheDocument();
    expect(screen.getByRole('separator').tagName).toBe('HR');
    rerender(
      <>
        <ListSubHeader caption="People" />
        <ListDivider />
      </>,
    );
    expect(screen.getByRole('heading').parentElement?.tagName).not.toBe('LI');
    expect(screen.getByRole('separator').parentElement?.tagName).not.toBe('LI');
  });

  it('supports uncontrolled checkbox rows with form values, reset, required, and mixed state', async () => {
    render(
      <>
        <form id="preferences" aria-label="Preferences" />
        <List>
          <ListCheckbox
            caption="Offline"
            checkboxProps={{
              defaultChecked: true,
              name: 'offline',
              value: 'enabled',
              form: 'preferences',
              required: true,
              indeterminate: true,
            }}
          />
        </List>
      </>,
    );
    const checkbox = screen.getByRole('checkbox', { name: 'Offline' });
    const form = screen.getByRole('form', { name: 'Preferences' }) as HTMLFormElement;
    expect(checkbox).toBePartiallyChecked();
    expect(new FormData(form).get('offline')).toBe('enabled');
    await userEvent.click(checkbox);
    expect(form.checkValidity()).toBe(false);
    act(() => form.reset());
    expect(checkbox).toBeChecked();
    expect(new FormData(form).get('offline')).toBe('enabled');
  });

  it('forwards native props and refs from action parts', () => {
    const actions = createRef<HTMLSpanElement>();
    const action = createRef<HTMLSpanElement>();
    render(
      <>
        <ListItemActions type="right" className="actions" ref={actions} aria-label="Actions">
          <button type="button">More</button>
        </ListItemActions>
        <ListItemAction
          className="action"
          ref={action}
          title="Action"
          action={<button type="button">Details</button>}
        />
      </>,
    );
    expect(actions.current).toHaveClass('actions');
    expect(actions.current).toHaveAttribute('aria-label', 'Actions');
    expect(action.current).toHaveClass('action');
    expect(action.current).toHaveAttribute('title', 'Action');
  });
});
