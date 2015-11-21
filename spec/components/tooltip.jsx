import React from 'react';
import Button from '../../components/button';
import Input from '../../components/input';
import Tooltip from '../../components/tooltip';

const TooltipTest = () => (
  <section>
    <h5>Tooltip</h5>
    <p>Give information on :hover</p>
    <Button label='Bookmark' icon='bookmark' raised primary tooltip='Bookmark Tooltip' tooltipDelay={1000} />
    <Button icon='add' floating accent tooltip='Floating Tooltip'/>
    <Button icon='add' floating disabled tooltip='Floating can not be shown' />
    <Input tooltip='lorem ipsum...' />
    <p>
      Lorem ipsum dolor sit amet, <strong>consectetur<Tooltip label='This is a auto show tooltip' delay={300} /></strong> adipiscing elit.
    </p>
  </section>
);

export default TooltipTest;
