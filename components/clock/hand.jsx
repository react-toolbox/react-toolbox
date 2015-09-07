const React = window.React;
const PureRenderMixin = require('react/addons').addons.PureRenderMixin;
const css = require('./style');
const utils = require('../utils');

module.exports = React.createClass({
  mixins: [PureRenderMixin],

  displayName: 'Hand',

  propTypes: {
    className: React.PropTypes.string,
    initialAngle: React.PropTypes.number,
    onHandChange: React.PropTypes.func,
    onHandMoved: React.PropTypes.func
  },

  getDefaultProps () {
    return {
      className: '',
      initialAngle: 0,
      length: 0,
      origin: {}
    };
  },

  getInitialState () {
    return {
      angle: this.props.initialAngle,
      knobWidth: 0,
      radius: 0
    };
  },

  componentDidMount () {
    this.setState({knobWidth: this.refs.knob.getDOMNode().offsetWidth});
  },

  componentWillUpdate (nextProps, nextState) {
    if (nextState.angle !== this.state.angle ||
        nextProps.length !== this.props.length && this.props.length !== 0) {
      this.props.onHandChange(nextState.angle);
    }
  },

  getMouseEventMap () {
    return {
      mousemove: this.onMouseMove,
      mouseup: this.onMouseUp
    };
  },

  getTouchEventMap () {
    return {
      touchmove: this.onTouchMove,
      touchend: this.onTouchEnd
    };
  },

  onMouseMove (event) {
    this.move(utils.events.getMousePosition(event));
  },

  onTouchMove (event) {
    this.move(utils.events.getTouchPosition(event));
  },

  onMouseUp () {
    this.end(this.getMouseEventMap());
  },

  onTouchEnd () {
    this.end(this.getTouchEventMap());
  },

  mouseStart (event) {
    utils.events.addEventsToDocument(this.getMouseEventMap());
    this.move(utils.events.getMousePosition(event));
  },

  touchStart (event) {
    utils.events.addEventsToDocument(this.getTouchEventMap());
    this.move(utils.events.getTouchPosition(event));
    utils.events.pauseEvent(event);
  },

  getPositionRadius (position) {
    let x = this.props.origin.x - position.x;
    let y = this.props.origin.y - position.y;
    return Math.sqrt(x * x + y * y);
  },

  trimAngleToValue (angle) {
    return this.props.step * Math.round(angle / this.props.step);
  },

  positionToAngle (position) {
    return utils.angle360FromPositions(this.props.origin.x, this.props.origin.y, position.x, position.y);
  },

  end (events) {
    if (this.props.onHandMoved) this.props.onHandMoved();
    utils.events.removeEventsFromDocument(events);
  },

  move (position) {
    let degrees = this.trimAngleToValue(this.positionToAngle(position));
    degrees = degrees === 360 ? 0 : degrees;
    if (this.state.angle !== degrees) this.setState({angle: degrees});
    if (this.props.onHandMove) this.props.onHandMove(this.getPositionRadius(position));
  },

  render () {
    let style = utils.prefixer({
      height: this.props.length - this.state.knobWidth / 2,
      transform: `rotate(${this.state.angle}deg)`
    });

    return (
      <div className={css.hand + ' ' + this.props.className} style={style}>
        <div ref='knob' className={css.knob}></div>
      </div>
    );
  }
});
