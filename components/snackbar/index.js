import React from 'react';
import style from './style';

import Button from '../button';
import FontIcon from '../font_icon';

export default React.createClass({
  displayName: 'Slider',

  propTypes: {
    action: React.PropTypes.object,
    active: React.PropTypes.bool,
    label: React.PropTypes.string,
    className: React.PropTypes.string,
    icon: React.PropTypes.string,
    timeout: React.PropTypes.number,
    type: React.PropTypes.string
  },

  getDefaultProps () {
    return {
      active: false,
      className: '',
      timeout: 10
    };
  },

  getInitialState () {
    return {
      active: this.props.active
    };
  },

  componentDidMount () {
    setTimeout(() => {
      this.setState({ active: false });
    }, this.props.timeout * 1000)
  },

  componentWillReceiveProps (next_props) {
    this.setState({active: next_props.active});
  },

  render () {
    let className = `${style.root} ${style[this.props.type]}`;
    if (this.props.active) className += ` ${style.active}`;
    if (this.props.className) className += ` ${this.props.className}`;

    return (
      <div data-react-toolbox='snackbar' className={className}>
        { this.props.icon ? <FontIcon value={this.props.icon} className={style.icon} /> : null }
        <span className={style.label}>{this.props.label}</span>
        { this.props.action ? <Button {...this.props.action} type='flat' className={style.button} /> : null }
      </div>
    );
  }

});
