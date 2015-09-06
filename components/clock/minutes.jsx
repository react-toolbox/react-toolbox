const React = window.React;
const utils = require('../utils');

const Face = require('./face');
const Hand = require('./hand');

const minutes = utils.range(0, 60, 5);
const step = 360 / 60;

module.exports = React.createClass({
  displayName: 'Minutes',

  propTypes: {
    selected: React.PropTypes.number,
    onChange: React.PropTypes.func
  },

  getDefaultProps () {
    return {
      selected: 0,
      onChange: null
    };
  },

  _onHandChange (degrees) {
    this.props.onChange(degrees / step);
  },

  _onMouseDown (event) {
    this.refs.hand.mouseStart(event);
  },

  _onTouchStart (event) {
    this.refs.hand.touchStart(event);
  },

  render () {
    return (
      <div>
        <Face
          onTouchStart={this._onTouchStart}
          onMouseDown={this._onMouseDown}
          numbers={minutes}
          spacing={this.props.spacing}
          radius={this.props.radius}
          twoDigits={true}
          active={this.props.selected} />
        <Hand ref='hand'
          className={minutes.indexOf(this.props.selected) === -1 ? 'smallKnob' : ''}
          initialAngle={this.props.selected * step}
          length={this.props.radius - this.props.spacing}
          onHandChange={this._onHandChange}
          origin={this.props.center}
          step={step} />
      </div>
    );
  }
});
