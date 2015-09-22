/* global React */

import { addons } from 'react/addons';
import style from './style';
import Navigation from '../navigation';
import Ripple from '../ripple';

export default React.createClass({
  mixins: [addons.PureRenderMixin],

  displayName: 'Card',

  propTypes: {
    className: React.PropTypes.string,
    color: React.PropTypes.string,
    image: React.PropTypes.string,
    text: React.PropTypes.string,
    legend: React.PropTypes.string,
    loading: React.PropTypes.bool,
    onClick: React.PropTypes.func,
    title: React.PropTypes.string,
    type: React.PropTypes.string
  },

  getDefaultProps () {
    return {
      className: '',
      loading: false,
      type: 'default'
    };
  },

  getInitialState () {
    return {
      loading: this.props.loading
    };
  },

  onClick (event) {
    if (this.props.onClick) {
      event.preventDefault();
      this.props.onClick(event, this);
    }
  },

  renderHeading () {
    let headingStyle = {};
    if (this.props.image) headingStyle.backgroundImage = `url(${this.props.image})`;
    if (this.props.color) headingStyle.backgroundColor = this.props.color;
    if (this.props.title || this.props.image) {
      return (
        <figure className={style.figure} style={headingStyle}>
          { this.props.subtitle ? <small>{this.props.subtitle}</small> : null }
          { this.props.title ? <h2>{this.props.title}</h2> : null }
        </figure>
      );
    }
  },

  render () {
    let className = `${style.root} ${this.props.className}`;
    if (this.props.type) className += ` ${this.props.type}`;
    if (this.props.onClick) className += ' touch';
    if (this.props.image) className += ' image';
    if (this.props.color) className += ' color';
    if (this.state.loading) className += ' loading';

    return (
      <div data-react-toolbox='card' className={className} onMouseDown={this.onClick}>
        { this.renderHeading() }
        { this.props.text ? <p>{this.props.text}</p> : null }
        { this.props.legend ? <small>{this.props.legend}</small> : null}
        { this.props.actions ? <Navigation className={style.navigation} actions={this.props.actions} /> : null }
        { <Ripple ref="ripple" className={style.ripple} loading={this.state.loading} /> }
      </div>
    );
  },

  loading (value) {
    this.setState({loading: value});
  }
});
