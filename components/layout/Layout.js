import React, { cloneElement, Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { getViewport } from '../utils/utils';
import filterReactChildren from '../utils/filter-react-children';
import isComponentOfType from '../utils/is-component-of-type';
import InjectAppBar from '../app_bar/AppBar';
import InjectNavDrawer from './NavDrawer';
import InjectSidebar from './Sidebar';
import isBrowser from '../utils/is-browser';
import breakpoints from '../utils/breakpoints';
import { LAYOUT } from '../identifiers';

const factory = (AppBar, NavDrawer, Sidebar) => {
  const isNavDrawer = child => isComponentOfType(NavDrawer, child);
  const isSidebar = child => isComponentOfType(Sidebar, child);
  const isAppBar = child => isComponentOfType(AppBar, child);
  const isUnknown = child => !isNavDrawer(child) && !isSidebar(child) && !isAppBar(child);

  class Layout extends Component {
    static propTypes = {
      children: PropTypes.node,
      className: PropTypes.string,
      theme: PropTypes.shape({
        appbarFixed: PropTypes.string,
        layout: PropTypes.string,
        navDrawerClipped: PropTypes.string,
        navDrawerPinned: PropTypes.string,
        sidebarClipped: PropTypes.string,
        sidebarPinned: PropTypes.string,
      }),
    };

    static defaultProps = {
      className: '',
    };

    state = {
      width: isBrowser() && getViewport().width,
    };

    componentDidMount() {
      if (!this.state.width) this.handleResize();
      window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.handleResize);
    }

    handleResize = () => {
      this.setState({ width: getViewport().width });
    }

    isPinned = (sideNav) => {
      if (sideNav) {
        const { permanentAt, pinned } = sideNav.props;
        const { width } = this.state;
        return width > breakpoints[permanentAt] || pinned;
      }
      return undefined;
    }

    render() {
      const { children, className, theme, ...rest } = this.props;
      const appBar = filterReactChildren(children, isAppBar)[0];
      const navDrawer = filterReactChildren(children, isNavDrawer)[0];
      const sidebar = filterReactChildren(children, isSidebar)[0];
      const unknown = filterReactChildren(children, isUnknown);
      const appBarFixed = appBar && appBar.props.fixed;
      const navDrawerPinned = this.isPinned(navDrawer);
      const navDrawerClipped = navDrawer && navDrawer.props.clipped;
      const sidebarWidth = sidebar && sidebar.props.width;
      const sidebarPinned = this.isPinned(sidebar);
      const sidebarClipped = sidebar && sidebar.props.clipped;

      const clonedAppBar = appBar && cloneElement(appBar, {
        theme,
        themeNamespace: 'appbar',
      });

      const clonedLeftSideNav = navDrawer && cloneElement(navDrawer, {
        clipped: navDrawerClipped,
        pinned: navDrawerPinned,
      });

      const clonedRightSideNav = sidebar && cloneElement(sidebar, {
        clipped: sidebarClipped,
        pinned: sidebarPinned,
      });

      const _className = classnames(theme.layout,
        theme[`sidebarWidth${sidebarWidth}`], {
          [theme.navDrawerPinned]: navDrawerPinned,
          [theme.navDrawerClipped]: navDrawerClipped,
          [theme.sidebarPinned]: sidebarPinned,
          [theme.sidebarClipped]: sidebarClipped,
          [theme.appbarFixed]: appBarFixed,
        }, className);

      return (
        <div {...rest} className={_className}>
          {clonedLeftSideNav}
          {clonedAppBar}
          {unknown}
          {clonedRightSideNav}
        </div>
      );
    }
  }

  return Layout;
};

const Layout = factory(InjectAppBar, InjectNavDrawer, InjectSidebar);
export default themr(LAYOUT)(Layout);
export { factory as layoutFactory };
export { Layout };
