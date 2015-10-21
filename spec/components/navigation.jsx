import React from 'react';
import autobind from 'autobind-decorator';
import Navigation from '../../components/navigation';

@autobind
export default class NavigationTest extends React.Component {
  state = {
    routes: [
      { label: 'Github', route: 'http://www.github.com', icon: 'bookmark' },
      { label: 'Mail', route: 'http://mail.google.com', icon: 'inbox' }
    ]
  };

  render () {
    return (
      <section>
        <h5>Navigation</h5>
        <p>lorem ipsum...</p>

        <Navigation type='vertical' routes={this.state.routes} />
      </section>
    );
  }
}
