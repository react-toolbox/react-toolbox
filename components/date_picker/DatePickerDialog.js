import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import time from '../utils/time';

const factory = (Dialog, Calendar) => {
  class CalendarDialog extends Component {
    static propTypes = {
      active: PropTypes.bool,
      autoOk: PropTypes.bool,
      cancelLabel: PropTypes.string,
      className: PropTypes.string,
      disabledDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
      enabledDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
      locale: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
      ]),
      maxDate: PropTypes.instanceOf(Date),
      minDate: PropTypes.instanceOf(Date),
      name: PropTypes.string,
      okLabel: PropTypes.string,
      onDismiss: PropTypes.func,
      onEscKeyDown: PropTypes.func,
      onOverlayClick: PropTypes.func,
      onSelect: PropTypes.func,
      sundayFirstDayOfWeek: PropTypes.bool,
      theme: PropTypes.shape({
        button: PropTypes.string,
        calendarWrapper: PropTypes.string,
        date: PropTypes.string,
        dialog: PropTypes.string,
        header: PropTypes.string,
        monthsDisplay: PropTypes.string,
        year: PropTypes.string,
        yearsDisplay: PropTypes.string,
      }),
      value: PropTypes.instanceOf(Date),
    };

    static defaultProps = {
      active: false,
      cancelLabel: 'Cancel',
      className: '',
      okLabel: 'Ok',
      value: new Date(),
    };

    state = {
      display: 'months',
      date: this.props.value,
    };

    componentWillMount() {
      this.updateStateDate(this.props.value);
    }

    componentWillReceiveProps(nextProps) {
      this.updateStateDate(nextProps.value);
    }

    handleNewDate = (value, dayClick) => {
      const state = { display: 'months', date: value };
      if (time.dateOutOfRange(value, this.props.minDate, this.props.maxDate)) {
        if (this.props.maxDate && this.props.minDate) {
          state.date = time.closestDate(value, this.props.maxDate, this.props.minDate);
        } else {
          state.date = this.props.maxDate || this.props.minDate;
        }
      }
      this.setState(state);
      if (dayClick && this.props.autoOk && this.props.onSelect) {
        this.props.onSelect(value);
      }
    };

    handleSelect = (event) => {
      if (this.props.onSelect) this.props.onSelect(this.state.date, event);
    };

    handleSwitchDisplay = (event) => {
      this.setState({ display: event.target.id });
    };

    updateStateDate = (date) => {
      if (Object.prototype.toString.call(date) === '[object Date]') {
        this.handleNewDate(date, false);
      }
    };

    actions = [{
      label: this.props.cancelLabel,
      className: this.props.theme.button,
      onClick: this.props.onDismiss,
    }, {
      label: this.props.okLabel,
      className: this.props.theme.button,
      name: this.props.name,
      onClick: this.handleSelect,
    }];

    render() {
      const { theme } = this.props;
      const display = `${this.state.display}Display`;
      const className = classnames(theme.dialog, this.props.className);
      const headerClassName = classnames(theme.header, theme[display]);
      const shortDayOfWeek = time.getShortDayOfWeek(this.state.date.getDay(), this.props.locale);
      const shortMonth = time.getShortMonth(this.state.date, this.props.locale);
      const date = this.state.date.getDate();

      return (
        <Dialog
          actions={this.actions}
          active={this.props.active}
          className={className}
          onEscKeyDown={this.props.onEscKeyDown}
          onOverlayClick={this.props.onOverlayClick}
          type="custom"
        >
          <header className={headerClassName}>
            <span id="years" className={theme.year} onClick={this.handleSwitchDisplay}>
              {this.state.date.getFullYear()}
            </span>
            <h3 id="months" className={theme.date} onClick={this.handleSwitchDisplay}>
              {shortDayOfWeek}, {shortMonth} {date}
            </h3>
          </header>

          <div className={theme.calendarWrapper}>
            <Calendar
              disabledDates={this.props.disabledDates}
              display={this.state.display}
              enabledDates={this.props.enabledDates}
              handleSelect={this.handleSelect}
              maxDate={this.props.maxDate}
              minDate={this.props.minDate}
              onChange={this.handleNewDate}
              selectedDate={this.state.date}
              theme={this.props.theme}
              locale={this.props.locale}
              sundayFirstDayOfWeek={this.props.sundayFirstDayOfWeek}
            />
          </div>
        </Dialog>
      );
    }
  }

  return CalendarDialog;
};

export default factory;
