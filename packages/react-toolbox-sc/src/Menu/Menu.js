import React from 'react';
import { compose } from 'ramda';
import { defaultProps, withHandlers } from 'recompose';
import withClickOutside from 'react-toolbox-core/lib/hoc/withClickOutside';
import withActiveMount from 'react-toolbox-core/lib/hoc/withActiveMount';
import withPosition from 'react-toolbox-core/lib/hoc/withPosition';
import List from '../List';
import MenuNode from './MenuNode';
import withPortal from './withPortal';

const MenuList = ({
  children, // eslint-disable-line
  hoverIdx, // eslint-disable-line
  isSelectable, // eslint-disable-line
  onEndReached, // eslint-disable-line
  onHoverChange, // eslint-disable-line
  onMouseEnter, // eslint-disable-line
  onMouseLeave, // eslint-disable-line
  onStartReached, // eslint-disable-line
  overrides, // eslint-disable-line
  restartOnEnd, // eslint-disable-line
  rootNode, // eslint-disable-line
  scrollOffset, // eslint-disable-line
  useKeys, // eslint-disable-line
  ...other
}) => (
  <MenuNode overrides={overrides} {...other}>
    <List
      hoverIdx={hoverIdx}
      isSelectable={isSelectable}
      onEndReached={onEndReached}
      onHoverChange={onHoverChange}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onStartReached={onStartReached}
      overrides={overrides}
      restartOnEnd={restartOnEnd}
      rootNode={rootNode}
      scrollOffset={scrollOffset}
      useKeys={useKeys}
    >
      {children}
    </List>
  </MenuNode>
);

const enhance = compose(
  withHandlers({
    onMouseEnter: props => event => {
      if (props.onMouseEnter) {
        props.onMouseEnter(event, props.value);
      }
    },
  }),
  withClickOutside({ shouldAttach: props => props.active }),
  withActiveMount({ delay: 400 }),
  defaultProps({ offsetX: 0, offsetY: 0 }),
  withPosition(),
  withPortal(),
);

export default enhance(MenuList);
