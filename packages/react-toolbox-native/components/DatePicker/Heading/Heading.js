import React from 'react';
import styled from 'styled-components/native';
import DateView from './DateView';

const Heading = ({ from, to }) => (
  <HeadingLayout>
    <DateView start date={from} />
    <DateSeparator>
      <DateSeparatorInner />
    </DateSeparator>
    <DateView date={to} />
  </HeadingLayout>
);

const HeadingLayout = styled.View`
  flex-direction: row;
  padding: 20;
`

const DateSeparator = styled.View`
  flex-direction: column;
`

const DateSeparatorInner = styled.View`
  border-top-color: #fff;
  border-top-width: 0.5;
  flex: 1;
  transform: rotate(135deg) translateX(-18) translateY(-20);
  width: 70;
`;

export default Heading;
