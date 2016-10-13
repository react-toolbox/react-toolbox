import React from 'react';
import FontIcon from '../../components/font_icon';

const FontIconTest = () => (
  <section>
    <h5>Font Icons</h5>
    <p>lorem ipsum...</p>

    <FontIcon value="add"/>
    <FontIcon value="access_alarm"/>
    <FontIcon value="explore"/>
    <FontIcon value="zoom_in"/>
    <FontIcon>input</FontIcon>

    <h5>Using FontAwesome</h5>
    Basic: <FontIcon value="fa:leaf"/>
    <br />
    With modifiers: <FontIcon value="fa:cog:spin"/> <FontIcon value="fa:cog:border"/>

    <h5>font awesome inline with text</h5>
    <div>
      <FontIcon value="fa:search-plus:fw"/>
      Some text
    </div>
  </section>
);

export default FontIconTest;
