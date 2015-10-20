import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import style from './style';
import utils from '../../utils';

export default React.createClass({
  mixins: [PureRenderMixin],

  displayName: 'Hand',

  propTypes: {
    className: React.PropTypes.string,
    angle: React.PropTypes.number,
    onMove: React.PropTypes.func,
    onMoved: React.PropTypes.func
  },

  getDefaultProps () {
    return {
      className: '',
      angle: 0,
      length: 0,
      origin: {}
    };
  },

  getInitialState () {
    return { knobWidth: 0 };
  },

  componentDidMount () {
    this.setState({knobWidth: this.refs.knob.offsetWidth});
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
    if (this.props.onMoved) this.props.onMoved();
    utils.events.removeEventsFromDocument(events);
  },

  move (position) {
    let degrees = this.trimAngleToValue(this.positionToAngle(position));
    let radius = this.getPositionRadius(position);
    if (this.props.onMove) this.props.onMove(degrees === 360 ? 0 : degrees, radius);
  },

  render () {
    const className = `${style.hand} ${this.props.className}`;
    let handStyle = utils.prefixer({
      height: this.props.length - this.state.knobWidth / 2,
      transform: `rotate(${this.props.angle}deg)`
    });

    return (
      <div className={className} style={handStyle}>
        <div ref='knob' className={style.knob}></div>
      </div>
    );
  }
});
