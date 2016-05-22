import React from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import ListItemText from './ListItemText';

const types = ['auto', 'normal', 'large'];

class ListItemContent extends React.Component {
  static propTypes = {
    caption: React.PropTypes.string,
    children: React.PropTypes.any,
    legend: React.PropTypes.string,
    theme: React.PropTypes.shape({
      itemContentRoot: React.PropTypes.string.isRequired,
      large: React.PropTypes.string.isRequired
    }),
    type: React.PropTypes.oneOf(types)
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
        {caption && <ListItemText primary>{caption}</ListItemText>}
        {legend && <ListItemText>{legend}</ListItemText>}
        {children}
      </span>
    );
  }
}
export default themr('ToolboxList')(ListItemContent);
