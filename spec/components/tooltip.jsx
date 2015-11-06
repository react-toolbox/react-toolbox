import React from 'react';
import Button from '../../components/button';
import Input from '../../components/input';
import Tooltip from '../../components/tooltip';

const TooltipTest = () => (
  <section>
    <h5>Tooltip</h5>
    <p>Give information on :hover</p>
    <Button kind='raised' primary label='Bookmark' icon='bookmark' tooltip='Bookmark Tooltip' />
    <Button kind='floating' primary accent icon='add' tooltip='Floating Tooltip' />
    <Button kind='floating' primary disabled icon='add' tooltip='Floating can not show' />
    <Input tooltip='lorem ipsum...'/>
    <p>
      Lorem ipsum dolor sit amet, <strong>consectetur<Tooltip label='This is a auto show tooltip' /></strong> adipiscing elit.
    </p>
  </section>
);

export default TooltipTest;
