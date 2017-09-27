import styled, { css } from 'styled-components';
import withOverride from '../utils/withOverride';

const CardTitleSecondaryNode = styled.p`
  color: rgba(0, 0, 0, 0.54);
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  margin: 0;
  padding: 0;

  ${withOverride('CardTitleSecondaryNode')};
`;

export default CardTitleSecondaryNode;
