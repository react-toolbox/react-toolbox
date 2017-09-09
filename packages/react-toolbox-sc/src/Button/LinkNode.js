import styled from 'styled-components';
import withOverride from '../utils/withOverride';
import style from './style';

const LinkNode = styled.a`
  ${style};
  ${withOverride('ButtonNode')};
`;

export default LinkNode;
