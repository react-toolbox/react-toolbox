import { createRef } from 'react';
import {
  Button,
  Input,
  Slider,
  ThemeProvider,
  useRipple,
  type InputHandle,
  type SliderProps,
  type ThemeVariables,
} from 'react-toolbox';
import DirectInput from 'react-toolbox/input/Input';
import { Button as SubpathButton } from 'react-toolbox/button';

const ref = createRef<InputHandle>();
const slider: SliderProps = { value: 0.5, step: 0.1, onChange: (value) => value.toFixed(1) };
const variables: ThemeVariables = { '--rt-color-primary': '#456789' };
export const packaged = (
  <ThemeProvider variables={variables}>
    <Button label="Save" />
    <SubpathButton label="Direct" />
    <Input ref={ref} />
    <DirectInput ref={ref} />
    <Slider {...slider} />
  </ThemeProvider>
);
export const rippleHook: typeof useRipple = useRipple;
