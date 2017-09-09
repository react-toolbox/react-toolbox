import styled from 'styled-components';
import withOverride from '../utils/withOverride';
import style from './style';

const ButtonNode = styled.button`
  ${style};
  ${withOverride('ButtonNode')};
`;

export default ButtonNode;
