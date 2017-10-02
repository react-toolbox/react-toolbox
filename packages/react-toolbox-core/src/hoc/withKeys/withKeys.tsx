import { keys } from 'ramda';
import * as React from 'react';
import { Component, ComponentClass, KeyboardEvent, SFC } from 'react';
import * as KEY_MATCHERS from '../../utils/keyMatchers';

export interface WithKeysProps<T> {
  handlers: IHandlers<T>;
  matchers?: IMatchers;
  useKeys?: boolean;
}

export type WithKeysHOC = <T>(
  decorated: ComponentClass<T> | SFC<T>,
) => ComponentClass<T & WithKeysProps<T>>;

export interface IHandlers<T> {
  [key: string]: (event: KeyboardEvent<any>, props: T) => void | string;
}

export interface IMatchers {
  [key: string]: (event: KeyboardEvent<any>) => boolean;
}

export default function withKeys(): WithKeysHOC {
  return function<T>(DecoratedComponent) {
    return class WithKeysComponent extends Component<T & WithKeysProps<T>, {}> {
      componentDidMount() {
        if (this.props.useKeys) {
          document.addEventListener('keydown', this.handleKeyDown);
        }
      }

      componentDidUpdate() {
        if (this.props.useKeys) {
          document.addEventListener('keydown', this.handleKeyDown);
        } else {
          document.removeEventListener('keydown', this.handleKeyDown);
        }
      }

      componentWillUnmount() {
        if (this.props.useKeys) {
          document.removeEventListener('keydown', this.handleKeyDown);
        }
      }

      getMatcher = (bindingKey: string) => {
        const matchers = this.props.matchers
          ? { ...KEY_MATCHERS, ...(this.props.matchers as {}) }
          : KEY_MATCHERS;
        return matchers[bindingKey];
      };

      handleKeyDown = event => {
        keys(this.props.handlers).forEach(bindingKey => {
          const binding = this.getMatcher(bindingKey);
          const handler = this.props.handlers[bindingKey];

          if (binding && binding(event) && handler) {
            handler.call(this, event, this.props);
          }
        });
      };

      render() {
        const { useKeys, ...other } = this.props as any;
        return <DecoratedComponent {...other} />;
      }
    };
  };
}
