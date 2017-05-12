import React from 'react';
import styled from 'styled-components';

const Diagram = () => (
  <Wrapper>
    <InputNodes>
      <Node>ButtonNode</Node>
      <Node>LinkNode</Node>
      <Node>IconNode</Node>
      <Node>ripple</Node>
    </InputNodes>
    <FactoryNode>
      <Node>createButton</Node>
    </FactoryNode>
    <ResultNode>
      <Node>&lt;MyButton <span>/</span>&gt;</Node>
    </ResultNode>
  </Wrapper>
);

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 0 auto;

  @media (max-width: 770px) {
    flex-direction: column;
  }
`;

const Node = styled.div`
  background: #FFFFFF;
  border: 1px solid #000000;
  font-size: 12px;
  font-weight: bold;
  line-height: 32px;
  margin: 8px auto;
  text-align: center;
  width: 140px;

  &:nth-child(1) {
    transform: translateX(0px);
  }
  &:nth-child(2) {
    transform: translateX(-30px);
  }
  &:nth-child(3) {
    transform: translateX(30px);
  }
  &:nth-child(4) {
    transform: translateX(-5px);
  }
`;

const InputNodes = styled.div`
  display: inline-block;
  padding: 20px 60px 20px 30px;

  @media (max-width: 770px) {
    padding: 10px 30px;
  }
`;

const FactoryNode = styled.div`
  border: 1px dashed #C8C8C8;
  display: inline-block;
  margin: 0 120px;
  padding: 44px 67px;
  position: relative;

  &::before {
    background: #000;
    content: '';
    height: 1px;
    left: 0;
    position: absolute;
    top: 50%;
    transform: translateX(-120px);
    width: 170px;
  }

  &::after {
    background: #000;
    content: '';
    height: 1px;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateX(120px);
    width: 170px;
  }

  @media (min-width: 770px) and (max-width: 1000px) {
    margin: 0 50px;
    padding: 24px 42px;

    &::before {
      left: 0;
      top: 50%;
      transform: translateX(-60px);
      width: 90px;
    }

    &::after {
      height: 1px;
      right: 0;
      top: 50%;
      transform: translateX(60px);
      width: 90px;
    }
  }

  @media (max-width: 770px) {
    margin: 60px auto;

    &::before {
      height: 80px;
      left: 50%;
      top: 0;
      transform: translateY(-60px);
      width: 1px;
    }

    &::after {
      bottom: 0;
      height: 80px;
      left: 50%;
      transform: translateY(40px);
      width: 1px;
    }
  }
`;

const ResultNode = styled.div`
  margin-right: 30px;
  padding: 0 30px;

  @media (min-width: 770px) and (max-width: 1000px) {
    margin-right: 10px;
  }

  @media (max-width: 770px) {
    margin-right: 0;
  }
`;

export default Diagram;
