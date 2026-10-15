'use client';
import { itemClasses, disabledClasses } from './styles';
import type { ListTheme } from './types';
import type { ReactNode } from 'react';
import { cn } from '../utils/cn';
import Avatar from '../avatar';
import FontIcon from '../font_icon';
import ListItemContent from './ListItemContent';
import ListItemActions from './ListItemActions';
export interface ListItemLayoutProps {
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
  theme?: ListTheme;
}
export function ListItemLayout({
  avatar,
  caption,
  className,
  disabled = false,
  itemContent,
  leftActions = [],
  leftIcon,
  legend,
  rightActions = [],
  rightIcon,
  selectable = false,
  theme,
}: ListItemLayoutProps) {
  const left = [
    leftIcon && <FontIcon value={leftIcon} key="leftIcon" />,
    avatar && <Avatar image={avatar} key="avatar" />,
    ...leftActions,
  ];
  const right = [rightIcon && <FontIcon value={rightIcon} key="rightIcon" />, ...rightActions];
  return (
    <span
      className={cn(
        itemClasses,
        theme?.item,
        disabled && cn(disabledClasses, theme?.disabled),
        selectable &&
          cn(
            'rt-list-selectable',
            '[.rt-list-item&:not(.rt-list-disabled):hover]:bg-[var(--list-item-hover-color)] [.rt-list-item&:not(.rt-list-disabled):hover]:cursor-pointer',
            theme?.selectable,
          ),
        className,
      )}
    >
      {left.some(Boolean) && (
        <ListItemActions type="left" theme={theme}>
          {left}
        </ListItemActions>
      )}
      {itemContent || <ListItemContent theme={theme} caption={caption} legend={legend} />}
      {right.some(Boolean) && (
        <ListItemActions type="right" theme={theme}>
          {right}
        </ListItemActions>
      )}
    </span>
  );
}
export default ListItemLayout;
