import React from 'react';
import classnames from 'classnames';
import style from './style';

const Layout = ({ className, children }) => (
  <div data-react-toolbox='layout' className={classnames(style.root, className)}>
    {children}
  </div>
);

const ALLOWED = [
  'Panel',
  'NavDrawer|Panel',
  'NavDrawer|Panel|Sidebar',
  'Panel|Sidebar'
];

function getChildName (child) {
  if (child.type) {
    return child.type.name || child.type;
  }
  if (!child.constructor || !child.constructor.name) {
    return 'UNKNOWN';
  }
  return child.constructor.name;
}

Layout.propTypes = {
  children (props, propName, componentName) {
    // Accept only [NavDrawer]Pane[Sidebar]
    const children = props[propName];
    if (React.Children.count(children) > 3) {
      return new Error(
        '`' + componentName + '` '
        + 'should have a Pane for a child, optionally preceded and/or followed by a Drawer.'
      );
    }

    const names = React.Children.map(children, getChildName).join('|');
    if (!(~ALLOWED.indexOf(names))) {
      return new Error(
        '`' + componentName + '` '
        + 'should have a Panel for a child, optionally preceded by a NavDrawer and/or followed by a Sidebar.'
      );
    }
  },
  className: React.PropTypes.string
};

Layout.defaultProps = {
  className: ''
};

export default Layout;
