'use client';
import './tokens.css';

import { itemClasses, disabledClasses } from './styles';
import type { ListClassNames } from './types';
import { cloneElement, type ComponentPropsWithRef, type ReactElement, type ReactNode } from 'react';
import { cn } from '../foundations/styles/cn';
import Avatar from '../avatar';
import FontIcon from '../font-icon';
import ListItemContent from './ListItemContent';
import ListItemActions from './ListItemActions';
export interface ListItemLayoutOptions {
  avatar?: ReactNode;
  caption?: ReactNode;
  className?: string;
  disabled?: boolean;
  itemContent?: ReactNode;
  leftActions?: ReactNode[];
  leftIcon?: ReactNode;
  legend?: ReactNode;
  rightActions?: ReactNode[];
  rightIcon?: ReactNode;
  selectable?: boolean;
  /** Native button, anchor, or ref-forwarding router link for the row's primary action. */
  primaryAction?: ReactElement<{
    children?: ReactNode;
    className?: string;
    'aria-disabled'?: boolean | 'true' | 'false';
    tabIndex?: number;
    disabled?: boolean;
  }>;
  /** Classes for the component's rendered parts. */
  classNames?: ListClassNames;
}
export interface ListItemLayoutProps extends ComponentPropsWithRef<'span'>, ListItemLayoutOptions {}
export function ListItemLayout({
  avatar,
  caption,
  children,
  className,
  disabled = false,
  itemContent,
  leftActions = [],
  leftIcon,
  legend,
  rightActions = [],
  rightIcon,
  selectable = false,
  primaryAction,
  classNames,
  ...other
}: ListItemLayoutProps) {
  const leading = [
    leftIcon && <FontIcon aria-hidden value={leftIcon} key="leftIcon" />,
    avatar && <Avatar image={avatar} key="avatar" />,
  ];
  const left = primaryAction ? leading : [...leading, ...leftActions];
  const right = [rightIcon && <FontIcon aria-hidden value={rightIcon} key="rightIcon" />, ...rightActions];
  const primaryContent = (
    <>
      {left.some(Boolean) && (
        <ListItemActions type="left" classNames={classNames}>
          {left}
        </ListItemActions>
      )}
      {itemContent ?? children ?? <ListItemContent classNames={classNames} caption={caption} legend={legend} />}
    </>
  );
  return (
    <span
      {...other}
      className={cn(
        itemClasses,
        classNames?.item,
        disabled && cn(disabledClasses, classNames?.disabled),
        selectable &&
          cn(
            'rt-list-selectable',
            '[.rt-list-item&:not(.rt-list-disabled):hover]:bg-(--list-item-hover-color) [.rt-list-item&:not(.rt-list-disabled):hover]:cursor-pointer',
            classNames?.selectable,
          ),
        className,
      )}
    >
      {primaryAction && leftActions.length > 0 && (
        <ListItemActions
          type="left"
          classNames={classNames}
          onClick={(event) => event.stopPropagation()}
          onMouseDown={(event) => event.stopPropagation()}
        >
          {leftActions}
        </ListItemActions>
      )}
      {primaryAction
        ? cloneElement(primaryAction, {
            'aria-disabled': disabled || primaryAction.props['aria-disabled'],
            tabIndex: disabled ? -1 : primaryAction.props.tabIndex,
            ...(primaryAction.type === 'button' && { disabled: disabled || primaryAction.props.disabled }),
            className: cn(
              'flex flex-1 min-w-0 items-center self-stretch border-0 bg-transparent p-0 text-inherit [font:inherit] text-start cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--rt-color-primary)',
              primaryAction.props.className,
            ),
            children: primaryContent,
          })
        : primaryContent}
      {right.some(Boolean) && (
        <ListItemActions
          type="right"
          classNames={classNames}
          onClick={primaryAction ? (event) => event.stopPropagation() : undefined}
          onMouseDown={primaryAction ? (event) => event.stopPropagation() : undefined}
        >
          {right}
        </ListItemActions>
      )}
    </span>
  );
}
export default ListItemLayout;
