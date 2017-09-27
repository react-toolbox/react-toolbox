import styled, { css } from 'styled-components';
import withOverride from '../utils/withOverride';

const CardNode = styled.div`
  background: rgba(255, 255, 255, 1);
  border-radius: 2px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
  font-size: 14px;
  overflow: hidden;
  width: 100%;

  ${getRaisedStyle} ${withOverride('CardNode')};
`;

function getRaisedStyle(props) {
  if (props.raised) {
    return css`
      box-shadow: 0 8px 10px 1px rgba(0, 0, 0, 0.14),
        0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2);
    `;
  }
}

export default CardNode;
