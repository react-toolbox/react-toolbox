/* global React */

import { addons } from 'react/addons';
import FontIcon from '../font_icon';
import Ripple from '../ripple';
import CSSModules from 'react-css-modules';
import style from './style.scss';

const Button = React.createClass({
  mixins: [addons.PureRenderMixin],

  displayName: 'Button',

  propTypes: {
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    icon: React.PropTypes.string,
    primary: React.PropTypes.bool,
    accent: React.PropTypes.bool,
    label: React.PropTypes.string,
    loading: React.PropTypes.bool,
    ripple: React.PropTypes.bool,
    type: React.PropTypes.string
  },

  getDefaultProps () {
    return {
      className: '',
      ripple: true,
      type: 'flat'
    };
  },

  getInitialState () {
    return { loading: this.props.loading };
  },

  handleClick (event) {
    if (this.props.onClick) this.props.onClick(event, this);
  },

  handleMouseDown (event) {
    this.refs.ripple.start(event);
  },

  render () {
    return (
      <button
        data-toolbox='button'
        styleName={this.props.type}
        className={this.props.className}
        disabled={this.props.disabled || this.state.loading}
        onClick={this.handleClick}
        onMouseDown={this.handleMouseDown}
      >
        { this.props.ripple ? <Ripple ref='ripple' loading={this.props.loading}/> : null }
        { this.props.icon ? <FontIcon styleName='icon' value={this.props.icon}/> : null }
        { this.props.label ? <abbr styleName='label'>{this.props.label}</abbr> : null }
      </button>
    );
  },

  loading (value) {
    this.setState({loading: value});
  }
});

export default CSSModules(Button, style);
