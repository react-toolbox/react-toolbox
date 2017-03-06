import styled from 'styled-components';
import withOverride from '../utils/withOverride';

const RippleWrapper = styled.span`
  bottom: 0;
  display: block;
  left: 0;
  pointer-events: none;
  outline: none;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1;
  ${withOverride('RippleWrapper')}
`;

export default RippleWrapper;
