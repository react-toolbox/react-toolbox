'use client';
import type { ReactNode } from 'react';
import classnames from 'classnames';
import Avatar from '../avatar';
import FontIcon from '../font_icon';
import { mergeTheme } from '../theming';
import ListItemContent from './ListItemContent';
import ListItemActions from './ListItemActions';
import defaultTheme from './theme';
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
  theme?: Partial<typeof defaultTheme>;
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
  theme: suppliedTheme,
}: ListItemLayoutProps) {
  const theme = mergeTheme(defaultTheme, suppliedTheme);
  const left = [
    leftIcon && <FontIcon value={leftIcon} key="leftIcon" />,
    avatar && <Avatar image={avatar} key="avatar" />,
    ...leftActions,
  ];
  const right = [rightIcon && <FontIcon value={rightIcon} key="rightIcon" />, ...rightActions];
  return (
    <span
      className={classnames(
        theme.item,
        { [theme.disabled]: disabled, [theme.selectable]: selectable },
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
