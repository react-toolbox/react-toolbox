import React from 'react';
import style from './style';
import ListItemText from './ListItemText';

const types = ['auto', 'normal', 'large'];

class ListItemContent extends React.Component {
  static propTypes = {
    caption: React.PropTypes.string,
    children: React.PropTypes.any,
    legend: React.PropTypes.string,
    type: React.PropTypes.oneOf(types)
  };

  getType () {
    const {type, children, caption, legend} = this.props;

    let count = React.Children.count(children);
    [caption, legend].forEach(s => count += s ? 1 : 0);
    const typeIndex = Math.min(count, types.length);

    return type || types[typeIndex];
  }

  render () {
    const {children, caption, legend} = this.props;

    const className = `${style.itemContentRoot} ${style[this.getType()]}`;

    return (
      <span className={className}>
        <span className={style.itemContent}>
          {caption && <ListItemText primary>{caption}</ListItemText>}
          {legend && <ListItemText>{legend}</ListItemText>}
          {children}
        </span>
      </span>
    );
  }
}
export default ListItemContent;
