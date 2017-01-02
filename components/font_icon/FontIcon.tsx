import * as React from 'react';
import classnames from 'classnames';

import ReactToolbox from "../index";

export interface FontIconProps extends ReactToolbox.Props {
  /**
   * Children to pass through the component.
   */
  children?: React.ReactNode;
  /**
   * The key string for the icon you want be displayed.
   */
  value?: React.ReactNode | string;
  /**
   * Additional properties passed to component root.
   */
  [key: string]: any
}

const FontIcon: React.SFC<FontIconProps> = ({ children, className, value, ...other}) => (

  <span
    data-react-toolbox='font-icon'
    className={classnames({'material-icons': typeof value === 'string' || typeof children === 'string'}, className)}
    {...other}
  >
    {value}
    {children}
  </span>
);

FontIcon.defaultProps = {
  className: ''
};

export default FontIcon;
export { FontIcon };
