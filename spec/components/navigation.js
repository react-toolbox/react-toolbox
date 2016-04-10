import React from 'react';
import Navigation from '../../components/navigation';
import Link from '../../components/link';

const actions = [
  { label: 'Alarm', raised: true, icon: 'access_alarm'},
  { label: 'Location', raised: true, accent: true, icon: 'room'}
];

const NavigationTest = () => (
  <section>
    <h5>Navigation</h5>
    <p>lorem ipsum...</p>
    <Navigation type='horizontal' actions={actions} />
    <Navigation type='vertical'>
      <Link href='http://' label='Inbox' icon='inbox' />
      <Link href='http://' active label='Profile' icon='person' />
    </Navigation>
  </section>
);

export default NavigationTest;
