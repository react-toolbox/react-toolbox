import * as React from 'react';
import { Component, ComponentClass } from 'react';
import targetIsDescendant from '../../utils/targetIsDescendant';

const DEFAULT_ATTACH_DELAY = 200;

export interface Options {
  attachDelay: number;
  shouldAttach(props, instance): boolean;
}

export interface WithClickOutsideProps {
  onClickOutside(): void;
  onClickOutsideActive?: boolean;
}

export type WithClickOutsideHOC = <T>(
  decorated: ComponentClass<T & WithClickOutsideProps>,
) => ComponentClass<T>;

export default function withClickOutside({
  attachDelay,
  shouldAttach,
}: Options): WithClickOutsideHOC {
  return function<T>(DecoratedComponent) {
    return class OutsideClickable extends Component<
      WithClickOutsideProps & T,
      {}
    > {
      attachTimeout: number | null = null;
      isAttached = false;
      rootNode: HTMLElement | null = null;

      componentDidMount() {
        if (this.shouldAttach()) {
          this.addEventListener();
        }
      }

      componentDidUpdate() {
        if (this.shouldAttach()) {
          this.addEventListener();
        } else {
          this.removeEventListener();
        }
      }

      componentWillUnmount() {
        this.clearAttachTimeout();
        this.removeEventListener();
      }

      addEventListener() {
        this.clearAttachTimeout();
        this.attachTimeout = setTimeout(() => {
          if (!this.isAttached) {
            document.addEventListener('click', this.handleOutsideClick, false);
            this.isAttached = true;
          }
        }, attachDelay || DEFAULT_ATTACH_DELAY);
      }

      removeEventListener() {
        this.clearAttachTimeout();
        if (this.isAttached) {
          document.removeEventListener('click', this.handleOutsideClick);
          this.isAttached = false;
        }
      }

      clearAttachTimeout() {
        if (this.attachTimeout) {
          clearTimeout(this.attachTimeout);
        }
      }

      handleOutsideClick = event => {
        if (this.props.onClickOutside) {
          let isDescendant: undefined | boolean;

          try {
            if (this.rootNode) {
              isDescendant = targetIsDescendant(
                event.target as HTMLElement,
                this.rootNode,
              );
            }
          } catch (error) {
            // Prevent againt unmounting self (May happen with tooltips)
          }

          if (!isDescendant) {
            this.props.onClickOutside();
          }
        }
      };

      handleRef = node => {
        this.rootNode = node;
      };

      shouldAttach = () =>
        this.props.onClickOutsideActive ||
        (shouldAttach && shouldAttach(this.props, this.rootNode));

      render() {
        const { onClickOutside, onClickOutsideActive, ...other } = this
          .props as any;
        return <DecoratedComponent innerRef={this.handleRef} {...other} />;
      }
    };
  };
}
