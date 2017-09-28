import * as React from 'react';
import { compose, memoize } from 'ramda';
import { findDOMNode } from 'react-dom';
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

const SCROLL_NAVIGATE_OFFSET = 8;

export interface WithNavigationArgs {
  isSelectable(child: ReactChild): boolean;
}

export interface WithNavigationProps {
  children: ReactChildren;
  hoverIdx?: number;
  onEndReached?(): void;
  onHoverChange(
    idx: number | undefined,
    node: Component<any, any> | undefined,
  ): void;
  onMouseLeave(event: MouseEvent<any>): void;
  onStartReached?(): void;
  restartOnEnd: boolean;
  rootNode?: HTMLElement;
  scrollOffset?: number;
}

export type WithNavigationHOC = <T>(
  decorated: ComponentClass<T & WithNavigationProps>,
) => ComponentClass<T>;

export interface INavigableComponent
  extends Component<WithNavigationProps, void> {
  getNextIndex(increment: number): number;
  justPressedKey(): void;
}

export default function withNavigation({
  isSelectable,
}: WithNavigationArgs): WithNavigationHOC {
  return compose<
    ComponentClass<WithNavigationProps & WithKeysProps>,
    ComponentClass<WithKeysProps>,
    ComponentClass<any>
  >(
    withKeys<WithNavigationProps, INavigableComponent>({
      handlers: {
        ARROW_DOWN: (event, props, instance) => {
          event.preventDefault();
          const index = instance.getNextIndex(1);
          if (index !== props.hoverIdx) {
            instance.justPressedKey();
            props.onHoverChange(index, instance[childId(index)]);
          } else if (props.onEndReached) {
            props.onEndReached();
          }
        },
        ARROW_UP: (event, props, instance) => {
          event.preventDefault();
          const index = instance.getNextIndex(-1);
          if (index !== props.hoverIdx) {
            instance.justPressedKey();
            props.onHoverChange(index, instance[childId(index)]);
          } else if (props.onStartReached) {
            props.onStartReached();
          }
        },
        ENTER_OR_SPACEBAR: (event, props, instance) => {
          const { hoverIdx } = props;
          event.preventDefault();
          if (hoverIdx !== undefined && instance[itemId(hoverIdx)]) {
            instance[itemId(hoverIdx)].click();
          }
        },
        ESC: (event, props, instance) => {
          event.preventDefault();
          props.onHoverChange(undefined, undefined);
        },
      },
    }),
    function addNavigation<T>(DecoratedComponent) {
      return class NavigableComponent extends Component<
        T & WithKeysProps & WithNavigationProps,
        {}
      > {
        fromKeyboard = false;
        justPressedKeyTimeout: number | undefined;
        rootNode: HTMLElement | undefined;

        componentDidUpdate(prevProps) {
          if (
            this.props.hoverIdx !== prevProps.hoverIdx &&
            this.fromKeyboard &&
            this.props.hoverIdx !== undefined
          ) {
            this.adjustScroll();
          }
        }

        handleRootRef = node => {
          this.rootNode = node;
        };

        handleChildRef = memoize(idx => node => {
          this[itemId(idx)] = node;
        });

        handleChildComponentRef = memoize(idx => node => {
          this[childId(idx)] = node;
        });

        handleItemEnter = (idx, child, params) => {
          if (this.justPressedKeyTimeout === undefined) {
            this.fromKeyboard = false;
            if (this.props.onHoverChange) {
              this.props.onHoverChange(idx, child);
            }
          }
        };

        handleMouseLeave = (event: MouseEvent<any>) => {
          if (this.justPressedKeyTimeout === undefined) {
            this.fromKeyboard = false;
            if (this.props.onHoverChange) {
              this.props.onHoverChange(undefined, undefined);
            }
          }

          if (this.props.onMouseLeave) {
            this.props.onMouseLeave(event);
          }
        };

        justPressedKey = () => {
          this.fromKeyboard = true;
          this.justPressedKeyTimeout = setTimeout(() => {
            this.justPressedKeyTimeout = undefined;
          }, 200);
        };

        getRootNode = () => this.props.rootNode || this.rootNode;

        getNextIndex = increment => {
          const { children, hoverIdx, restartOnEnd } = this.props;
          const indexes = getFilteredReactChildrenIndexes(
            children,
            isSelectable,
          );
          let nextIndex =
            hoverIdx !== undefined
              ? indexes.indexOf(hoverIdx as number) + increment
              : 0;

          if (nextIndex < 0) {
            nextIndex = restartOnEnd ? indexes.length - 1 : 0;
          }

          if (nextIndex >= indexes.length) {
            nextIndex = !restartOnEnd ? indexes.length - 1 : 0;
          }

          return indexes[nextIndex];
        };

        adjustScroll = () => {
          const scrollOffset =
            this.props.scrollOffset !== undefined
              ? this.props.scrollOffset as number
              : SCROLL_NAVIGATE_OFFSET;
          const rootNode = findDOMNode(this.getRootNode());
          if (rootNode && this.props.hoverIdx !== undefined) {
            const list = rootNode.getBoundingClientRect();
            const item = this[
              itemId(this.props.hoverIdx as number)
            ].getBoundingClientRect();

            // Adjust scroll for this item
            if (item.bottom > list.bottom) {
              const diff = item.bottom - list.bottom + scrollOffset;
              rootNode.scrollTop = rootNode.scrollTop + diff;
            } else if (item.top < list.top) {
              const diff = list.top - item.top + scrollOffset;
              rootNode.scrollTop = rootNode.scrollTop - diff;
            }
          }
        };

        injectSelectableProps = (child, idx) =>
          cloneElement(child, {
            getRef: this.handleChildRef(idx),
            ref: this.handleChildComponentRef(idx),
            highlighted: idx === this.props.hoverIdx,
            onMouseLeave: (event, ...params) => {
              this.handleMouseLeave(event);
              if (child.props.onMouseLeave) {
                child.props.onMouseLeave(event, ...params);
              }
            },
            onMouseEnter: (...params) => {
              this.handleItemEnter(idx, child, params);
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
              getRef={this.handleRootRef}
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

function childId(idx: number): string {
  return `child${idx}`;
}
