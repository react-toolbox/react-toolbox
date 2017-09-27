import styled, { css } from 'styled-components';
import withOverride from '../utils/withOverride';
import CardHeader from './CardHeader';

const CardTextNode = styled.div`
  padding: 16px;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;

  & > p {
    margin: 0 0 16px;

    &:last-child: {
      margin-bottom: 0;
    }
  }

  &:last-child {
    padding-bottom: 24px;
  }

  ${CardHeader} + & {
    padding-top: 0;
  }

  ${withOverride('CardTextNode')};
`;

export default CardTextNode;
