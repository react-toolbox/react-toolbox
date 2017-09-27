import styled, { css } from 'styled-components';
import withOverride from '../utils/withOverride';

const CardTitlePrimaryNode = styled.h2`
  font-size: 24px;
  font-weight: 400;
  line-height: 32px;
  margin: 0;
  padding: 0;

  ${withOverride('CardTitlePrimaryNode')};
`;

export default CardTitlePrimaryNode;
