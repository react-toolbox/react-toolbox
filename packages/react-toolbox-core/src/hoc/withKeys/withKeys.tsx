import * as React from 'react';
import { Component, ComponentClass, KeyboardEvent } from 'react';
import { keys } from 'ramda';
import * as KEYS from './keys';

const keyIs = key => (event: KeyboardEvent<any>) => event.keyCode === key;

export const BINDINGS = {
  ARROW_DOWN: keyIs(KEYS.ARROW_DOWN),
  ARROW_LEFT: keyIs(KEYS.ARROW_LEFT),
  ARROW_RIGHT: keyIs(KEYS.ARROW_RIGHT),
  ARROW_UP: keyIs(KEYS.ARROW_UP),
  BACKSPACE: keyIs(KEYS.BACKSPACE),
  COMMA: keyIs(KEYS.COMMA),
  ENTER_OR_SPACEBAR: e => keyIs(KEYS.ENTER)(e) || keyIs(KEYS.SPACEBAR)(e),
  ENTER: keyIs(KEYS.ENTER),
  ESC: keyIs(KEYS.ESC),
  SPACEBAR: keyIs(KEYS.SPACEBAR),
  TAB: keyIs(KEYS.TAB),
};

export type Handler = (
  event: KeyboardEvent<any>,
  props: object,
) => void | string;

export interface Handlers {
  ARROW_LEFT?: Handler;
  ARROW_RIGHT?: Handler;
  ARROW_DOWN?: Handler;
  ARROW_UP?: Handler;
  BACKSPACE?: Handler;
  ENTER?: Handler;
  TAB?: Handler;
  COMMA?: Handler;
  ESC?: Handler;
  SPACEBAR?: Handler;
  ENTER_OR_SPACEBAR?: Handler;
}

export interface WithKeysArgs {
  handlers: Handlers;
  passProps: boolean;
}

export interface WithKeysProps {
  useKeys?(): boolean;
}

export type WithKeysHOC = <T>(
  decorated: ComponentClass<T & WithKeysProps>,
) => ComponentClass<T>;

export default function withKeys({
  handlers,
  passProps,
}: WithKeysArgs): WithKeysHOC {
  return function<T>(DecoratedComponent) {
    return class WithKeysComponent extends Component<T & WithKeysProps, void> {
      rootNode: Component<T, any> | undefined;

      componentDidMount() {
        if (this.shouldAttach(this.props)) {
          document.addEventListener('keydown', this.handleKeyDown);
        }
      }

      componentDidUpdate() {
        if (this.shouldAttach(this.props)) {
          document.addEventListener('keydown', this.handleKeyDown);
        } else {
          document.removeEventListener('keydown', this.handleKeyDown);
        }
      }

      componentWillUnmount() {
        if (this.shouldAttach(this.props)) {
          document.removeEventListener('keydown', this.handleKeyDown);
        }
      }

      shouldAttach = (props: WithKeysProps) => props.useKeys && props.useKeys();

      handleRef = (node: Component<T, any>) => {
        this.rootNode = node;
      };

      handleKeyDown = event => {
        keys(handlers).forEach(bindingKey => {
          const binding = BINDINGS[bindingKey];
          const handler = handlers[bindingKey];

          if (binding && binding(event) && handler) {
            if (typeof handler === 'string' && this.rootNode) {
              this.rootNode[handler].call(this, event);
            }

            if (typeof handler !== 'string') {
              handler.call(this, event, this.props);
            }
          }
        });
      };

      render() {
        const { useKeys, ...other } = this.props as any;
        return <DecoratedComponent ref={this.handleRef} {...other} />;
      }
    };
  };
}
