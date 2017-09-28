import * as React from 'react';
import { Component, ComponentClass, ReactNode } from 'react';

export interface Args {
  delay: number;
}

export interface Props {
  active: boolean;
  delay: number;
  children: ReactNode;
}

export interface State {
  active: boolean;
  rendered: boolean;
}

export default function withActiveMount({ delay: defaultDelay }: Args) {
  return function<P>(
    DecoratedComponent: ComponentClass<P>,
  ): ComponentClass<P & Props> {
    return class ActivableRenderer extends Component<P & Props, State> {
      activateTimeout;
      unrenderTimeout;

      state = {
        active: this.props.active,
        rendered: this.props.active,
      };

      componentWillReceiveProps(nextProps) {
        if (nextProps.active && !this.props.active) {
          this.renderAndActivate();
        }

        if (!nextProps.active && this.props.active) {
          this.deactivateAndUnrender();
        }
      }

      componentWillUnmount() {
        clearTimeout(this.activateTimeout);
        clearTimeout(this.unrenderTimeout);
      }

      renderAndActivate() {
        clearTimeout(this.unrenderTimeout);
        this.setState({ rendered: true, active: false }, () => {
          this.activateTimeout = setTimeout(() => {
            this.setState({ active: true });
          }, 20);
        });
      }

      deactivateAndUnrender() {
        this.setState({ rendered: true, active: false }, () => {
          this.unrenderTimeout = setTimeout(() => {
            this.setState({ rendered: false });
            this.unrenderTimeout = 0;
          }, this.props.delay || defaultDelay);
        });
      }

      render() {
        const { delay, ...rest } = this.props as any;
        return this.state.rendered ? (
          <DecoratedComponent {...rest} active={this.state.active} />
        ) : null;
      }
    };
  };
}
