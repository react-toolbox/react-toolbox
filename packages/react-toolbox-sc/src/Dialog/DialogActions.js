import styled from 'styled-components';

const DialogActions = styled.div`
  align-items: flex-end;
  display: flex;
  justify-content: flex-end;
  padding: 8px;

  & > * {
    margin-left: 8px;
    min-width: 0;
  }
`;

export default DialogActions;
