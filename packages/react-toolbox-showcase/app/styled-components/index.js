import React from 'react';
import { injectGlobal } from 'styled-components';
import ButtonExamples from './ButtonExamples';
import DatePickerExamples from './DatePickerExamples';
import DialogExamples from './DialogExamples';

injectGlobal`
  body {
    font-family: 'Roboto', sans-serif;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    font-smoothing: antialiased;
    text-size-adjust: 100%;
    -webkit-touch-callout: none;
  }
`

const StyledComponents = () => (
  <div>
    <ButtonExamples />
    <DatePickerExamples />
    <DialogExamples />
  </div>
);

export default StyledComponents;
