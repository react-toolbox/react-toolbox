import { compose } from 'ramda';
import styled, { css } from 'styled-components';
import listFactory from 'react-toolbox-core/lib/components/List/List';
import withNavigation from 'react-toolbox-core/lib/hoc/withNavigation';
import isComponentOfType from 'react-toolbox-core/lib/utils/isComponentOfType';
import ListItem from './ListItem';
import withStyled from '../utils/withStyled';

const List = listFactory({
  passthrough: props => ({ innerRef: props.getRef }),
  ListNode: styled.ul`
    list-style: none;
    margin: 0;
    overflow: scroll;
    padding: 0;
    position: relative;
    text-align: left;
    vertical-align: middle;
    white-space: nowrap;
    width: 100%;

    ${props =>
      props.nested &&
      css`
        & > ${ListItem} {
          padding-left: ${(props.nested + 1) * 16}px;
        }
      `};
  `,
});

export default compose(
  withStyled(),
  withNavigation({
    isSelectable: child =>
      isComponentOfType(ListItem, child) &&
      !child.props.disabled &&
      !child.props.nested,
  }),
)(List);
