import styled from 'styled-components';
import buttonFactory from '../../core/Button';
import withRippleFactory from '../../core/withRipple';
import RippleNode from '../withRipple/RippleNode';
import RippleWrapper from '../withRipple/RippleWrapper';
import style from './style';

const Button = buttonFactory({
  ripple: withRippleFactory({
    RippleNode,
    RippleWrapper: styled(RippleWrapper)`
      overflow: hidden;
    `,
  })(),
  ButtonNode: styled.button`${style}`,
});

export default Button;
