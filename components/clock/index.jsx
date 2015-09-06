const React = window.React;

const css = require('./style');
const Hours = require('./hours');
const Minutes = require('./minutes');
const utils = require('../utils/date-time');

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
    window.addEventListener('resize', this.handleResize);
    this.setState({radius: this._getRadius()});
  },

  componentWillUpdate (props, state) {
    let center = this._getCenter();
    let { x: cx, y: cy } = center;
    let { x: sx, y: sy } = this.state.center;

    if (sx !== cx || sy !== cy) {
      this.setState({center: center});
    }

    if (state.time.getTime() !== this.state.time.getTime() && this.props.onChange) {
      this.props.onChange(state.time);
    }
  },

  componentWillUnmount () {
    window.removeEventListener('resize', this.handleResize);
  },

  onHourChange (hours) {
    this.setState({time: utils.setHours(this.state.time, this._adaptHourToFormat(hours))});
  },

  onMinuteChange (minutes) {
    this.setState({time: utils.setMinutes(this.state.time, minutes)});
  },

  _getRadius () {
    return this.refs.wrapper.getDOMNode().getBoundingClientRect().width / 2;
  },

  _adaptHourToFormat (hour) {
    if (this.props.format === 'ampm') {
      if (utils.getTimeMode(this.state.time) === 'pm') {
        return hour < 12 ? hour + 12 : hour;
      } else {
        return hour === 12 ? 0 : hour;
      }
    } else {
      return hour;
    }
  },

  handleResize () {
    this.setState({
      center: this._getCenter(),
      radius: this._getRadius()
    });
  },

  _getCenter () {
    let { left, right, top, bottom } = this.getDOMNode().getBoundingClientRect();
    return {
      x: left + (right - left) / 2,
      y: top + (bottom - top) / 2
    };
  },

  toggleTimeMode () {
    this.setState({time: utils.toggleTimeMode(this.state.time)});
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
