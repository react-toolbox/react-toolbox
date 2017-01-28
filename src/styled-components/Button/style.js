import { css } from 'styled-components';
import alpha from '../../utils/alpha';
import lighten from '../../utils/lighten';

const base = css`
  appearance: none;
  align-content: center;
  align-items: center;
  border: 0;
  cursor: pointer;
  display: inline-block;
  flex-direction: row;
  font-family: Roboto, sans-serif;
  font-size: 14px;
  font-weight: 500;
  height: 36px;
  justify-content: center;
  letter-spacing: 0;
  line-height: 36px;
  outline: none;
  position: relative;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  transition:
    box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1),
    background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1),
    color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  vertical-align: middle;
  white-space: nowrap;

  &::-moz-focus-inner {
    border: 0;
  }

  &:visited {
    color: inherit;
  }

  & > svg {
    display: inline-block;
    fill: currentColor;
    font-size: 120%;
    height: 36px;
    vertical-align: top;
    width: 1em;
  }

  & > i {
    display: inline-block;
    line-height: 36px;
    vertical-align: top;
  }
`;

const raised = (props) => {
  const color = props.inverse
    ? 'rgba(255, 255, 255, 1)'
    : 'rgba(33, 33, 33, 1)';

  const background = props.inverse
    ? 'rgba(33, 33, 33, 1)'
    : 'rgba(255, 255, 255, 1)';

  return css`
    background: ${background} ;
    border-radius: 2px;
    box-shadow:
      0 2px 2px 0 rgba(0, 0, 0, 0.14),
      0 3px 1px -2px rgba(0, 0, 0, 0.2),
      0 1px 5px 0 rgba(0, 0, 0, 0.12);;
    color: ${color};
    min-width: 90px;
    padding: 0 12px;
    &:hover {
      background: ${alpha(background, 0.8)};
    }
    &:focus:not(:active) {
      box-shadow:
        0 0 8px rgba(0, 0, 0, 0.18),
        0 8px 16px rgba(0, 0, 0, 0.36);
    }
    & > svg {
      margin-right: 5px;
    }
    & > i {
      font-size: 120%;
      margin-right: 5px;
    }
  `;
};

const flat = (props) => {
  const color = props.inverse
    ? 'rgba(255, 255, 255, 1)'
    : 'rgba(33, 33, 33, 1)';

  return css`
    background: transparent;
    border-radius: 2px;
    color: ${color};
    min-width: 90px;
    padding: 0 12px;
    &:focus:not(:active) {
      background: ${alpha('rgba(33, 33, 33, 1)', 0.2)};
    }
    &:hover {
      background: ${alpha('rgba(33, 33, 33, 1)', 0.2)};
    }
    & > svg {
      margin-right: 5px;
    }
    & > i {
      font-size: 120%;
      margin-right: 5px;
    }
  `;
};

const floating = (props) => {
  const color = props.inverse
    ? 'rgba(255, 255, 255, 1)'
    : 'rgba(33, 33, 33, 1)';

  const background = props.inverse
    ? 'rgba(33, 33, 33, 1)'
    : 'rgba(255, 255, 255, 1)';

  return css`
    background: ${background} ;
    border-radius: 50%;
    box-shadow:
      0 1px 1.5px 0 rgba(0, 0, 0, 0.12),
      0 1px 1px 0 rgba(0, 0, 0, 0.24);
    color: ${color};
    font-size: 24px;
    height: 56px;
    width: 56px;
    &:focus:not(:active) {
      box-shadow:
        0 0 8px rgba(0, 0, 0, 0.18),
        0 8px 16px rgba(0, 0, 0, 0.36);
    }
    & > i {
      line-height: 56px;
    }
  `;
};

const mini = css`
  font-size: ${40 / 2.25}px;
  height: 40px;
  width: 40px;

  & > i {
    line-height: 40px;
    vertical-align: top;
  }
`;

const toggle = (props) => {
  const color = props.inverse
    ? 'rgba(255, 255, 255, 1)'
    : 'rgba(33, 33, 33, 1)';

  return css`
    background: transparent;
    border-radius: 50%;
    color: ${color};
    width: 36px;
    &:focus:not(:active) {
      background: ${alpha('rgba(33, 33, 33, 1)', 0.2)};
    }
    & > i,
    & svg {
      font-size: 20px;
      line-height: 36px;
      vertical-align: top;
    }
  `;
};

const disabled = css`
  color: ${alpha('rgba(0, 0, 0, 1)', 0.26)};
  cursor: auto;
  pointer-events: none;
`;

const colored = (props, normal, contrast) => {
  const disabledColor = alpha('rgba(0, 0, 0, 1)', 0.26);

  if (props.raised || props.floating) {
    return css`
      background-color: ${props.disabled ? alpha('rgba(0, 0, 0, 1)', 0.12) : normal};
      color: ${props.disabled ? disabledColor : contrast};
      &:hover {
        background: ${lighten(normal, 0.12)};
      }
    `;
  } else if (props.flat) {
    return css`
      color: ${props.disabled ? disabledColor : normal};
      &:focus:not(:active) {
        background: ${alpha(normal, 0.2)};
      }
      &:hover {
        background: ${alpha(normal, 0.2)};
      }
    `;
  } else if (props.toggle) {
    return css`
      color: ${props.disabled ? disabledColor : normal};
      &:focus:not(:active) {
        background: ${alpha(normal, 0.2)};
      }
    `;
  }

  return undefined;
};

const primaryColor = 'rgba(63, 81, 181, 1)';
const primaryColorContrast = 'rgba(255, 255, 255, 1)';
const accentColor = 'rgba(255, 64, 129, 1)';
const accentColorContrast = 'rgba(255, 255, 255, 1)';

const primary = props => colored(
  props,
  primaryColor,
  primaryColorContrast,
);

const accent = props => colored(
  props,
  accentColor,
  accentColorContrast,
);

export default css`
  ${base}
  ${props => props.flat && flat}
  ${props => props.floating && floating}
  ${props => props.raised && raised}
  ${props => props.toggle && toggle}
  ${props => props.disabled && disabled}
  ${props => props.mini && mini}
  ${props => props.primary && primary(props)}
  ${props => props.accent && accent(props)}
`;
