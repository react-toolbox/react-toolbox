import React from 'react';
import style from './style';
import time from '../../utils/time';
import Hours from './hours';
import Minutes from './minutes';

class Clock extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    display: React.PropTypes.oneOf(['hours', 'minutes']),
    format: React.PropTypes.oneOf(['24hr', 'ampm']),
    time: React.PropTypes.object,
    onChange: React.PropTypes.func
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
    this.handleCalculateShape();
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
    const { top, left, width } = this.refs.wrapper.getBoundingClientRect();
    this.setState({
      center: { x: left + width / 2, y: top + width / 2 },
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
      />
    );
  }

  render () {
    return (
      <div data-react-toolbox='clock' className={style.root}>
        <div ref='wrapper' className={style.wrapper} style={{height: this.state.radius * 2}}>
          { this.props.display === 'hours' ? this.renderHours() : null }
          { this.props.display === 'minutes' ? this.renderMinutes() : null }
        </div>
      </div>
    );
  }
}

export default Clock;
