import React from 'react';
import FontIcon from '../../components/font_icon';

export default React.createClass({
  displayName: 'FontIconTest',

  render () {
    return (
      <section>
        <h2>Font Icon</h2>
        <p>lorem ipsum...</p>

        <FontIcon value="add"/>
        <FontIcon value="access_alarm"/>
        <FontIcon value="explore"/>
        <FontIcon value="zoom_in"/>
        <FontIcon value="input"/>
      </section>
    );
  }
});
