import { KeyboardEvent } from 'react';

export const ARROW_DOWN_KEY = 40;
export const ARROW_LEFT_KEY = 37;
export const ARROW_RIGHT_KEY = 39;
export const ARROW_UP_KEY = 38;
export const BACKSPACE_KEY = 8;
export const COMMA_KEY = 188;
export const ENTER_KEY = 13;
export const ESC_KEY = 27;
export const SPACEBAR_KEY = 32;
export const TAB_KEY = 9;

export const ARROW_DOWN = keyIs(ARROW_DOWN_KEY);
export const ARROW_LEFT = keyIs(ARROW_LEFT_KEY);
export const ARROW_RIGHT = keyIs(ARROW_RIGHT_KEY);
export const ARROW_UP = keyIs(ARROW_UP_KEY);
export const BACKSPACE = keyIs(BACKSPACE_KEY);
export const COMMA = keyIs(COMMA_KEY);
export const ENTER_OR_SPACEBAR = e =>
  keyIs(ENTER_KEY)(e) || keyIs(SPACEBAR_KEY)(e);
export const ENTER = keyIs(ENTER_KEY);
export const ESC = keyIs(ESC_KEY);
export const SPACEBAR = keyIs(SPACEBAR_KEY);
export const TAB = keyIs(TAB_KEY);

function keyIs(key) {
  return function(event: KeyboardEvent<any>) {
    return event.keyCode === key;
  };
}
