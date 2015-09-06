const React = window.React;
const css = require('./style');
const utils = require('../utils');

module.exports = React.createClass({
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

  _getMouseEventMap () {
    return {
      mousemove: this.onMouseMove,
      mouseup: this.onMouseUp
    };
  },

  _getTouchEventMap () {
    return {
      touchmove: this.onTouchMove,
      touchend: this.onTouchEnd
    };
  },

  onMouseMove (event) {
    this._move(utils.events.getMousePosition(event));
  },

  onTouchMove (event) {
    this._move(utils.events.getTouchPosition(event));
  },

  onMouseUp () {
    this._end(this._getMouseEventMap());
  },

  onTouchEnd () {
    this._end(this._getTouchEventMap());
  },

  mouseStart (event) {
    utils.events.addEventsToDocument(this._getMouseEventMap());
    this._move(utils.events.getMousePosition(event));
  },

  touchStart (event) {
    utils.events.addEventsToDocument(this._getTouchEventMap());
    this._move(utils.events.getTouchPosition(event));
    utils.events.pauseEvent(event);
  },

  _getPositionRadius (position) {
    let x = this.props.origin.x - position.x;
    let y = this.props.origin.y - position.y;
    return Math.sqrt(x * x + y * y);
  },

  _trimAngleToValue (angle) {
    return this.props.step * Math.round(angle / this.props.step);
  },

  _positionToAngle (position) {
    return utils.angle360FromPositions(this.props.origin.x, this.props.origin.y, position.x, position.y);
  },

  _end (events) {
    if (this.props.onHandMoved) this.props.onHandMoved();
    utils.events.removeEventsFromDocument(events);
  },

  _move (position) {
    let degrees = this._trimAngleToValue(this._positionToAngle(position));
    degrees = degrees === 360 ? 0 : degrees;
    if (this.state.angle !== degrees) this.setState({angle: degrees});
    if (this.props.onHandMove) this.props.onHandMove(this._getPositionRadius(position));
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
