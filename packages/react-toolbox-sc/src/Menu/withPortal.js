import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import uniqueId from 'react-toolbox-core/lib/utils/uniqueId';
import Portal from '../Portal';

export default function withPortalFactory() {
  return DecoratedComponent =>
    class WithPortalComponent extends Component {
      static propTypes = {
        children: PropTypes.node,
        providerNode: PropTypes.object, // eslint-disable-line
        withPortal: PropTypes.bool,
      };

      state = {
        height: 0,
        left: 0,
        top: 0,
        width: 0,
      };

      componentDidMount() {
        this.measurePosition();
      }

      rootNode = null;

      measurePosition = () => {
        const { providerNode } = this.props;
        const node = providerNode || findDOMNode(this).parentNode;
        const { left, top, width, height } = node.getBoundingClientRect();
        this.setState({
          height,
          left: left + window.scrollX,
          top: top + window.scrollY,
          width,
        });
      };

      render() {
        const { withPortal, ...other } = this.props;

        if (!withPortal) {
          return <DecoratedComponent {...other} />;
        }

        const { top, left, width, height } = this.state;
        const parentId = uniqueId();

        return (
          <DecoratedComponent {...other} active={false} useKeys={false}>
            <div id={parentId} />
            <Portal parentId={parentId}>
              <div style={{ top, left, position: 'absolute' }}>
                <div style={{ width, height }} />
                <DecoratedComponent {...other}>
                  {this.props.children}
                </DecoratedComponent>
              </div>
            </Portal>
          </DecoratedComponent>
        );
      }
    };
}
