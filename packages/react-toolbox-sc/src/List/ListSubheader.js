import styled, { css } from 'styled-components';
import { withProps } from 'recompose';

const ListSubheader = styled.li`
  color: rgb(117, 117, 117);
  font-size: 14px;
  font-weight: 500;
  line-height: 48px;
  margin-top: -8px;
  padding: 0 16px;

  &:nth-child(1) {
    margin-top: 0;
  }

  ${props => props.inset && css`padding-left: 72px;`};
`;

export default withProps(props => ({
  role: 'separator',
}))(ListSubheader);
