import * as React from 'react';
import { compose, memoize } from 'ramda';
import { findDOMNode } from 'react-dom';
import {
  cloneElement,
  Component,
  ComponentClass,
  MouseEvent,
  ReactChild,
  ReactChildren,
} from 'react';
import RenderChildren from '../../components/RenderChildren';
import getFilteredReactChildrenIndexes from '../../utils/getFilteredReactChildrenIndexes';
import withKeys from '../withKeys';

export interface WithNavigationArgs {
  isSelectable(child: ReactChild): boolean;
}

export interface WithNavigationProps {
  children: ReactChildren;
  hoverIdx?: number;
  isSelectable(child: ReactChild): boolean;
  getRef(node: HTMLElement): void;
  onEndReached(): void;
  onHoverChange(
    idx: number | undefined,
    node: Component<any, any> | undefined,
  ): void;
  onMouseLeave(event: MouseEvent<any>): void;
  onStartReached(): void;
  restartOnEnd: boolean;
  rootNode?: HTMLElement;
  scrollOffset?: number;
  useKeys?: boolean;
}

export type WithNavigationHOC = <T>(
  decorated: ComponentClass<T & WithNavigationProps>,
) => ComponentClass<T>;

export interface INavigableComponent
  extends Component<WithNavigationProps, void> {
  getNextIndex(increment: number): number;
  justPressedKey(): void;
}

const SCROLL_NAVIGATE_OFFSET = 8;
const Keybindings = withKeys()(RenderChildren);

export default function withNavigation({
  isSelectable: defaultIsSelectable,
}: WithNavigationArgs): WithNavigationHOC {
  return compose<
    ComponentClass<WithNavigationProps>,
    ComponentClass<any>
  >(function addNavigation<T>(DecoratedComponent) {
    return class NavigableComponent extends Component<
      T & WithNavigationProps,
      {}
    > {
      fromKeyboard = false;
      justPressedKeyTimeout;
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
        if (this.props.getRef) {
          this.props.getRef(node);
        }
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

      handleArrowDown = event => {
        event.preventDefault();
        const index = this.getNextIndex(1);
        if (index !== this.props.hoverIdx) {
          this.justPressedKey();
          this.props.onHoverChange(index, this[childId(index)]);
        } else if (this.props.onEndReached) {
          this.props.onEndReached();
        }
      };

      handleArrowUp = event => {
        event.preventDefault();
        const index = this.getNextIndex(-1);
        if (index !== this.props.hoverIdx) {
          this.justPressedKey();
          this.props.onHoverChange(index, this[childId(index)]);
        } else if (this.props.onStartReached) {
          this.props.onStartReached();
        }
      };

      handleEnterOrSpacebar = event => {
        event.preventDefault();
        const { hoverIdx } = this.props;
        if (hoverIdx !== undefined && this[itemId(hoverIdx as number)]) {
          this[itemId(hoverIdx as number)].click();
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
          this.isSelectable,
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
        const itemNode = this[itemId(this.props.hoverIdx as number)];

        if (rootNode && itemNode && this.props.hoverIdx !== undefined) {
          const list = rootNode.getBoundingClientRect();
          const item = itemNode.getBoundingClientRect();

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

      isSelectable = (child: ReactChild) =>
        this.props.isSelectable !== undefined
          ? this.props.isSelectable(child)
          : defaultIsSelectable(child);

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

      handleEsc = event => {
        event.preventDefault();
        this.props.onHoverChange(undefined, undefined);
      };

      render() {
        const { onMouseLeave, onHoverChange, useKeys, ...rest } = this
          .props as any;

        return (
          <Keybindings
            handlers={{
              ARROW_DOWN: this.handleArrowDown,
              ARROW_UP: this.handleArrowUp,
              ENTER_OR_SPACEBAR: this.handleEnterOrSpacebar,
              ESC: this.handleEsc,
            }}
            useKeys={useKeys}
          >
            <DecoratedComponent
              {...rest}
              getRef={this.handleRootRef}
              onMouseLeave={this.handleMouseLeave}
            >
              {React.Children.map(
                this.props.children,
                (child, idx) =>
                  this.isSelectable(child)
                    ? this.injectSelectableProps(child, idx)
                    : child,
              )}
            </DecoratedComponent>
          </Keybindings>
        );
      }
    };
  });
}

function itemId(idx: number): string {
  return `item${idx}`;
}

function childId(idx: number): string {
  return `child${idx}`;
}
