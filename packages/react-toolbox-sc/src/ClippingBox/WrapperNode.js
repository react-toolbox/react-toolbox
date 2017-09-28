import styled, { css } from 'styled-components';
import withOverride from '../utils/withOverride';

const WrapperNode = styled.div`
  pointer-events: ${props => (props.active ? 'all' : 'none')};
  position: relative;
  will-change: transform;
  ${getSize};
  ${withOverride('WrapperNode')};
`;

function getSize(props) {
  if (props.height && props.width) {
    return css`
      height: ${props.height}px;
      width: ${props.width}px;
    `;
  }

  return '';
}

export default WrapperNode;
