import React from 'react';
import style from './style';

export default React.createClass({

  displayName: 'Tab',

  propTypes: {
    active: React.PropTypes.bool,
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    hidden: React.PropTypes.bool,
    label: React.PropTypes.string.isRequired,
    onActive: React.PropTypes.func,
    tabIndex: React.PropTypes.number
  },

  getDefaultProps () {
    return {
      className: ''
    };
  },

  componentDidMount () {
    this.active(this.props.active);
  },

  componentWillReceiveProps (next_props) {
    if (next_props.active) this.active(next_props.active);
  },

  render () {
    let className = `${style.tab} ${this.props.className}`;
    if (this.props.active) className += ` ${style.active}`;
    if (this.props.disabled) className += ` ${style.disabled}`;
    if (this.props.hidden) className += ` ${style.hidden}`;

    return (
      <section
        data-react-toolbox='tab'
        className={className}
        data-flex='vertical'
        tabIndex={this.props.tabIndex}
      >
        { this.props.children }
      </section>
    );
  },

  active (value) {
    this.setState({active: value});
    if (this.props.onActive && value) {
      this.props.onActive(this);
    }
  }
});
