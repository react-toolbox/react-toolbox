/* eslint-disable no-unused-expressions */
import React from 'react';
import { injectGlobal } from 'styled-components';
import AvatarExamples from './AvatarExamples';
import ButtonExamples from './ButtonExamples';
import DialogExamples from './DialogExamples';
import DropdownExamples from './DropdownExamples';
import ListExamples from './ListExamples';
import MenuExamples from './MenuExamples';

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
`;

const StyledComponents = () => (
  <div>
    <AvatarExamples />
    <ButtonExamples />
    <DialogExamples />
    <DropdownExamples />
    <ListExamples />
    <MenuExamples />
  </div>
);

export default StyledComponents;
