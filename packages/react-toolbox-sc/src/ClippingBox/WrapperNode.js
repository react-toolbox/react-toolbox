import styled, { css } from 'styled-components';
import withOverride from '../utils/withOverride';

const WrapperNode = styled.div`
  height: ${props => props.height}px;
  pointer-events: ${props => (props.active ? 'all' : 'none')};
  position: relative;
  width: ${props => props.width}px;
  will-change: transform;
  ${withOverride('WrapperNode')};
`;

export default WrapperNode;
