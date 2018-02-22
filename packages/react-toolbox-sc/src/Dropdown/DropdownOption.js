import styled from 'styled-components';
import dropdownOptionFactory from 'react-toolbox-core/lib/components/Dropdown/DropdownOption';
import DefaultTemplate from './DefaultTemplate';
import { MenuItem } from '../Menu';

const DropdownOption = dropdownOptionFactory({
  DefaultTemplate: styled(DefaultTemplate)`padding: 0 16px;`,
  OptionNode: styled(MenuItem)`
    align-items: unset;
    line-height: 1.2;
    padding: 0;
  `,
});

export default DropdownOption;
