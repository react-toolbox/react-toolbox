import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { LIST } from '../identifiers';
import InjectListItem from './ListItem';

const mergeProp = (propName, child, parent) => (
  child[propName] !== undefined
  ? child[propName]
  : parent[propName]
);

const factory = (ListItem) => {
  class List extends Component {
    static propTypes = {
      children: PropTypes.node,
      className: PropTypes.string,
      theme: PropTypes.shape({
        list: PropTypes.string,
      }),
    };

    static defaultProps = {
      className: '',
      ripple: false,
      selectable: false,
    };

    renderItems() {
      return React.Children.map(this.props.children, (item) => {
        if (item === null || item === undefined) {
          return item;
        } else if (item.type === ListItem) {
          const selectable = mergeProp('selectable', item.props, this.props);
          const ripple = mergeProp('ripple', item.props, this.props);
          return React.cloneElement(item, { selectable, ripple });
        }
        return React.cloneElement(item);
      });
    }

    render() {
      return (
        <ul data-react-toolbox="list" className={classnames(this.props.theme.list, this.props.className)}>
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
