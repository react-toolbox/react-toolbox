import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import time from '../utils/time.js';

const factory = (Dialog, Calendar) => {
  class CalendarDialog extends Component {
    static propTypes = {
      active: PropTypes.bool,
      autoOk: PropTypes.bool,
      className: PropTypes.string,
      maxDate: PropTypes.object,
      minDate: PropTypes.object,
      name: PropTypes.string,
      onDismiss: PropTypes.func,
      onSelect: PropTypes.func,
      theme: PropTypes.shape({
        button: PropTypes.string,
        calendarWrapper: PropTypes.string,
        date: PropTypes.string,
        dialog: PropTypes.string,
        header: PropTypes.string,
        monthsDisplay: PropTypes.string,
        year: PropTypes.string,
        yearsDisplay: PropTypes.string
      }),
      value: PropTypes.object
    };

    static defaultProps = {
      active: false,
      className: '',
      value: new Date()
    };

    state = {
      display: 'months',
      date: this.props.value
    };

    componentWillMount () {
      this.updateStateDate(this.props.value);

    }

    componentWillReceiveProps (nextProps) {
      this.updateStateDate(nextProps.value);
    }

    handleCalendarChange = (value, dayClick) => {
      const state = {display: 'months', date: value};
      if (time.dateOutOfRange(value, this.props.minDate, this.props.maxDate)) {
        state.date = this.props.maxDate || this.props.minDate;
      }
      this.setState(state);
      if (dayClick && this.props.autoOk && this.props.onSelect) {
        this.props.onSelect(value);
      }
    };

    handleSelect = (event) => {
      if (this.props.onSelect) this.props.onSelect(this.state.date, event);
    };

    handleSwitchDisplay = (display) => {
      this.setState({ display });
    };

    updateStateDate = (date) => {
      if (Object.prototype.toString.call(date) === '[object Date]') {
        this.setState({
          date
        });
      }
    }

    actions = [
      { label: 'Cancel', className: this.props.theme.button, onClick: this.props.onDismiss },
      { label: 'Ok', className: this.props.theme.button, name: this.props.name, onClick: this.handleSelect }
    ];

    render () {
      const { theme } = this.props;
      const display = `${this.state.display}Display`;
      const className = classnames(theme.dialog, this.props.className);
      const headerClassName = classnames(theme.header, theme[display]);

      return (
        <Dialog active={this.props.active} type="custom" className={className} actions={this.actions}>
          <header className={headerClassName}>
            <span className={theme.year} onClick={this.handleSwitchDisplay.bind(this, 'years')}>
              {this.state.date.getFullYear()}
            </span>
            <h3 className={theme.date} onClick={this.handleSwitchDisplay.bind(this, 'months')}>
              {time.getShortDayOfWeek(this.state.date.getDay())}, {time.getShortMonth(this.state.date)} {this.state.date.getDate()}
            </h3>
          </header>

          <div className={theme.calendarWrapper}>
            <Calendar
              display={this.state.display}
              maxDate={this.props.maxDate}
              minDate={this.props.minDate}
              onChange={this.handleCalendarChange}
              selectedDate={this.state.date}
              theme={this.props.theme} />
          </div>
        </Dialog>
      );
    }
  }

  return CalendarDialog;
};

export default factory;
