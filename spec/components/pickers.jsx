/* global React */

import DatePicker from '../../components/date_picker';
import TimePicker from '../../components/time_picker';

export default React.createClass({
  displayName: 'PickersTest',

  render () {
    let datetime = new Date(1995, 11, 17);
    datetime.setHours(17);
    datetime.setMinutes(28);

    return (
      <section>
        <h2>Pickers</h2>
        <DatePicker />
        <DatePicker value={datetime} />
        <TimePicker value={datetime} />
        <TimePicker format="ampm" />
      </section>
    );
  }
});
