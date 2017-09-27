import styled, { css } from 'styled-components';
import withOverride from '../utils/withOverride';
import Avatar from '../Avatar';
import CardMedia from './CardMedia';
import CardTitle from './CardTitle';
import CardTitlePrimary from './CardTitlePrimary';
import CardTitleSecondary from './CardTitleSecondary';

const CardHeaderNode = styled.div`
  align-items: center;
  display: flex;
  padding: 24px 16px 16px;

  & > ${Avatar} {
    margin-right: 13px;
  }

  & > ${Avatar} + ${CardTitle} {
    & > ${CardTitlePrimary} {
      font-weight: 500;
      font-size: 14px;
      letter-spacing: 0;
      line-height: 1.4;
    }

    & > ${CardTitleSecondary} {
      font-size: 14px;
      font-weight: 500;
      line-height: 1.4;
    }
  }

  ${CardMedia} & {
    ${CardTitlePrimary}, ${CardTitleSecondary} {
      color: white;
    }
  }

  ${withOverride('CardHeaderNode')};
`;

export default CardHeaderNode;
