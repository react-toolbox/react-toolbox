const React = window.React;
const css = require('./style');
const time = require('../utils/time');

const Hours = require('./hours');
const Minutes = require('./minutes');

module.exports = React.createClass({
  displayName: 'Clock',

  propTypes: {
    className: React.PropTypes.string,
    display: React.PropTypes.oneOf(['hours', 'minutes']),
    format: React.PropTypes.oneOf(['24hr', 'ampm']),
    initialTime: React.PropTypes.object,
    onChange: React.PropTypes.func
  },

  getDefaultProps () {
    return {
      className: '',
      display: 'hours',
      format: '24hr',
      initialTime: new Date()
    };
  },

  getInitialState () {
    return {
      center: {x: null, y: null},
      radius: 0,
      time: this.props.initialTime
    };
  },

  componentDidMount () {
    window.addEventListener('resize', this.calculateShape);
    this.calculateShape();
  },

  componentWillUpdate (props, state) {
    if (state.time.getTime() !== this.state.time.getTime() && this.props.onChange) {
      this.props.onChange(state.time);
    }
  },

  componentWillUnmount () {
    window.removeEventListener('resize', this.calculateShape);
  },

  onHourChange (hours) {
    if (this.state.time.getHours() !== hours) {
      this.setState({time: time.setHours(this.state.time, this._adaptHourToFormat(hours))});
    }
  },

  onMinuteChange (minutes) {
    if (this.state.time.getMinutes() !== minutes) {
      this.setState({time: time.setMinutes(this.state.time, minutes)});
    }
  },

  _adaptHourToFormat (hour) {
    if (this.props.format === 'ampm') {
      if (time.getTimeMode(this.state.time) === 'pm') {
        return hour < 12 ? hour + 12 : hour;
      } else {
        return hour === 12 ? 0 : hour;
      }
    } else {
      return hour;
    }
  },

  calculateShape () {
    let { top, left, width } = this.refs.wrapper.getDOMNode().getBoundingClientRect();
    this.setState({
      center: { x: left + width / 2, y: top + width / 2 },
      radius: width / 2
    });
  },

  toggleTimeMode () {
    this.setState({time: time.toggleTimeMode(this.state.time)});
  },

  renderHours () {
    return (
      <Hours
        center={this.state.center}
        format={this.props.format}
        onChange={this.onHourChange}
        radius={this.state.radius}
        selected={this.state.time.getHours()}
        spacing={this.state.radius * 0.16} />
    );
  },

  renderMinutes () {
    return (
      <Minutes
        center={this.state.center}
        onChange={this.onMinuteChange}
        radius={this.state.radius}
        selected={this.state.time.getMinutes()}
        spacing={this.state.radius * 0.16} />
    );
  },

  render () {
    return (
      <div className={css.root}>
        <div ref="wrapper" className={css.wrapper} style={{height: this.state.radius * 2}}>
          { this.props.display === 'hours' ? this.renderHours() : '' }
          { this.props.display === 'minutes' ? this.renderMinutes() : '' }
        </div>
      </div>
    );
  }
});
