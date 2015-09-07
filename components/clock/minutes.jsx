const React = window.React;
const PureRenderMixin = require('react/addons').addons.PureRenderMixin;
const utils = require('../utils');

const Face = require('./face');
const Hand = require('./hand');

const minutes = utils.range(0, 60, 5);
const step = 360 / 60;

module.exports = React.createClass({
  mixins: [PureRenderMixin],

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

  onHandChange (degrees) {
    this.props.onChange(degrees / step);
  },

  onMouseDown (event) {
    this.refs.hand.mouseStart(event);
  },

  onTouchStart (event) {
    this.refs.hand.touchStart(event);
  },

  render () {
    return (
      <div>
        <Face
          onTouchStart={this.onTouchStart}
          onMouseDown={this.onMouseDown}
          numbers={minutes}
          spacing={this.props.spacing}
          radius={this.props.radius}
          twoDigits={true}
          active={this.props.selected} />
        <Hand ref='hand'
          className={minutes.indexOf(this.props.selected) === -1 ? 'smallKnob' : ''}
          initialAngle={this.props.selected * step}
          length={this.props.radius - this.props.spacing}
          onHandChange={this.onHandChange}
          origin={this.props.center}
          step={step} />
      </div>
    );
  }
});
