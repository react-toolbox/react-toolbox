import * as React from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';

import ReactToolbox from "../index";
import { LINK } from '../identifiers.js';
import FontIcon from '../font_icon/FontIcon.js';

export interface LinkTheme {
  /**
   * Added to the root element if the Link is active.
   */
  active?: string;
  /**
   * Used for the icon element if it's present.
   */
  icon?: string;
  /**
   * Used for the root element.
   */
  link?: string;
}

export interface LinkProps extends ReactToolbox.Props<Link> {
  /**
   * If true, adds active style to link.
   * @default false
   */
  active?: boolean;
  /**
   * Children to pass through the component.
   */
  children?: React.ReactNode;
  /**
   * Sets a count number.
   */
  count?: number;
  /**
   * Sets the anchor link.
   */
  href?: string;
  /**
   * An icon key string to include a FontIcon component in front of the text.
   */
  icon?: React.ReactNode | string;
  /**
   * The text string used for the text content of the link.
   */
  label?: string;
  /**
   * Classnames object defining the component style.
   */
  theme?: LinkTheme;
  /**
   * Additional parameters passed to anchor element.
   */
  [key: string]: any;
}


const Link: React.SFC<LinkProps> = ({active, children, className, count, icon, label, theme, ...others}: LinkProps) => {
  const _className = classnames(theme.link, {
    [theme.active]: active
  }, className);
  return (
    <a data-react-toolbox='link' className={_className} {...others}>
      {icon ? <FontIcon className={theme.icon} value={icon} /> : null}
      {label ? <abbr>{label}</abbr> : null}
      {count && count !== 0 ? <small>{count}</small> : null}
      {children}
    </a>
  );
};


Link.defaultProps = {
  active: false,
  className: ''
};

export default themr(LINK)(Link);
export { Link };
