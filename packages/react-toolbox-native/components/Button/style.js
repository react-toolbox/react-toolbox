import { css } from 'styled-components/native';
import alpha from '../../utils/alpha';

const base = css`
  align-items: center;
  border: 0;
  flex-direction: row;
  height: 36;
  justify-content: center;
  margin-bottom: 20;
  shadow-offset: 0 2;
  shadow-opacity: 0.3;
  shadow-radius: 2;
  shadow-color: #000;
  padding: 0;
  position: relative;
`;

const raised = (props) => {
  const background = props.inverse
    ? 'rgba(33, 33, 33, 1)'
    : 'rgba(255, 255, 255, 1)';

  return css`
    background-color: ${background} ;
    border-radius: 2;
    padding: 0 12;
  `;
};

const colored = (props, normal) => {
  if (props.raised || props.floating) {
    return css`
      background-color: ${props.disabled ? alpha('rgba(0, 0, 0, 1)', 0.12) : normal};
    `;
  }

  return undefined;
};

const primaryColor = 'rgba(63, 81, 181, 1)';
const primaryColorContrast = 'rgba(255, 255, 255, 1)';

const primary = props => colored(
  props,
  primaryColor,
  primaryColorContrast,
);

export default css`
  ${base}
  ${props => props.raised && raised}
  ${props => props.primary && primary(props)}
`;
