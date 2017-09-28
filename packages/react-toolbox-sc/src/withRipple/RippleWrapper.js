import styled from 'styled-components';
import withOverride from '../utils/withOverride';

const RippleWrapper = styled.span`
  bottom: 0;
  display: block;
  left: 0;
  outline: none;
  overflow: hidden;
  pointer-events: none;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1;
  ${withOverride('RippleWrapper')};
`;

export default RippleWrapper;
