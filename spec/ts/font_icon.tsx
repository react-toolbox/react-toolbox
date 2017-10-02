import * as React from 'react';
import FontIcon from '../../components/font_icon';

const FontIconTest = () => (
  <section>
    <h5>Font Icons</h5>
    <p>lorem ipsum...</p>

    <FontIcon value="add" alt="add icon" />
    <FontIcon value="access_alarm" />
    <FontIcon value="explore" alt="explore icon" />
    <FontIcon value="zoom_in" alt="zoom icon" />
    <FontIcon alt="input icon">input</FontIcon>
  </section>
);

export default FontIconTest;
