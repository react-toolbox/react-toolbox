import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { TABS } from '../identifiers.js';
import InjectFontIcon from '../font_icon/FontIcon.js';
import InjectTab from './Tab.js';
import InjectTabContent from './TabContent.js';

const factory = (Tab, TabContent, FontIcon) => {
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
        tabs: PropTypes.string
      })
    };

    static defaultProps = {
      index: 0,
      fixed: false,
      inverse: false,
      hideMode: 'unmounted'
    };

    state = {
      pointer: {},
      arrows: {}
    };

    componentDidMount () {
      window.addEventListener('resize', this.handleResize);
      this.handleResize();
    }

    componentWillReceiveProps (nextProps) {
      this.updatePointer(nextProps.index);
    }

    componentWillUnmount () {
      window.removeEventListener('resize', this.handleResize);
      clearTimeout(this.resizeTimeout);
    }

    handleHeaderClick = (event) => {
      const idx = parseInt(event.currentTarget.id);
      if (this.props.onChange) this.props.onChange(idx);
    };

    handleResize = () => {
      if (this.resizeTimeout) clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(() => {
        this.updatePointer(this.props.index);
        this.updateArrows();
      }, 100);
    };

    updatePointer = idx => {
      if (this.navigationNode && this.navigationNode.children[idx]) {
        const nav = this.navigationNode.getBoundingClientRect();
        const label = this.navigationNode.children[idx].getBoundingClientRect();
        const scrollLeft = this.navigationNode.scrollLeft;
        this.setState({
          pointer: {
            top: `${nav.height}px`,
            left: `${label.left - nav.left + scrollLeft}px`,
            width: `${label.width}px`
          }
        });
      }
    }

    updateArrows = () => {
      const nav = this.navigationNode;
      this.setState({
        arrows: {
          left: nav.scrollLeft > 0,
          right: nav.scrollWidth > nav.clientWidth
            && (nav.scrollLeft + nav.clientWidth) < nav.scrollWidth
        }
      });
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

    parseChildren () {
      const headers = [];
      const contents = [];

      React.Children.forEach(this.props.children, (item) => {
        if (item.type === Tab) {
          headers.push(item);
          if (item.props.children) {
            contents.push(<TabContent children={item.props.children} theme={this.props.theme} />);
          }
        } else if (item.type === TabContent) {
          contents.push(item);
        }
      });

      return {headers, contents};
    }

    renderHeaders (headers) {
      return headers.map((item, idx) => {
        return React.cloneElement(item, {
          id: idx,
          key: idx,
          theme: this.props.theme,
          active: this.props.index === idx,
          onClick: (event) => {
            this.handleHeaderClick(event);
            item.props.onClick && item.props.onClick(event);
          }
        });
      });
    }

    renderContents (contents) {
      const contentElements = contents.map((item, idx) => {
        return React.cloneElement(item, {
          key: idx,
          theme: this.props.theme,
          active: this.props.index === idx,
          hidden: this.props.index !== idx && this.props.hideMode === 'display',
          tabIndex: idx
        });
      });

      return this.props.hideMode === 'display'
        ? contentElements
        : contentElements.filter((item, idx) => (idx === this.props.index));
    }

    render () {
      const { className, disableAnimatedBottomBorder, theme, fixed, inverse } = this.props;
      const { left: hasLeftArrow, right: hasRightArrow } = this.state.arrows;
      const { headers, contents } = this.parseChildren();
      const classNamePointer = classnames(theme.pointer, {
        [theme.disableAnimation]: disableAnimatedBottomBorder
      });

      const classNames = classnames(theme.tabs, {
        [theme.fixed]: fixed,
        [theme.inverse]: inverse
      }, className);

      return (
        <div data-react-toolbox='tabs' className={classNames}>
          <div className={theme.navigationContainer}>
            {hasLeftArrow && <div className={theme.arrowContainer} onClick={this.scrollRight}>
              <FontIcon className={theme.arrow} value="keyboard_arrow_left" />
            </div>}
            <nav className={theme.navigation} ref={node => {this.navigationNode = node; }}>
              {this.renderHeaders(headers)}
              <span className={classNamePointer} style={this.state.pointer} />
            </nav>
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
