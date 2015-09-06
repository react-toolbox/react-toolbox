const React = window.React;

const Face = require('./face');
const Hand = require('./hand');

const { range } = require('../utils/helper');

const innerNumbers = [12, ...range(1, 12)];
const outerNumbers = ['00', ...range(13, 24)];
const step = 360 / 12;

module.exports = React.createClass({
  displayName: 'Hours',

  propTypes: {
    format: React.PropTypes.oneOf(['24hr', 'ampm']),
    onChange: React.PropTypes.func,
    onHandMoved: React.PropTypes.func,
    selected: React.PropTypes.number
  },

  getInitialState () {
    return {
      inner: this.props.format === '24hr' && this.props.selected > 0 && this.props.selected <= 12
    };
  },

  _onHandMouseMove (radius) {
    let currentInner = radius < this.props.radius - this.props.spacing * 2;
    if (this.props.format === '24hr' && this.state.inner !== currentInner) {
      this.setState({inner: currentInner});
    }
  },

  _onHandChange (degrees) {
    this.props.onChange(this._valueFromDegrees(degrees));
  },

  _onMouseDown (event) {
    this.refs.hand.mouseStart(event);
  },

  _onTouchStart (event) {
    this.refs.hand.touchStart(event);
  },

  _valueFromDegrees (degrees) {
    if (this.props.format === 'ampm' || this.props.format === '24hr' && this.state.inner) {
      return parseInt(innerNumbers[degrees / step]);
    } else {
      return parseInt(outerNumbers[degrees / step]);
    }
  },

  renderInnerFace (innerRadius) {
    return (
      <Face
        onTouchStart={this._onTouchStart}
        onMouseDown={this._onMouseDown}
        numbers={innerNumbers}
        spacing={this.props.spacing}
        radius={innerRadius}
        active={this.props.selected} />
    );
  },

  render () {
    let innerRadius = this.props.radius - this.props.spacing * 2;
    let handRadius = this.state.inner ? innerRadius : this.props.radius;
    let handLength = handRadius - this.props.spacing;
    let ampmActive = this.props.format === '24hr' ? this.props.selected : (this.props.selected % 12 || 12);

    return (
      <div>
          <Face
            onTouchStart={this._onTouchStart}
            onMouseDown={this._onMouseDown}
            numbers={this.props.format === '24hr' ? outerNumbers : innerNumbers}
            spacing={this.props.spacing}
            radius={this.props.radius}
            active={ampmActive} />
          { this.props.format === '24hr' ? this.renderInnerFace(innerRadius) : '' }
          <Hand ref='hand'
            initialAngle={this.props.selected * step}
            length={handLength}
            onHandMouseMove={this._onHandMouseMove}
            onHandMoved={this.props.onHandMoved}
            onHandChange={this._onHandChange}
            origin={this.props.center}
            step={step} />
      </div>
    );
  }
});
