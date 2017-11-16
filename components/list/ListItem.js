import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { themr } from 'react-css-themr';
import { LIST } from '../identifiers';
import InjectListItemContent from './ListItemContent';
import InjectListItemLayout from './ListItemLayout';
import rippleFactory from '../ripple/Ripple';

const factory = (ripple, ListItemLayout, ListItemContent) => {
  class ListItem extends Component {
    static propTypes = {
      altText: PropTypes.string,
      ariaLabel: PropTypes.string,
      children: PropTypes.node,
      className: PropTypes.string,
      disabled: PropTypes.bool,
      hasRipple: PropTypes.bool,
      id: PropTypes.string,
      onClick: PropTypes.func,
      onMouseDown: PropTypes.func,
      onTouchStart: PropTypes.func,
      ripple: PropTypes.bool,
      tabIndex: PropTypes.number,
      theme: PropTypes.shape({
        listItem: PropTypes.string,
      }),
      to: PropTypes.string,
    };

    static defaultProps = {
      className: '',
      disabled: false,
      ripple: false,
      tabIndex: 0,
    };

    handleClick = (event) => {
      if (this.props.to && this.isModifiedEvent(event)) {
        return;
      } else if (this.props.to) {
        event.preventDefault();
      }
      if (this.props.onClick && !this.props.disabled) {
        this.props.onClick(event);
      }
    };

    handleEnter = (event) => {
      if (event.keyCode === 13) {
        event.preventDefault();
        this.handleClick(event);
      }
    };

    isModifiedEvent = (event) => {
      if (event.metaKey || event.altKey || event.ctrlKey || event.shiftKey) {
        return true;
      }
      return false;
    };

    groupChildren() {
      const children = {
        leftActions: [],
        rightActions: [],
        ignored: [],
      };

      React.Children.forEach(this.props.children, (child, i) => {
        if (!React.isValidElement(child)) {
          return undefined;
        }

        const { listItemIgnore, ...rest } = child.props;
        const strippedChild = { ...child, ...{ props: rest } };

        if (listItemIgnore) {
          children.ignored.push(strippedChild);
          return undefined;
        }
        if (child.type === ListItemContent) {
          children.itemContent = strippedChild;
          return undefined;
        }
        const bucket = children.itemContent ? 'rightActions' : 'leftActions';
        children[bucket].push({ ...strippedChild, key: i });
        return undefined;
      });

      return children;
    }

    render() {
      const {
        ariaLabel,
        altText,
        className,
        id,
        ripple: hasRipple,    // eslint-disable-line no-unused-vars
        onClick,      // eslint-disable-line no-unused-vars
        onMouseDown,  // eslint-disable-line no-unused-vars
        onTouchStart, // eslint-disable-line no-unused-vars
        tabIndex,
        theme,
        to,
        ...other
      } = this.props;
      const children = this.groupChildren();
      const content = <ListItemLayout theme={theme} {...children} {...other} />;

      return (
        <li
          aria-label={ariaLabel}
          className={`${theme.listItem} ${className}`}
          id={id}
          onClick={this.handleClick}
          onMouseDown={onMouseDown}
          onTouchStart={onTouchStart}
          onKeyDown={this.handleEnter}
          tabIndex={to || !onClick ? -1 : tabIndex}
        >
          {to ? <a href={this.props.to}>{content}</a> : content}
          {children.ignored}
          {altText ? <span className={theme.screenReader}>{altText}</span> : null}
        </li>
      );
    }
  }

  return ripple(ListItem);
};

const ripple = rippleFactory({ centered: false, listItemIgnore: true });
const ListItem = factory(ripple, InjectListItemLayout, InjectListItemContent);

export default themr(LIST)(ListItem);
export { factory as listItemFactory };
export { ListItem };
