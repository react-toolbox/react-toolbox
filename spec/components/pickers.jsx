/*eslint-disable no-unused-vars*/
import React from 'react';
import DatePicker from '../../components/date_picker';
import TimePicker from '../../components/time_picker';

const PickersTest = () => {
  const datetime = new Date(1995, 11, 17);
  datetime.setHours(17);
  datetime.setMinutes(28);

  return (
    <section>
      <h5>Pickers</h5>
      <p>Date pickers and time pickers with Material flavour.</p>

      <DatePicker />
      <DatePicker value={datetime} />

      <TimePicker />
      <TimePicker value={datetime} format='ampm' />
    </section>
  );
};

export default PickersTest;
