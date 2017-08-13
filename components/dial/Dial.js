import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Hand from './Hand';
import Face from './Face';

class Dial extends Component {
  static propTypes = {
    numbers: PropTypes.arrayOf(PropTypes.number),
    onChange: PropTypes.func,
    selected: PropTypes.number,
    theme: PropTypes.shape({
      clock: PropTypes.string,
      clockWrapper: PropTypes.string,
      placeholder: PropTypes.string,
    }),
  };

  static defaultProps = {
    selected: 0,
    onChange: null,
  };

  state = {
    center: { x: null, y: null },
    radius: 0,
  };

  componentDidMount() {
    window.addEventListener('resize', this.handleCalculateShape);
    setTimeout(() => {
      this.handleCalculateShape();
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleCalculateShape);
  }

  handleCalculateShape = () => {
    const { top, left, width } = this.placeholderNode.getBoundingClientRect();
    this.setState({
      center: {
        x: left + ((width / 2) - window.pageXOffset),
        y: top + ((width / 2) - window.pageXOffset),
      },
      radius: width / 2,
    });
  };

  handleHandMove = (degrees) => {
    const step = 360 / this.props.numbers.length;
    this.props.onChange(this.props.numbers[degrees / step]);
  };

  handleMouseDown = (event) => {
    this.handNode.mouseStart(event);
  };

  handleTouchStart = (event) => {
    this.handNode.touchStart(event);
  };

  render() {
    const step = 360 / this.props.numbers.length;
    const { theme } = this.props;
    return (
      <div data-react-toolbox="clock" className={theme.clock}>
        <div
          className={theme.placeholder}
          style={{ height: this.state.radius * 2 }}
          ref={(node) => { this.placeholderNode = node; }}
        >
          <div
            className={theme.clockWrapper}
            style={{ height: this.state.radius * 2 }}
          >
            <div>
              <Face
                onTouchStart={this.handleTouchStart}
                onMouseDown={this.handleMouseDown}
                numbers={this.props.numbers}
                spacing={this.state.radius * 0.18}
                radius={this.state.radius}
                active={this.props.selected}
                theme={this.props.theme}
              />
              <Hand
                ref={(node) => { this.handNode = node; }}
                angle={this.props.selected * step}
                length={this.state.radius - (this.state.radius * 0.18)}
                onMove={this.handleHandMove}
                origin={this.state.center}
                theme={this.props.theme}
                step={step}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dial;
