import styled from 'styled-components';

const DialogBody = styled.div`
  color: rgb(117, 117, 117);
  flex-grow: 2;
  padding: 24px;

  & h1 {
    color: rgb(0, 0, 0);
    flex-grow: 0;
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 0.02em;
    line-height: 1;
    margin: 0 0 20px;
  }

  & p {
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0;
    line-height: 24px;
    margin: 0;
  }
`;

export default DialogBody;
