import styled, { css } from 'styled-components';
import dropdownFactory from 'react-toolbox-core/lib/components/Dropdown';
import DropdownOption from './DropdownOption';
import DropdownOptions from './DropdownOptions';
import DefaultTemplate from './DefaultTemplate';
import * as C from './constants';

const Dropdown = dropdownFactory({
  passthrough: (props, nodeName) => {
    if (nodeName === 'DropdownOptions') {
      return {
        hoverIdx: props.hoverIdx,
        onClick: props.onClick,
        onHoverChange: props.onHoverChange,
        useKeys: props.useKeys,
      };
    }

    return {
      overrides: props.overrides,
    };
  },
  DropdownOption,
  DropdownOptions,
  LabelNode: styled.div`
    color: rgba(0, 0, 0, 0.26);
    font-size: 12px;
    line-height: 16px;
    position: relative;
    transform: translateY(0);
    transition: font-size 0.35s cubic-bezier(0.4, 0, 0.2, 1),
      transform 0.35s cubic-bezier(0.4, 0, 0.2, 1),
      opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1);

    ${props =>
      !props.hasValue &&
      css`
        transform: translateY(
          ${C.FILLED_LABEL_HEIGHT +
            (C.TEMPLATE_ITEM_HEIGHT - C.FILLED_LABEL_HEIGHT) / 2}px
        );
        font-size: 16px;
      `};
  `,
  ValueNode: styled.div`
    cursor: pointer;
    position: relative;
    border-bottom: 1px solid rgba(0, 0, 0, 0.26);
    &::after {
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 5px solid rgba(0, 0, 0, 0.26);
      content: '';
      height: 0;
      pointer-events: none;
      position: absolute;
      right: 0;
      top: 50%;
      width: 0;
    }
  `,
  PlaceholderNode: styled.span`
    height: ${C.TEMPLATE_ITEM_HEIGHT}px;
    line-height: ${C.TEMPLATE_ITEM_HEIGHT}px;
  `,
  DefaultTemplate,
  WrapperNode: styled.div`
    border: 1px solid gray;
    padding: 6px 0;
  `,
});

export default Dropdown;
