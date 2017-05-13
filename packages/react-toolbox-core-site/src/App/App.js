import React, { Component } from 'react';
import styled from 'styled-components';
import Diagram from './Diagram';
import MovingClaim from './MovingClaim';

// -- images
import box from './box.svg';
import circle from './circle.svg';
import logo from './rt-core-logo.svg';
import menu from './menu.svg';
import square from './square.svg';
import star from './star.svg';

class App extends Component {
  render() {
    return (
      <MainWrapper>
        <ContentWrapper>
          <Header>
            <Banner><Box src={box} />react-toolbox-core</Banner>
            <Menu><MenuLabel>Menu</MenuLabel> <MenuIcon src={menu} /></Menu>
          </Header>
        </ContentWrapper>

        <ContentWrapper>
          <Logo src={logo} alt="React Toolbox Core logo" />
          <Title>
            <Strong>Build</Strong> your custom <Strong>react ui-kit</Strong> from a reliable set of agnostic <Strong>components</Strong>
          </Title>
        </ContentWrapper>

        <ClaimsSection>
          <Diagram />
          <Claims>
            <Claim>
              <ClaimImage src={star} />
              <ClaimTitle>Just the logic</ClaimTitle>
              <ClaimDescription>You provide styled components, we orchestrate presentation and communication logic</ClaimDescription>
            </Claim>
            <Claim>
              <ClaimImage src={circle} />
              <ClaimTitle>Fully customizable</ClaimTitle>
              <ClaimDescription>Use component depency injection and property mappers to get the a custom ui architecture</ClaimDescription>
            </Claim>
            <Claim>
              <ClaimImage src={square} />
              <ClaimTitle>Platform agnostic</ClaimTitle>
              <ClaimDescription>Use the same core logic to build both react and react native components </ClaimDescription>
            </Claim>
          </Claims>
          <MovingClaim duration={10}>
            highly tested —·— beautiful developer experience —·— only well crafted components
          </MovingClaim>
        </ClaimsSection>

        <ButtonsSection>
          <BigButton primary>github</BigButton>
          <BigButton>read the article 👍</BigButton>
        </ButtonsSection>
      </MainWrapper>
    );
  }
}

const MainWrapper = styled.div`
  border: 1px solid #000;
`;

const ContentWrapper = styled.div`
  margin: 0 auto;
  max-width: 1224px;
  padding: 0 14px;
  text-align: center;
`;

// -- Header
const Header = styled.header`
  align-items: center;
  display: flex;
  flex-direction: flex-start;
  line-height: 20px;
  padding: 14px 0;
`;

const Banner = styled.div`
  align-content: center;
  display: flex;
  flex-grow: 1;
  font-size: 14px;
  line-height: 20px;
`;

const Menu = styled.div`
  align-content: center;
  display: flex;
  font-size: 14px;
  line-height: 20px;
  text-transform: uppercase;
`;

const MenuLabel = styled.span`
  @media (max-width: 480px) {
    display: none;
  }
`;

const MenuIcon = styled.img`
  height: 20px;
  margin-left: 10px;
  width: 20px;
`;

// -- Title section
const Logo = styled.img`
  height: auto;
  margin-top: 20px;
  width: 120px;
`

const Box = styled.img`
  height: 20px;
  margin-right: 10px;
  width: 20px;
`;

const Title = styled.h2`
  font-size: 21px;
  font-weight: normal;
  line-height: 44px;
  margin: 24px auto 0;
  max-width: 600px;

  @media (max-width: 480px) {
    font-size: 17px;
    line-height: 32px;
  }
`

const Strong = styled.strong`
  font-weight: bold;
  position: relative;

  &::before {
    background-color: #000;
    bottom: 0;
    content: '';
    display: block;
    height: 1px;
    left: 0;
    margin-top: 2px;
    opacity: 0.1;
    position: absolute;
    right: 0;
    top: 100%;
  }
`;

// -- Claims section
const ClaimsSection = styled.div`
  background-color: #FAFAFA;
  border-top: 1px solid #000;
  margin-top: 32px;
  min-height: 200px;
  padding: 32px 0 52px;
`;

const Claims = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 32px;

  @media (max-width: 770px) {
    flex-direction: column;
    margin: 32px auto 0;
    max-width: 340px;
  }
`;

const Claim = styled.div`
  flex: 1;
  margin: 20px;
  max-width: 280px;
  text-align: center;
  text-transform: lowercase;
`;

const ClaimImage = styled.img`
  width: 65px;
  height: 65px;
`;

const ClaimTitle = styled.h3`
  margin-top: 24px;
  font-size: 18px;
  line-height: 26px;
`;

const ClaimDescription = styled.p`
  color: #333438;
  font-size: 14px;
  margin-top: 22px;
  line-height: 23px;
  opacity: 0.6;
`;

// -- Buttons section
const ButtonsSection = styled.div`
  border-top: 1px solid #000;
  display: flex;
  flex-direction: row;

  @media (max-width: 550px) {
    flex-direction: column;
  }
`;

const BigButton = styled.button`
  background-color: ${props => props.primary ? '#000' : '#FFF'};
  color: ${props => props.primary ? '#FFF' : '#000'};
  flex: 1;
  font-size: 14px;
  font-weight: bold;
  line-height: 70px;
  margin: 0;
  padding: 0;
`;

export default App;
