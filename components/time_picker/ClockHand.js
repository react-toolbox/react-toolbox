import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { angle360FromPositions } from '../utils/utils';
import events from '../utils/events';
import prefixer from '../utils/prefixer';

class Hand extends Component {
  static propTypes = {
    angle: PropTypes.number,
    className: PropTypes.string,
    length: PropTypes.number,
    onMove: PropTypes.func,
    onMoved: PropTypes.func,
    origin: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }),
    step: PropTypes.number,
    theme: PropTypes.shape({
      hand: PropTypes.string,
      knob: PropTypes.string,
    }),
  };

  static defaultProps = {
    className: '',
    angle: 0,
    length: 0,
    origin: {},
  };

  state = {
    knobWidth: 0,
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ knobWidth: this.knobNode.offsetWidth });
    });
  }

  componentWillUnmount() {
    events.removeEventsFromDocument(this.getMouseEventMap());
    events.removeEventsFromDocument(this.getTouchEventMap());
  }

  getMouseEventMap() {
    return {
      mousemove: this.handleMouseMove,
      mouseup: this.handleMouseUp,
    };
  }

  getTouchEventMap() {
    return {
      touchmove: this.handleTouchMove,
      touchend: this.handleTouchEnd,
    };
  }

  getPositionRadius(position) {
    const x = this.props.origin.x - position.x;
    const y = this.props.origin.y - position.y;
    return Math.sqrt((x * x) + (y * y));
  }

  mouseStart(event) {
    events.addEventsToDocument(this.getMouseEventMap());
    this.move(events.getMousePosition(event));
  }

  touchStart(event) {
    events.addEventsToDocument(this.getTouchEventMap());
    this.move(events.getTouchPosition(event));
    events.pauseEvent(event);
  }

  handleMouseMove = (event) => {
    this.move(events.getMousePosition(event));
  };

  handleTouchMove = (event) => {
    this.move(events.getTouchPosition(event));
  };

  handleMouseUp = () => {
    this.end(this.getMouseEventMap());
  };

  handleTouchEnd = () => {
    this.end(this.getTouchEventMap());
  };

  trimAngleToValue(angle) {
    return this.props.step * Math.round(angle / this.props.step);
  }

  positionToAngle(position) {
    return angle360FromPositions(this.props.origin.x, this.props.origin.y, position.x, position.y);
  }

  end(evts) {
    if (this.props.onMoved) this.props.onMoved();
    events.removeEventsFromDocument(evts);
  }

  move(position) {
    const degrees = this.trimAngleToValue(this.positionToAngle(position));
    const radius = this.getPositionRadius(position);
    if (this.props.onMove) this.props.onMove(degrees === 360 ? 0 : degrees, radius);
  }

  render() {
    const { theme } = this.props;
    const className = `${theme.hand} ${this.props.className}`;
    const handStyle = prefixer({
      height: this.props.length - (this.state.knobWidth / 2),
      transform: `rotate(${this.props.angle}deg)`,
    });

    return (
      <div className={className} style={handStyle}>
        <div ref={(node) => { this.knobNode = node; }} className={theme.knob} />
      </div>
    );
  }
}

export default Hand;
