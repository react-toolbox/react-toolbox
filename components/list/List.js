import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { LIST } from '../identifiers.js';
import InjectListItem from './ListItem.js';

const factory = (ListItem) => {
  class List extends Component {
    static propTypes = {
      children: PropTypes.node,
      className: PropTypes.string,
      ripple: PropTypes.bool,
      selectable: PropTypes.bool,
      theme: PropTypes.shape({
        list: PropTypes.string
      })
    };

    static defaultProps = {
      className: '',
      ripple: false,
      selectable: false
    };

    renderItems () {
      return React.Children.map(this.props.children, (item) => {
        if (item.type === ListItem) {
          return React.cloneElement(item, {
            ripple: this.props.ripple,
            selectable: this.props.selectable
          });
        } else {
          return React.cloneElement(item);
        }
      });
    }

    render () {
      return (
        <ul data-react-toolbox='list' className={classnames(this.props.theme.list, this.props.className)}>
          {this.renderItems()}
        </ul>
      );
    }
  }

  return List;
};

const List = factory(InjectListItem);
export default themr(LIST)(List);
export { factory as listFactory };
export { List };
