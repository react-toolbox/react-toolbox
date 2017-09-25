import * as React from 'react';
import { compose, memoize } from 'ramda';
import {
  Children,
  cloneElement,
  Component,
  ComponentClass,
  MouseEvent,
  ReactChild,
  ReactChildren,
} from 'react';
import getFilteredReactChildrenIndexes from '../../utils/getFilteredReactChildrenIndexes';
import withKeys, { WithKeysProps } from '../withKeys';

export interface WithNavigationArgs {
  isSelectable(child: ReactChild): boolean;
}

export interface WithNavigationProps {
  children: ReactChildren;
  onHoverChange(idx: number | undefined): void;
  onMouseLeave(event: MouseEvent<any>): void;
}

export interface WithNavigationState {
  hoverIdx: number | undefined;
}

export type WithNavigationHOC = <T>(
  decorated: ComponentClass<T & WithNavigationProps>,
) => ComponentClass<T>;

export interface INavigableComponent
  extends Component<WithNavigationProps, WithNavigationState> {
  justPressedKeyTimeout: number | undefined;
  handleHoverChange(increment: number): void;
}

export default function withNavigation({
  isSelectable,
}: WithNavigationArgs): WithNavigationHOC {
  return compose<
    ComponentClass<WithNavigationProps & WithKeysProps>,
    ComponentClass<WithKeysProps>,
    ComponentClass<any>
  >(
    withKeys<INavigableComponent>({
      handlers: {
        ARROW_DOWN: (event, props, instance) => {
          event.preventDefault();
          if (instance.justPressedKeyTimeout) {
            clearTimeout(instance.justPressedKeyTimeout);
          }
          instance.handleHoverChange(1);
        },
        ARROW_UP: (event, props, instance) => {
          event.preventDefault();
          if (instance.justPressedKeyTimeout) {
            clearTimeout(instance.justPressedKeyTimeout);
          }
          instance.handleHoverChange(-1);
        },
        ENTER_OR_SPACEBAR: (event, props, instance) => {
          const { hoverIdx } = instance.state;
          event.preventDefault();
          if (instance.justPressedKeyTimeout) {
            clearTimeout(instance.justPressedKeyTimeout);
          }
          if (hoverIdx && instance[itemId(hoverIdx)]) {
            instance[itemId(hoverIdx)].click();
          }
        },
        ESC: (event, props, instance) => {
          event.preventDefault();
          instance.setState({ hoverIdx: undefined });
          if (instance.justPressedKeyTimeout) {
            clearTimeout(instance.justPressedKeyTimeout);
          }
        },
      },
    }),
    function addNavigation<T>(DecoratedComponent) {
      return class NavigableComponent extends Component<
        T & WithKeysProps & WithNavigationProps,
        WithNavigationState
      > {
        rootNode: HTMLElement | undefined;
        justPressedKeyTimeout: number | undefined;

        state = {
          hoverIdx: undefined,
        };

        handleChildRef = memoize(idx => node => {
          this[itemId(idx)] = node;
        });

        handleItemEnter = (idx, params) => {
          if (!this.justPressedKeyTimeout) {
            this.setState({ hoverIdx: idx }, () => {
              if (this.props.onHoverChange) {
                this.props.onHoverChange(idx);
              }
            });
          }
        };

        handleMouseLeave = (event: MouseEvent<any>) => {
          if (!this.justPressedKeyTimeout) {
            this.setState({ hoverIdx: undefined }, () => {
              if (this.props.onHoverChange) {
                this.props.onHoverChange(undefined);
              }
            });
          }

          if (this.props.onMouseLeave) {
            this.props.onMouseLeave(event);
          }
        };

        handleRootRef = node => {
          this.rootNode = node;
        };

        handleHoverChange = increment => {
          const SCROLL_NAVIGATE_OFFSET = 10;
          const hoverIdx = this.getNextIndex(increment);

          if (this.rootNode) {
            const list = this.rootNode.getBoundingClientRect();
            const item = this[`item${hoverIdx}`].getBoundingClientRect();

            // Adjust scroll for this item
            if (item.bottom > list.bottom) {
              const diff = item.bottom - list.bottom + SCROLL_NAVIGATE_OFFSET;
              this.rootNode.scrollTop = this.rootNode.scrollTop + diff;
            } else if (item.top < list.top) {
              const diff = list.top - item.top + SCROLL_NAVIGATE_OFFSET;
              this.rootNode.scrollTop = this.rootNode.scrollTop - diff;
            }

            // Set a safety timeout to avoid mouseEnter triggerings after
            // the scroll is modified
            this.justPressedKeyTimeout = setTimeout(() => {
              this.justPressedKeyTimeout = undefined;
            }, 200);

            this.setState({ hoverIdx }, () => {
              if (this.props.onHoverChange) {
                this.props.onHoverChange(hoverIdx);
              }
            });
          }
        };

        getNextIndex = increment => {
          const { children } = this.props;
          const { hoverIdx } = this.state;
          const indexes = getFilteredReactChildrenIndexes(
            children,
            isSelectable,
          );
          let nextIndex =
            hoverIdx !== undefined ? indexes.indexOf(hoverIdx) + increment : 0;

          if (nextIndex < 0) {
            nextIndex = indexes.length - 1;
          }

          if (nextIndex >= indexes.length) {
            nextIndex = 0;
          }

          return indexes[nextIndex];
        };

        injectSelectableProps = (child, idx) =>
          cloneElement(child, {
            getRef: this.handleChildRef(idx),
            highlighted: idx === this.state.hoverIdx,
            onMouseEnter: (...params) => {
              this.handleItemEnter(idx, params);
              if (child.props.onMouseEnter) {
                child.props.onMouseEnter(...params);
              }
            },
          });

        render() {
          const { onMouseLeave, onHoverChange, ...rest } = this.props as any;

          return (
            <DecoratedComponent
              {...rest}
              innerRef={this.handleRootRef}
              onMouseLeave={this.handleMouseLeave}
            >
              {Children.map(
                this.props.children,
                (child, idx) =>
                  isSelectable(child)
                    ? this.injectSelectableProps(child, idx)
                    : child,
              )}
            </DecoratedComponent>
          );
        }
      };
    },
  );
}

function itemId(idx: number): string {
  return `item${idx}`;
}
