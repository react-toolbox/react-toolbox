import styled from 'styled-components';
import { buttonFactory, withRippleFactory } from 'react-toolbox-core';
import withOverride from '../utils/withOverride';
import RippleNode from '../withRipple/RippleNode';
import RippleWrapper from '../withRipple/RippleWrapper';
import ButtonNode from './ButtonNode';
import LinkNode from './LinkNode';

const Button = buttonFactory({
  passthrough: ['overrides', 'floating'],
  LinkNode,
  ButtonNode,
});

const withRipple = withRippleFactory({
  passthrough: ['overrides', 'floating'],
  RippleNode,
  RippleWrapper: styled(RippleWrapper)`
    border-radius: ${props => (props.floating ? '50%' : '2px')};
    overflow: hidden;
    ${withOverride('RippleWrapper')};
  `,
});

export default withRipple()(Button);
