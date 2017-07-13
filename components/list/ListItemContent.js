import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { LIST } from '../identifiers';
import InjectListItemText from './ListItemText';

const types = ['auto', 'normal', 'large'];

const factory = (ListItemText) => {
  class ListItemContent extends Component {
    static propTypes = {
      caption: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node,
      ]),
      children: PropTypes.node,
      legend: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node,
      ]),
      theme: PropTypes.shape({
        auto: PropTypes.string,
        itemContentRoot: PropTypes.string,
        large: PropTypes.string,
        normal: PropTypes.string,
      }),
      type: PropTypes.oneOf(types),
    };

    getType() {
      const { type, children, caption, legend } = this.props;

      let count = React.Children.count(children);
      [caption, legend].forEach((s) => { count += s ? 1 : 0; });
      const typeIndex = Math.min(count, types.length);

      return type || types[typeIndex];
    }

    render() {
      const { children, caption, legend, theme } = this.props;
      const contentType = this.getType();
      const className = classnames(theme.itemContentRoot, {
        [theme[contentType]]: theme[contentType],
      });

      return (
        <span className={className}>
          {caption && <ListItemText theme={theme} primary>{caption}</ListItemText>}
          {legend && <ListItemText theme={theme}>{legend}</ListItemText>}
          {children}
        </span>
      );
    }
  }

  return ListItemContent;
};

const ListItemContent = factory(InjectListItemText);
export default themr(LIST)(ListItemContent);
export { factory as listItemContentFactory };
export { ListItemContent };
