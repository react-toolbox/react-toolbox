import React from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import Calendar from './Calendar';
import Dialog from '../dialog';
import time from '../utils/time';

class CalendarDialog extends React.Component {
  static propTypes = {
    active: React.PropTypes.bool,
    autoOk: React.PropTypes.bool,
    className: React.PropTypes.string,
    maxDate: React.PropTypes.object,
    minDate: React.PropTypes.object,
    onDismiss: React.PropTypes.func,
    onSelect: React.PropTypes.func,
    theme: React.PropTypes.shape({
      button: React.PropTypes.string.isRequired,
      calendarWrapper: React.PropTypes.string.isRequired,
      date: React.PropTypes.string.isRequired,
      dialog: React.PropTypes.string.isRequired,
      header: React.PropTypes.string.isRequired,
      monthsDisplay: React.PropTypes.string.isRequired,
      year: React.PropTypes.string.isRequired,
      yearsDisplay: React.PropTypes.string.isRequired
    }),
    value: React.PropTypes.object
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
    { label: 'Ok', className: this.props.theme.button, onClick: this.handleSelect }
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
              selectedDate={this.state.date} />
          </div>
      </Dialog>
    );
  }
}

export default themr('ToolboxDatePicker')(CalendarDialog);
