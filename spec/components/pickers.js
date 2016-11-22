import React from 'react';
import DatePicker from '../../components/date_picker';
import TimePicker from '../../components/time_picker';


const datetime = new Date(2015, 10, 16);
const min_datetime = new Date(new Date(datetime).setDate(8));
const max_datetime = new Date(new Date(datetime).setDate(24));
datetime.setHours(17);
datetime.setMinutes(28);
const today = new Date();
today.setHours(0, 0, 0, 0);
const enabledDisabledDates = [new Date(today.getTime()), new Date(today.setDate(today.getDate() - 1))];

class PickersTest extends React.Component {
  state = {
    date2: datetime,
    firstActive: false,
    time2: datetime
  };

  handleChange = (item, value) => {
    const newState = {};
    newState.firstActive = false;
    newState[item] = value;
    this.setState(newState);
  };

  makeFirstUnactive = () => {
    this.setState({ firstActive: false });
  };

  localeExample = {
    months: 'urtarrila_otsaila_martxoa_apirila_maiatza_ekaina_uztaila_abuztua_iraila_urria_azaroa_abendua'.split('_'),
    monthsShort: 'urt._ots._mar._api._mai._eka._uzt._abu._ira._urr._aza._abe.'.split('_'),
    weekdays: 'igandea_astelehena_asteartea_asteazkena_osteguna_ostirala_larunbata'.split('_'),
    weekdaysShort: 'ig._al._ar._az._og._ol._lr.'.split('_'),
    weekdaysLetter: 'ig_al_ar_az_og_ol_lr'.split('_')
  }

  render () {
    return (
      <section>
        <h5>Pickers</h5>
        <p>Date pickers and time pickers with Material flavour.</p>

        <DatePicker
          active={this.state.firstActive}
          label='Birthdate'
          onChange={this.handleChange.bind(this, 'date1')}
          onEscKeyDown={this.makeFirstUnactive}
          onOverlayClick={this.makeFirstUnactive}
          value={this.state.date1}
          sundayFirstDayOfWeek
        />

        <DatePicker
          label='With locale (string) - Spanish (string: en|es|af|ar|be|bg|bn|bo|br|bs|ca|gl|eu|pt|it|fr)'
          locale='es'
          onChange={this.handleChange.bind(this, 'date2')}
          value={this.state.date2}
        />

        <DatePicker
          label='With locale (object) - Basque'
          locale={this.localeExample}
          onChange={this.handleChange.bind(this, 'date2')}
          value={this.state.date2}
        />

        <DatePicker
          label='Expiration date (Read Only)'
          maxDate={max_datetime}
          minDate={min_datetime}
          onChange={this.handleChange.bind(this, 'date2')}
          readonly
          value={this.state.date2}
          sundayFirstDayOfWeek
        />

        <DatePicker
          label='Formatted Date'
          inputFormat={(value) => `${value.getDate()}/${value.getMonth() + 1}/${value.getFullYear()}`}
          onChange={this.handleChange.bind(this, 'date3')}
          value={this.state.date3}
          sundayFirstDayOfWeek
        />

        <DatePicker
          label='Auto Picker'
          autoOk
          sundayFirstDayOfWeek
          onChange={this.handleChange.bind(this, 'date4')}
          value={this.state.date4}
        />

        <DatePicker
          label='Date picker with enabled dates'
          onChange={this.handleChange.bind(this, 'date5')}
          enabledDates={enabledDisabledDates}
          value={this.state.date5}
        />

        <DatePicker
          label='Date picker with disabled dates'
          onChange={this.handleChange.bind(this, 'date6')}
          disabledDates={enabledDisabledDates}
          value={this.state.date6}
        />

        <TimePicker
          label='Start time'
          onChange={this.handleChange.bind(this, 'time1')}
          onEscKeyDown={() => console.log('esc key down')}
          onOverlayClick={() => console.log('overlay click')}
          value={this.state.time1}
        />

        <TimePicker
          format='ampm'
          label='Finishing time (Read Only)'
          readonly
          onChange={this.handleChange.bind(this, 'time2')}
          value={this.state.time2}
        />
      </section>
    );
  }
}

export default PickersTest;
