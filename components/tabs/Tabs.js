import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { TABS } from '../identifiers';
import InjectFontIcon from '../font_icon/FontIcon';
import isComponentOfType from '../utils/is-component-of-type';
import InjectTab from './Tab';
import InjectTabContent from './TabContent';

const factory = (Tab, TabContent, FontIcon) => {
  const isTab = child => isComponentOfType(Tab, child);
  const isTabContent = child => isComponentOfType(TabContent, child);

  class Tabs extends Component {
    static propTypes = {
      children: PropTypes.node,
      className: PropTypes.string,
      disableAnimatedBottomBorder: PropTypes.bool,
      fixed: PropTypes.bool,
      hideMode: PropTypes.oneOf(['display', 'unmounted']),
      index: PropTypes.number,
      inverse: PropTypes.bool,
      onChange: PropTypes.func,
      theme: PropTypes.shape({
        arrow: PropTypes.string,
        arrowContainer: PropTypes.string,
        disableAnimation: PropTypes.string,
        fixed: PropTypes.string,
        inverse: PropTypes.string,
        navigation: PropTypes.string,
        navigationContainer: PropTypes.string,
        pointer: PropTypes.string,
        tabs: PropTypes.string,
      }),
    };

    static defaultProps = {
      index: 0,
      fixed: false,
      inverse: false,
      hideMode: 'unmounted',
    };

    state = {
      pointer: {},
      arrows: {},
    };

    componentDidMount() {
      window.addEventListener('resize', this.handleResize);
      this.handleResize();
    }

    componentDidUpdate(prevProps) {
      const { index, children } = this.props;
      const { index: prevIndex, children: prevChildren } = prevProps;

      if (index !== prevIndex || children !== prevChildren) {
        this.updatePointer(index);
      }
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.handleResize);
      clearTimeout(this.resizeTimeout);
      if (this.updatePointerAnimationFrame) cancelAnimationFrame(this.updatePointerAnimationFrame);
    }

    handleHeaderClick = (idx) => {
      if (this.props.onChange) {
        this.props.onChange(idx);
      }
    };

    handleResize = () => {
      if (this.resizeTimeout) clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(() => {
        this.updatePointer(this.props.index);
        this.updateArrows();
      }, 100);
    };

    updatePointer = (idx) => {
      if (this.navigationNode && this.navigationNode.children[idx]) {
        this.updatePointerAnimationFrame = window.requestAnimationFrame(() => {
          const nav = this.navigationNode.getBoundingClientRect();
          const label = this.navigationNode.children[idx].getBoundingClientRect();
          const scrollLeft = this.navigationNode.scrollLeft;
          this.setState({
            pointer: {
              top: `${nav.height}px`,
              left: `${(label.left + scrollLeft) - nav.left}px`,
              width: `${label.width}px`,
            },
          });
        });
      }
    }

    updateArrows = () => {
      const idx = this.navigationNode.children.length - 2;

      if (idx >= 0) {
        const scrollLeft = this.navigationNode.scrollLeft;
        const nav = this.navigationNode.getBoundingClientRect();
        const lastLabel = this.navigationNode.children[idx].getBoundingClientRect();

        this.setState({
          arrows: {
            left: scrollLeft > 0,
            right: nav.right < (lastLabel.right - 5),
          },
        });
      }
    }

    scrollNavigation = (factor) => {
      const oldScrollLeft = this.navigationNode.scrollLeft;
      this.navigationNode.scrollLeft += factor * this.navigationNode.clientWidth;
      if (this.navigationNode.scrollLeft !== oldScrollLeft) {
        this.updateArrows();
      }
    }

    scrollRight = () =>
      this.scrollNavigation(-1);

    scrollLeft = () =>
      this.scrollNavigation(+1);

    parseChildren() {
      const headers = [];
      const contents = [];

      React.Children.forEach(this.props.children, (item) => {
        if (isTab(item)) {
          headers.push(item);
          if (item.props.children) {
            contents.push(
              <TabContent theme={this.props.theme}>
                {item.props.children}
              </TabContent>,
            );
          }
        } else if (isTabContent(item)) {
          contents.push(item);
        }
      });

      return { headers, contents };
    }

    renderHeaders(headers) {
      return headers.map((item, idx) => React.cloneElement(item, {
        children: null,
        key: idx, // eslint-disable-line
        index: idx,
        theme: this.props.theme,
        active: this.props.index === idx,
        onClick: (event, index) => {
          this.handleHeaderClick(index);
          if (item.props.onClick) item.props.onClick(event);
        },
      }));
    }

    renderContents(contents) {
      const contentElements = contents.map((item, idx) => React.cloneElement(item, {
        key: idx, // eslint-disable-line
        theme: this.props.theme,
        active: this.props.index === idx,
        hidden: this.props.index !== idx && this.props.hideMode === 'display',
        tabIndex: idx,
      }));

      return this.props.hideMode === 'display'
        ? contentElements
        : contentElements.filter((item, idx) => (idx === this.props.index));
    }

    render() {
      const { className, disableAnimatedBottomBorder, theme, fixed, inverse } = this.props;
      const { left: hasLeftArrow, right: hasRightArrow } = this.state.arrows;
      const { headers, contents } = this.parseChildren();
      const classNamePointer = classnames(theme.pointer, {
        [theme.disableAnimation]: disableAnimatedBottomBorder,
      });

      const classNames = classnames(theme.tabs, {
        [theme.fixed]: fixed,
        [theme.inverse]: inverse,
      }, className);

      return (
        <div data-react-toolbox="tabs" className={classNames}>
          <div className={theme.navigationContainer}>
            {hasLeftArrow && <div className={theme.arrowContainer} onClick={this.scrollRight}>
              <FontIcon className={theme.arrow} value="keyboard_arrow_left" />
            </div>}
            <div className={theme.navigation} role="tablist" ref={(node) => { this.navigationNode = node; }}>
              {this.renderHeaders(headers)}
              <span className={classNamePointer} style={this.state.pointer} />
            </div>
            {hasRightArrow && <div className={theme.arrowContainer} onClick={this.scrollLeft}>
              <FontIcon className={theme.arrow} value="keyboard_arrow_right" />
            </div>}
          </div>
          {this.renderContents(contents)}
        </div>
      );
    }
  }

  return Tabs;
};

const Tabs = factory(InjectTab, InjectTabContent, InjectFontIcon);
export default themr(TABS)(Tabs);
export { factory as tabsFactory };
export { Tabs };
