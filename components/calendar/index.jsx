const React = window.React;
const css = require('./style');
const utils = require('../utils');

const FontIcon = require('../font_icon');
const Month = require('./month');

const CTG = React.addons.CSSTransitionGroup;

module.exports = React.createClass({
  displayName: 'Calendar',

  propTypes: {
    display: React.PropTypes.oneOf(['months', 'years']),
    onChange: React.PropTypes.func,
    selectedDate: React.PropTypes.object,
    viewDate: React.PropTypes.object
  },

  getDefaultProps () {
    return {
      display: 'months',
      selectedDate: new Date()
    };
  },

  getInitialState () {
    return {
      selectedDate: this.props.selectedDate,
      viewDate: this.props.selectedDate
    };
  },

  componentDidUpdate (props, state) {
    if (this.refs.activeYear) this._scrollToActive();
    if (state.selectedDate.getTime() !== this.state.selectedDate.getTime() && this.props.onChange) {
      this.props.onChange(this.state.selectedDate);
    }
  },

  onDayClick (event) {
    this.setState({
      selectedDate: utils.time.setDay(this.state.viewDate, parseInt(event.target.textContent))
    });
  },

  onYearClick (event) {
    const date = utils.time.setYear(this.state.selectedDate, parseInt(event.target.textContent));
    this.setState({selectedDate: date, viewDate: date});
  },

  _scrollToActive () {
    this.refs.years.getDOMNode().scrollTop =
      this.refs.activeYear.getDOMNode().offsetTop -
      this.refs.years.getDOMNode().offsetHeight / 2 +
      this.refs.activeYear.getDOMNode().offsetHeight / 2;
  },

  incrementViewMonth () {
    this.setState({
      direction: 'right',
      viewDate: utils.time.addMonths(this.state.viewDate, 1)
    });
  },

  decrementViewMonth () {
    this.setState({
      direction: 'left',
      viewDate: utils.time.addMonths(this.state.viewDate, -1)
    });
  },

  renderYear (year) {
    let props = {
      className: year === this.state.viewDate.getFullYear() ? 'active' : '',
      key: `year-${year}`,
      onClick: this.onYearClick
    };

    if (year === this.state.viewDate.getFullYear()) {
      props.ref = 'activeYear';
    }

    return (<li {...props}>{ year }</li>);
  },

  renderYears () {
    return (
      <ul ref="years" className={css.years}>
        { utils.range(1900, 2100).map(i => { return this.renderYear(i); })}
      </ul>
    );
  },

  renderMonths () {
    return (
      <div className={this.state.direction}>
        <FontIcon className={css.prev} value='chevron_left' onClick={this.decrementViewMonth}/>
        <FontIcon className={css.next} value='chevron_right' onClick={this.incrementViewMonth}/>
        <CTG transitionName='slide-horizontal'>
          <Month
            key={this.state.viewDate.getMonth()}
            viewDate={this.state.viewDate}
            selectedDate={this.state.selectedDate}
            onDayClick={this.onDayClick} />
        </CTG>
      </div>
    );
  },

  render () {
    return (
      <div className={css.root}>
        { this.props.display === 'months' ? this.renderMonths() : this.renderYears() }
      </div>
    );
  }
});
