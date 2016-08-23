import React, { Component, PropTypes } from 'react';
import CssTransitionGroup from 'react-addons-css-transition-group';
import { ZoomIn, ZoomOut } from '../animations';
import time from '../utils/time.js';
import Hours from './ClockHours.js';
import Minutes from './ClockMinutes.js';

class Clock extends Component {
  static propTypes = {
    className: PropTypes.string,
    display: PropTypes.oneOf(['hours', 'minutes']),
    format: PropTypes.oneOf(['24hr', 'ampm']),
    onChange: PropTypes.func,
    onHandMoved: PropTypes.func,
    theme: PropTypes.shape({
      clock: PropTypes.string,
      clockWrapper: PropTypes.string,
      placeholder: PropTypes.string
    }),
    time: PropTypes.object
  };

  static defaultProps = {
    className: '',
    display: 'hours',
    format: '24hr',
    time: new Date()
  };

  state = {
    center: {x: null, y: null},
    radius: 0
  };

  componentDidMount () {
    window.addEventListener('resize', this.handleCalculateShape);
    setTimeout(() => {
      this.handleCalculateShape();
    });
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.handleCalculateShape);
  }

  handleHourChange = (hours) => {
    if (this.props.time.getHours() !== hours) {
      this.props.onChange(time.setHours(this.props.time, this.adaptHourToFormat(hours)));
    }
  };

  handleMinuteChange = (minutes) => {
    if (this.props.time.getMinutes() !== minutes) {
      this.props.onChange(time.setMinutes(this.props.time, minutes));
    }
  };

  handleCalculateShape = () => {
    const { top, left, width } = this.refs.placeholder.getBoundingClientRect();
    this.setState({
      center: { x: left + width / 2 - window.pageXOffset, y: top + width / 2 - window.pageXOffset },
      radius: width / 2
    });
  };

  adaptHourToFormat (hour) {
    if (this.props.format === 'ampm') {
      if (time.getTimeMode(this.props.time) === 'pm') {
        return hour < 12 ? hour + 12 : hour;
      } else {
        return hour === 12 ? 0 : hour;
      }
    } else {
      return hour;
    }
  }

  renderHours () {
    return (
      <Hours
        center={this.state.center}
        format={this.props.format}
        onChange={this.handleHourChange}
        radius={this.state.radius}
        selected={this.props.time.getHours()}
        spacing={this.state.radius * 0.18}
        onHandMoved={this.props.onHandMoved}
        theme={this.props.theme}
      />
    );
  }

  renderMinutes () {
    return (
      <Minutes
        center={this.state.center}
        onChange={this.handleMinuteChange}
        radius={this.state.radius}
        selected={this.props.time.getMinutes()}
        spacing={this.state.radius * 0.18}
        onHandMoved={this.props.onHandMoved}
        theme={this.props.theme}
      />
    );
  }

  render () {
    const { theme } = this.props;
    const animation = this.props.display === 'hours' ? ZoomOut : ZoomIn;
    return (
      <div data-react-toolbox='clock' className={theme.clock}>
        <div ref='placeholder' className={theme.placeholder} style={{height: this.state.radius * 2}}>
          <CssTransitionGroup transitionName={animation} transitionEnterTimeout={500} transitionLeaveTimeout={500}>
            <div key={this.props.display} className={theme.clockWrapper} style={{height: this.state.radius * 2}}>
              {this.props.display === 'hours' ? this.renderHours() : null}
              {this.props.display === 'minutes' ? this.renderMinutes() : null}
            </div>
          </CssTransitionGroup>
        </div>
      </div>
    );
  }
}

export default Clock;
