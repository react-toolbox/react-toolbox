import { ORIGINS } from 'react-toolbox-core/lib/components/ClippingBox';
import styled, { css } from 'styled-components';
import withOverride from '../utils/withOverride';

const InnerNode = styled.div`
  border-radius: 3px;
  left: 0;
  opacity: 0;
  position: absolute;
  top: 0;
  ${getActiveStyle};
  ${getClipStyle};
  ${withOverride('InnerNode')};
`;

function getActiveStyle(props) {
  if (props.active) {
    return css`
      opacity: 1;
      transition: opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1),
        clip 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    `;
  }
}

function getClipStyle(props) {
  if (props.active) {
    return css`
      clip: rect(0 ${props.width}px ${props.height}px 0);
    `;
  } else if (props.origin === ORIGINS.TOP_RIGHT) {
    return css`
      clip: rect(0 ${width}px 0 ${width}px);
    `;
  } else if (props.origin === ORIGINS.BOTTOM_RIGHT) {
    return css`
      clip: rect(${height}px ${width}px ${height}px ${width}px);
    `;
  } else if (props.origin === ORIGINS.BOTTOM_LEFT) {
    return css`
      clip: rect(${height}px 0 ${height}px 0);
    `;
  } else if (props.origin === ORIGINS.TOP_LEFT) {
    return css`
      clip: rect(0 0 0 0);
    `;
  }
}

export default InnerNode;
