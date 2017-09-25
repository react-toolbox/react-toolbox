import styled, { css } from 'styled-components';
import { withProps } from 'recompose';
import ListItem from './ListItem';

const ListDivider = styled.li`
  background-color: rgb(238, 238, 238);
  border: 0;
  height: 1px;
  margin: -1px 0 0;
  outline: 0;
  padding: 0;

  ${ListItem} ~ & {
    margin-bottom: 8px;
    margin-top: 8px;
  }

  ${props => props.inset && css`margin-left: 72px;`};
`;

export default withProps(props => ({
  role: 'separator',
}))(ListDivider);
