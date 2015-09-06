const React = window.React;
const utils = require('../utils');

const Face = require('./face');
const Hand = require('./hand');

const outerNumbers = [0, ...utils.range(13, 24)];
const innerNumbers = [12, ...utils.range(1, 12)];
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

  _onHandMove (radius) {
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
      return innerNumbers[degrees / step];
    } else {
      return outerNumbers[degrees / step];
    }
  },

  renderInnerFace (innerRadius) {
    if (this.props.format === '24hr') {
      return (
        <Face
          onTouchStart={this._onTouchStart}
          onMouseDown={this._onMouseDown}
          numbers={innerNumbers}
          spacing={this.props.spacing}
          radius={innerRadius}
          active={this.props.selected} />
      );
    }
  },

  render () {
    const { format, selected, radius, spacing, center, onHandMoved } = this.props;
    const is24hr = format === '24hr';

    return (
      <div>
          <Face
            onTouchStart={this._onTouchStart}
            onMouseDown={this._onMouseDown}
            numbers={is24hr ? outerNumbers : innerNumbers}
            spacing={spacing}
            radius={radius}
            twoDigits={is24hr}
            active={is24hr ? selected : (selected % 12 || 12)} />
          { this.renderInnerFace(radius - spacing * 2) }
          <Hand ref='hand'
            initialAngle={selected * step}
            length={(this.state.inner ? radius - spacing * 2 : radius) - spacing}
            onHandMove={this._onHandMove}
            onHandMoved={onHandMoved}
            onHandChange={this._onHandChange}
            origin={center}
            step={step} />
      </div>
    );
  }
});
