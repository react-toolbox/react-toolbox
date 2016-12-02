import React from 'react';
import Button from '../../components/button';
import Input from '../../components/input';
import Tooltip from '../../components/tooltip';
import Chip from '../../components/chip';
import Avatar from '../../components/avatar';

const TooltipButton = Tooltip(Button);
const TooltipInput = Tooltip(Input);
const TooltipStrong = Tooltip(({children, ...other}) => {
  delete other.theme;
  return <strong {...other}>{children}</strong>;
});
const TooltipStrongDirect = Tooltip('strong');
const ChipTooltip = Tooltip(Chip);

const TooltipTest = () => (
  <section>
    <h5>Tooltip</h5>
    <p>Give information on :hover</p>
    <TooltipButton label='Bookmark' icon='bookmark' raised primary tooltip='Bookmark Tooltip' tooltipDelay={1000} />
    <TooltipButton icon='add' floating accent tooltip='Floating Tooltip' />
    <TooltipButton icon='add' floating disabled tooltip='Floating can not be shown' />
    <TooltipButton
      icon='add'
      floating
      tooltip={<div><p>An example with</p><p>Multiline!</p></div>}
    />
    <ChipTooltip tooltip='Dolor sit amet' tooltipPosition='top'>
      <Avatar icon='home'/>
      <span>Tooltip in a chip</span>
    </ChipTooltip>
    <TooltipInput tooltip='lorem ipsum...' />
    <p>Lorem ipsum dolor sit amet, <TooltipStrong tooltip='This is a auto show tooltip'>consectetur</TooltipStrong> adipiscing elit.</p>
    <p>
      Click this next word to show and hide on click:
      {' '}
      <TooltipStrongDirect tooltip='This is a auto show tooltip' tooltipShowOnClick>
        oh hai
      </TooltipStrongDirect>
      {' '}. This is useful for mobile!
    </p>
  </section>
);

export default TooltipTest;
