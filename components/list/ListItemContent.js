import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { LIST } from '../identifiers.js';
import InjectListItemText from './ListItemText.js';

const types = ['auto', 'normal', 'large'];

const factory = (ListItemText) => {
  class ListItemContent extends Component {
    static propTypes = {
      caption: PropTypes.string,
      children: PropTypes.any,
      legend: PropTypes.string,
      theme: PropTypes.shape({
        itemContentRoot: PropTypes.string,
        large: PropTypes.string
      }),
      type: PropTypes.oneOf(types)
    };

    getType () {
      const {type, children, caption, legend} = this.props;

      let count = React.Children.count(children);
      [caption, legend].forEach(s => { count += s ? 1 : 0; });
      const typeIndex = Math.min(count, types.length);

      return type || types[typeIndex];
    }

    render () {
      const {children, caption, legend, theme} = this.props;
      const className = classnames(theme.itemContentRoot, {
        [theme[this.getType()]]: theme[this.getType()]
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
