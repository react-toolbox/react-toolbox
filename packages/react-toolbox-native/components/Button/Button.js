import React from 'react';
import { TouchableHighlight, Text } from 'react-native';
import styled from 'styled-components/native';
import buttonFactory from 'react-toolbox-core/src/components/Button';
import withRippleFactory from 'react-toolbox-core/src/hoc/withRipple';
import RippleWrapper from '../../hoc/withRipple/RippleWrapper';
import RippleNode from '../../hoc/withRipple/RippleNode';
import style from './style';

const ButtonNode = styled.View`
  ${style}
`;

const ButtonText = styled.Text`
  background-color: transparent;
  color: ${props => (props.primary ? '#FFF' : '#000')};
  justify-content: center;
  font-family: Roboto;
  font-weight: 700;
`;

export default buttonFactory({
  passthrough: ['primary', 'text'],
  ripple: withRippleFactory({
    passthrough: ['primary'],
    RippleNode: ({ primary, ...rest }) => (
      <RippleNode
        {...rest}
        color={primary ? '#FFF' : '#000'}
      />
    ),
    RippleWrapper,
  })(),
  ButtonNode: ({ children, primary, text, onPress, ...rest }) => {
    return (
      <ButtonNode primary={primary} {...rest}>
        {children}
        <TouchableHighlight onPress={onPress}>
          <Text primary={primary} >
            {text}
          </Text>
        </TouchableHighlight>
      </ButtonNode>
    );
  },
});
