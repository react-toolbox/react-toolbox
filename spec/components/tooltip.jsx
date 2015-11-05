import React from 'react';
import Button from '../../components/button';
import Input from '../../components/input';

const TooltipTest = () => (
  <section>
    <h5>Tooltip</h5>
    <p>Give information on :hover</p>
    <Button kind='raised' primary label='Bookmark' icon='bookmark' tooltip='Bookmark Tooltip' />
    <Button kind='floating' primary accent icon='add' tooltip='Floating Tooltip' />
    <Button kind='floating' primary disabled icon='add' tooltip='Floating can not show' />
    <Input tooltip='lorem ipsum...'/>
  </section>
);

export default TooltipTest;
