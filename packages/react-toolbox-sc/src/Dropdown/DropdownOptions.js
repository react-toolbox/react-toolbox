import * as React from 'react';
import PropTypes from 'prop-types';
import { css } from 'styled-components';
import isComponentOfType from 'react-toolbox-core/lib/utils/isComponentOfType';
import dropdownOptionsFactory from 'react-toolbox-core/lib/components/Dropdown/DropdownOptions';
import DropdownOption from './DropdownOption';
import Menu from '../Menu';
import * as C from './constants';

const isSelectable = child => isComponentOfType(DropdownOption, child);

const WrapperNode = props => (
  <Menu
    isSelectable={isSelectable}
    getListRef={props.getRef}
    withPortal
    overrides={{
      List: {
        ListNode: css`max-height: 100px;`,
      },
      MenuNode: {
        WrapperNode: css`
          top: 50%;
          width: 100%;
          left: ${props.isDefaultTemplate
            ? props.x - C.DEFAULT_TEMPLATE_OFFSET_X
            : props.x}px;
          transform: translateY(${props.y}px);
        `,
        InnerNode: css`
          right: ${props.isDefaultTemplate
            ? props.x - C.DEFAULT_TEMPLATE_OFFSET_X
            : props.x}px;
        `,
      },
    }}
    {...props}
  />
);

WrapperNode.propTypes = {
  isDefaultTemplate: PropTypes.bool,
  x: PropTypes.number,
  y: PropTypes.number,
};

const DropdownOptions = dropdownOptionsFactory({
  passthrough: ['overrides'],
  DropdownOption,
  WrapperNode,
});

export default DropdownOptions;
