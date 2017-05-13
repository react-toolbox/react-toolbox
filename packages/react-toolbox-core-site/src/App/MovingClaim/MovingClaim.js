import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';

function getViewport() {
  return {
    height: window.innerHeight || document.documentElement.offsetHeight,
    width: window.innerWidth || document.documentElement.offsetWidth
  };
}

export default class MovingClaim extends Component {
  static propTypes = {
    children: PropTypes.node,
    duration: PropTypes.number,
  };

  count = 0;
  nodes = {};
  state = { claims: [] };

  componentDidMount() {
    this.setState({ claims: [this.count] });
    this.interval = setInterval(this.handleInterval, 100);
    this.count += 1;
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleInterval = () => {
    const firstIndex = this.state.claims[0]
    const firstNode = this.nodes[firstIndex];
    const { width } = getViewport();

    if (width > 650) {
      const { left, right } = firstNode.getBoundingClientRect();
      if (right >= width && this.state.claims.length === 1 && left > 0) {
        this.setState({ claims: [...this.state.claims, this.count] });
        this.count += 1;
      }

      if (left >= width && this.state.claims.length === 2) {
        this.setState({ claims: this.state.claims.slice(1) });
        delete this.nodes[firstIndex];
      }
    }
  };

  renderClaims = () => {
    const { children, duration } = this.props;
    const { claims } = this.state;
    let claimElements = [];

    for (let i = 0; i < claims.length; i++) {
      claimElements.push(
        <Claim
          key={claims[i]}
          innerRef={node => { this.nodes[claims[i]] = node; }}
          duration={duration}
        >
          {children}
        </Claim>
      );
    }

    return claimElements;
  }

  render() {
    return (
      <MovingClaimWrapper>
        {this.renderClaims()}
      </MovingClaimWrapper>
    );
  }
}

const slideViewport = keyframes`
  0% { transform: translate3d(-100%, 0, 0); }
  100% { transform: translate3d(calc(100vw + 100%), 0, 0); }
`;

const MovingClaimWrapper = styled.div`
  height: 20px;
  margin-top: 36px;
  overflow: hidden;
  position: relative;
  width: 100%;
`;

const Claim = styled.span`
  animation: ${slideViewport} ${props => props.duration}s linear;
  backface-visibility: hidden;
  color: #333438;
  display: inline-block;
  font-size: 14px;
  left: 0;
  line-height: 20px;
  opacity: 0.6;
  padding: 0 20px;
  position: absolute;
  top: 0;
  transform: translate3d(-100%, 0, 0);
  white-space: nowrap;

  @media (max-width: 650px) {
    animation: ${slideViewport} ${props => props.duration}s linear infinite;
  }
`;
