import * as React from 'react';
import Button from '../../components/button';
import Input from '../../components/input';
import FontIcon from '../../components/font_icon';
import Tooltip, { tooltipFactory } from '../../components/tooltip';
import Chip from '../../components/chip';
import Avatar from '../../components/avatar';

const TooltipFontIcon = tooltipFactory({ passthrough: false, showCaret: false })(FontIcon);
const TooltipButton = Tooltip(Button);
const TooltipInput = Tooltip(Input);
const TooltipStrong = Tooltip(({ children,...other }) => {
  delete other.theme;
  return <strong {...other}>{children}</strong>;
});
const TooltipStrongDirect = Tooltip('strong');
const ChipTooltip = Tooltip(Chip);

const TooltipTest = () => (
  <section>
    <h5>Tooltip</h5>
    <p>Give information on :hover</p>
    <TooltipButton label="Bookmark" icon="bookmark" raised primary tooltip="Bookmark Tooltip" tooltipDelay={1000} showCaret={false} />
    <TooltipButton icon="add" floating accent tooltip="Floating Tooltip" showCaret={false} />
    <TooltipButton icon="add" floating disabled tooltip="Floating can not be shown" showCaret={false} />
    <TooltipButton
      icon="add"
      floating
      tooltip={<div><p>An example with</p><p>Multiline!</p></div>}
      showCaret={false}
    />
    <ChipTooltip tooltip="Dolor sit amet" tooltipPosition="top" showCaret={false}>
      <Avatar icon="home" />
      <span>Tooltip in a chip</span>
    </ChipTooltip>
    <TooltipInput tooltip="lorem ipsum..." showCaret={false}/>
    <p>Lorem ipsum dolor sit amet, <TooltipStrong tooltip="This is a auto show tooltip" showCaret={false}>consectetur</TooltipStrong> adipiscing elit.</p>
    <p>
      Click this next word to show and hide on click:
      {' '}
      <TooltipStrongDirect tooltip="This is a auto show tooltip" tooltipShowOnClick showCaret={false}>
        oh hai
      </TooltipStrongDirect>
      {' '}. This is useful for mobile!
    </p>
    <TooltipFontIcon value="code" tooltip="This is a test with FontIcon" showCaret={false} />
    <br />
    Using carets in tooltip:
    <br />
    <ChipTooltip tooltip="I am on top" tooltipPosition="top" showCaret>
      <Avatar icon="home" />
      <span>Tooltip in a chip on top</span>
    </ChipTooltip>
    <ChipTooltip tooltip="I am on bottom" tooltipPosition="bottom" showCaret>
      <Avatar icon="home" />
      <span>Tooltip in a chip on bottom</span>
    </ChipTooltip>
    <ChipTooltip tooltip="I am on right" tooltipPosition="right" showCaret>
      <Avatar icon="home" />
      <span>Tooltip in a chip on right</span>
    </ChipTooltip>
    <ChipTooltip tooltip="I am on left" tooltipPosition="left" showCaret>
      <Avatar icon="home" />
      <span>Tooltip in a chip on left</span>
    </ChipTooltip>
    <TooltipButton icon="add" floating accent tooltip="Floating Tooltip" showCaret/>
  </section>
);

export default TooltipTest;
