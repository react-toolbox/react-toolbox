import React from 'react';
import style from './style';

import FontIcon from '../font_icon';

export default React.createClass({
  displayName: 'Slider',

  propTypes: {
    actions: React.PropTypes.array,
    caption: React.PropTypes.string,
    className: React.PropTypes.string,
    icon: React.PropTypes.string,
    timeout: React.PropTypes.number,
    type: React.PropTypes.string
  },

  getDefaultProps () {
    return {
      className: '',
      timeout: 10
    };
  },

  getInitialState () {
    return {
      active: false
    };
  },

  componentDidMount () {
    setInterval( function () {
      console.log('destroy');
    }, this.props.timeout * 1000)
  },

  render () {
    let className = `${style.root} ${style[this.props.type]}`;
    if (this.props.className) className += ` ${this.props.className}`;

    return (
      <div data-react-toolbox='snackbar' className={className}>
        <FontIcon value={this.props.icon} className={style.icon} />
        <small>{this.props.caption}</small>
        <nav>
        </nav>
      </div>
    );
  }

});
