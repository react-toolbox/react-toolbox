import listItemFactory from 'react-toolbox-core/lib/components/List/ListItem';
import styled, { css } from 'styled-components';
import { defaultProps } from 'recompose';
import { compose } from 'ramda';
import Avatar from '../Avatar';
import FontIcon from '../FontIcon';
import List from './List';
import withRipple from '../withRipple';
import withStyled from '../utils/withStyled';

const ListItem = listItemFactory({
  passthrough: props => ({
    selectable: !!props.onClick,
    innerRef: props.getRef,
  }),
  ListItemNode: styled.li`
    align-items: center;
    color: rgb(33, 33, 33);
    display: flex;
    flex-wrap: wrap;
    line-height: 48px;
    padding: 0 16px;
    position: relative;
    user-select: none;

    &:first-child {
      margin-top: 8px;
    }

    &:last-child {
      margin-bottom: 8px;
    }

    & > ${FontIcon} {
      color: rgb(117, 117, 117);
      font-size: 24px;
    }

    & > ${FontIcon}:nth-child(1) {
      margin-right: 32px;
    }

    & > ${Avatar}:nth-child(1) {
      margin-right: 16px;
    }

    ${props => props.inset && css`padding-left: 72px;`};

    ${props =>
      props.nested &&
      css`
        padding-left: 0;
        padding-right: 0;
        & > ${List} {
          padding-left: ${props.nested * 16}px;
        }
      `};

    ${props =>
      props.disabled &&
      css`
        opacity: 0.4;
        pointer-events: none;
      `};

    ${props =>
      props.highlighted &&
      css`
        background-color: rgb(238, 238, 238);
        cursor: pointer;
      `};

    ${props =>
      props.selectable &&
      css`
        &:hover {
          background-color: rgb(238, 238, 238);
          cursor: pointer;
        }
      `};
  `,
});

export default compose(
  withStyled(),
  withRipple({ enabled: false }),
  defaultProps({ selectable: false }),
)(ListItem);
