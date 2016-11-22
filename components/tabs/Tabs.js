import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { TABS } from '../identifiers.js';
import InjectTab from './Tab.js';
import InjectTabContent from './TabContent.js';

const factory = (Tab, TabContent) => {
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
        fixed: PropTypes.string,
        inverse: PropTypes.string,
        navigation: PropTypes.string,
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
      !this.props.disableAnimatedBottomBorder && this.updatePointer(this.props.index);
      window.addEventListener('resize', this.handleResize);
      this.handleResize();
    }

    componentWillReceiveProps (nextProps) {
      !this.props.disableAnimatedBottomBorder && this.updatePointer(nextProps.index);
    }

    componentWillUnmount () {
      window.removeEventListener('resize', this.handleResize);
      clearTimeout(this.resizeTimeout);
      clearTimeout(this.pointerTimeout);
      clearTimeout(this.arrowsTimeout);
    }

    handleHeaderClick = (event) => {
      const idx = parseInt(event.currentTarget.id);
      if (this.props.onChange) this.props.onChange(idx);
    };

    handleResize = () => {
      if (this.resizeTimeout) {
        clearTimeout(this.resizeTimeout);
      }
      this.resizeTimeout = setTimeout(this.handleResizeEnd, 50);
    };

    handleResizeEnd = () => {
      this.updatePointer(this.props.index);
      this.updateArrows();
    };

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

    updatePointer (idx) {
      clearTimeout(this.pointerTimeout);
      this.pointerTimeout = setTimeout(() => {
        const nav = this.refs.navigation.getBoundingClientRect();
        const label = this.refs.navigation.children[idx].getBoundingClientRect();
        const scrollLeft = this.refs.navigation.scrollLeft;
        this.setState({
          pointer: {
            top: `${nav.height}px`,
            left: `${label.left - nav.left + scrollLeft}px`,
            width: `${label.width}px`
          }
        });
      }, 20);
    }

    updateArrows () {
      clearTimeout(this.arrowsTimeout);
      this.arrowsTimeout = setTimeout(() => {
        const nav = this.refs.navigation;
        this.setState({
          arrows: {
            left: nav.scrollLeft > 0,
            right: nav.scrollWidth > nav.clientWidth && (nav.scrollLeft + nav.clientWidth) < nav.scrollWidth
          }
        });
      }, 20);
    }

    scrollNavigationLeft = () => {
      const oldScrollLeft = this.refs.navigation.scrollLeft;
      this.refs.navigation.scrollLeft -= this.refs.navigation.clientWidth;
      if (this.refs.navigation.scrollLeft !== oldScrollLeft) {
        this.updateArrows();
      }
    }

    scrollNavigationRight = () => {
      const oldScrollLeft = this.refs.navigation.scrollLeft;
      this.refs.navigation.scrollLeft += this.refs.navigation.clientWidth;
      if (this.refs.navigation.scrollLeft !== oldScrollLeft) {
        this.updateArrows();
      }
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

      if (this.props.hideMode === 'display') {
        return contentElements;
      }

      return contentElements.filter((item, idx) => (idx === this.props.index));
    }

    render () {
      const { className, theme, fixed, inverse } = this.props;
      const { headers, contents } = this.parseChildren();
      const classes = classnames(
        theme.tabs,
        className,
        {
          [theme.fixed]: fixed,
          [theme.inverse]: inverse
        }
      );
      return (
        <div ref='tabs' data-react-toolbox='tabs' className={classes}>
          <div className={theme.navigationContainer}>
            <div className={classnames(theme.arrowContainer, { [theme.invisible]: !(this.state.arrows.left || this.state.arrows.right) })} onClick={this.scrollNavigationLeft}>
              <span className={classnames('material-icons', theme.arrow, { [theme.invisible]: !this.state.arrows.left })}>keyboard_arrow_left</span>
            </div>
            <nav className={theme.navigation} ref='navigation'>
              {this.renderHeaders(headers)}
              <span className={theme.pointer} style={this.state.pointer} />
            </nav>
            <div className={classnames(theme.arrowContainer, { [theme.invisible]: !(this.state.arrows.left || this.state.arrows.right) })} onClick={this.scrollNavigationRight}>
              <span className={classnames('material-icons', theme.arrow, { [theme.invisible]: !this.state.arrows.right })}>keyboard_arrow_right</span>
            </div>
          </div>
          {this.renderContents(contents)}
        </div>
      );
    }
  }

  return Tabs;
};

const Tabs = factory(InjectTab, InjectTabContent);
export default themr(TABS)(Tabs);
export { factory as tabsFactory };
export { Tabs };
