import React from 'react';
import ReactDOM from 'react-dom';
import ClassNames from 'classnames';
import style from './style';

class Overlay extends React.Component {
  static propTypes = {
    active: React.PropTypes.bool,
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    invisible: React.PropTypes.bool,
    onClick: React.PropTypes.func
  };

  static defaultProps = {
    invisible: false
  };

  render () {
    const className = ClassNames(style.root, {
      [style.active]: this.props.active,
      [style.invisible]: this.props.invisible
    }, this.props.className);

    return (
      <div className={className}>
        <div className={style.overlay} onClick={this.props.onClick} />
        {this.props.children}
      </div>
    );
  }
}

export default Overlay;
