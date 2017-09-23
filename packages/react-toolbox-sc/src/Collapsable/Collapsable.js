import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

class Collapsable extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    collapsed: PropTypes.bool,
  };

  state = {
    height: null,
  };

  componentDidMount() {
    this.calculateHeight();
  }

  componentWillReceiveProps(nextProps) {
    this.calculateHeight();
  }

  componentWillUnmount() {
    if (this.frame) {
      cancelAnimationFrame(this.frame);
    }
  }

  calculateHeight = () => {
    this.frame = requestAnimationFrame(() => {
      this.setState({
        height: this.rootNode.getBoundingClientRect().height,
      });
    });
  };

  handleRef = node => {
    this.rootNode = node;
  };

  render() {
    return (
      <Collapse
        className={this.props.className}
        collapsed={this.props.collapsed}
        height={this.state.height}
      >
        <div ref={this.handleRef}>{this.props.children}</div>
      </Collapse>
    );
  }
}

const Collapse = styled.div`
  max-height: ${props => props.height}px;
  overflow: hidden;
  transition: max-height 0.3s ease-out;
  width: 100%;

  ${props => props.collapsed && css`max-height: 0;`};
`;

export default Collapsable;
