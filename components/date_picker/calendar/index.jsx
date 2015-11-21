import React from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import { SlideLeft, SlideRight } from '../../animations';
import FontIcon from '../../font_icon';
import Ripple from '../../ripple';
import Month from './month';
import time from '../../utils/time';
import utils from '../../utils/utils';
import style from './style';

class Calendar extends React.Component {
  static propTypes = {
    display: React.PropTypes.oneOf(['months', 'years']),
    maxDate: React.PropTypes.object,
    minDate: React.PropTypes.object,
    onChange: React.PropTypes.func,
    selectedDate: React.PropTypes.object,
    viewDate: React.PropTypes.object
  };

  static defaultProps = {
    display: 'months',
    selectedDate: new Date()
  };

  state = {
    viewDate: this.props.selectedDate
  };

  componentDidUpdate () {
    if (this.refs.activeYear) {
      this.scrollToActive();
    }
  }

  scrollToActive () {
    this.refs.years.scrollTop =
      this.refs.activeYear.offsetTop -
      this.refs.years.offsetHeight / 2 +
      this.refs.activeYear.offsetHeight / 2;
  }

  handleDayClick = (day) => {
    this.props.onChange(time.setDay(this.state.viewDate, day));
  };

  handleYearClick = (year) => {
    const viewDate = time.setYear(this.props.selectedDate, year);
    this.setState({viewDate});
    this.props.onChange(viewDate);
  };

  incrementViewMonth = () => {
    this.refs.rippleRight.start(event);
    this.setState({
      direction: 'right',
      viewDate: time.addMonths(this.state.viewDate, 1)
    });
  };

  decrementViewMonth = () => {
    this.refs.rippleLeft.start(event);
    this.setState({
      direction: 'left',
      viewDate: time.addMonths(this.state.viewDate, -1)
    });
  };

  renderYear (year) {
    const props = {
      className: year === this.state.viewDate.getFullYear() ? style.active : '',
      key: year,
      onClick: this.handleYearClick.bind(this, year)
    };

    if (year === this.state.viewDate.getFullYear()) {
      props.ref = 'activeYear';
    }

    return <li {...props}>{ year }</li>;
  }

  renderYears () {
    return (
      <ul ref="years" className={style.years}>
        { utils.range(1900, 2100).map((i) => { return this.renderYear(i); })}
      </ul>
    );
  }

  renderMonths () {
    const animation = this.state.direction === 'left' ? SlideLeft : SlideRight;
    return (
      <div data-react-toolbox='calendar'>
        <FontIcon className={style.prev} value='chevron-left' onMouseDown={this.decrementViewMonth}>
          <Ripple ref='rippleLeft' className={style.ripple} spread={1.2} centered />
        </FontIcon>
        <FontIcon className={style.next} value='chevron-right' onMouseDown={this.incrementViewMonth}>
          <Ripple ref='rippleRight' className={style.ripple} spread={1.2} centered />
        </FontIcon>
        <CSSTransitionGroup transitionName={animation} transitionEnterTimeout={350} transitionLeaveTimeout={350}>
          <Month
            key={this.state.viewDate.getMonth()}
            maxDate={this.props.maxDate}
            minDate={this.props.minDate}
            viewDate={this.state.viewDate}
            selectedDate={this.props.selectedDate}
            onDayClick={this.handleDayClick} />
        </CSSTransitionGroup>
      </div>
    );
  }

  render () {
    return (
      <div className={style.root}>
        { this.props.display === 'months' ? this.renderMonths() : this.renderYears() }
      </div>
    );
  }
}

export default Calendar;
