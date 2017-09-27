import styled, { css } from 'styled-components';
import withOverride from '../utils/withOverride';
import Button from '../Button/ButtonNode';

const CardActionsNode = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-start;
  padding: 8px;

  & > ${Button} {
    margin: 0 4px;
    min-width: 0;
    padding: 0 8px;

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }
  }

  ${withOverride('CardActionsNode')};
`;

export default CardActionsNode;
