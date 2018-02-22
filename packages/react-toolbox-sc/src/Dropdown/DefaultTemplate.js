import styled from 'styled-components';
import * as C from './constants';

const DefaultTemplate = styled.span`
  align-items: center;
  color: rgb(33, 33, 33);
  display: flex;
  flex-wrap: wrap;
  font-weight: ${props => (props.selected ? 'bold' : 'normal')};
  line-height: ${C.TEMPLATE_ITEM_HEIGHT}px;
  padding: 0;
  position: relative;
  user-select: none;
`;

export default DefaultTemplate;
