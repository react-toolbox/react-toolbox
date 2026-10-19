import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Checkbox from '../src/material/checkbox';
import RadioButton from '../src/material/radio';
import Switch from '../src/material/switch';

describe.each([
  ['checkbox', Checkbox, '[data-react-toolbox="check"]'],
  ['radio', RadioButton, '[data-react-toolbox="radio"]'],
  ['switch', Switch, '.rt-switch-thumb'],
] as const)('%s ink lifecycle', (role, Control, visualSelector) => {
  it.each(['mouseup', 'pointercancel', 'touchend', 'touchcancel'])('ends visual feedback on %s', (release) => {
    const change = vi.fn();
    const { container } = render(<Control label="Alerts" onChange={change} />);
    const visual = container.querySelector<HTMLElement>(visualSelector)!;
    vi.spyOn(visual, 'getBoundingClientRect').mockReturnValue({ left: 0, top: 0, width: 20, height: 20 } as DOMRect);
    if (release.startsWith('touch')) fireEvent.touchStart(visual, { touches: [{ pageX: 10, pageY: 10 }] });
    else fireEvent.mouseDown(visual, { button: 0, clientX: 10, clientY: 10 });
    const ink = visual.querySelector('.rt-ripple-ripple')!;
    expect(ink).toHaveClass('rt-ripple-rippleActive');
    fireEvent(document, new Event(release, { bubbles: true }));
    expect(ink).not.toHaveClass('rt-ripple-rippleActive');
    const transition = new Event('transitionend', { bubbles: true });
    Object.defineProperty(transition, 'propertyName', { value: 'opacity' });
    fireEvent(ink, transition);
    expect(visual.querySelector('[data-react-toolbox="ripple"]')).toBeNull();
    expect(screen.getByRole(role, { name: 'Alerts' })).not.toBeChecked();
    expect(change).not.toHaveBeenCalled();
  });

  it('does not create ink or change a disabled input', () => {
    const change = vi.fn();
    const { container } = render(<Control label="Alerts" disabled onChange={change} />);
    const visual = container.querySelector<HTMLElement>(visualSelector)!;
    fireEvent.mouseDown(visual, { button: 0 });
    fireEvent.touchStart(visual, { touches: [{ pageX: 10, pageY: 10 }] });
    fireEvent.click(screen.getByRole(role, { name: 'Alerts' }));
    expect(visual.querySelector('[data-react-toolbox="ripple"]')).toBeNull();
    expect(change).not.toHaveBeenCalled();
  });
});
