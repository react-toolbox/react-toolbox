import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { TABS } from '../identifiers';
import InjectTab from './Tab';
import InjectTabContent from './TabContent';

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
        navigation: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
        pointer: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
        tabs: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
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
    };

    componentDidMount() {
      !this.props.disableAnimatedBottomBorder && this.updatePointer(this.props.index);
      window.addEventListener('resize', this.handleResize);
      this.handleResize();
    }

    componentWillReceiveProps(nextProps) {
      !this.props.disableAnimatedBottomBorder && this.updatePointer(nextProps.index);
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.handleResize);
      clearTimeout(this.resizeTimeout);
      clearTimeout(this.pointerTimeout);
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
    };

    parseChildren() {
      const headers = [];
      const contents = [];

      React.Children.forEach(this.props.children, (item) => {
        if (item.type === Tab) {
          headers.push(item);
          if (item.props.children) {
            contents.push(<TabContent theme={this.props.theme}>{item.props.children}</TabContent>);
          }
        } else if (item.type === TabContent) {
          contents.push(item);
        }
      });

      return { headers, contents };
    }

    updatePointer(idx) {
      clearTimeout(this.pointerTimeout);
      this.pointerTimeout = setTimeout(() => {
        const startPoint = this.tabsNode.getBoundingClientRect().left;
        const label = this.navigationNode.children[idx].getBoundingClientRect();
        this.setState({
          pointer: {
            top: `${this.navigationNode.getBoundingClientRect().height}px`,
            left: `${label.left - startPoint}px`,
            width: `${label.width}px`,
          },
        });
      }, 20);
    }

    renderHeaders(headers) {
      return headers.map((item, idx) => (
        React.cloneElement(item, {
          id: idx,
          key: idx,
          theme: this.props.theme,
          active: this.props.index === idx,
          onClick: (event) => {
            this.handleHeaderClick(event);
            item.props.onClick && item.props.onClick(event);
          },
        })
      ));
    }

    renderContents(contents) {
      const contentElements = contents.map((item, idx) => (
        React.cloneElement(item, {
          key: idx,
          theme: this.props.theme,
          active: this.props.index === idx,
          hidden: this.props.index !== idx && this.props.hideMode === 'display',
          tabIndex: idx,
        })
      ));

      if (this.props.hideMode === 'display') {
        return contentElements;
      }

      return contentElements.filter((item, idx) => (idx === this.props.index));
    }

    render() {
      const { className, theme, fixed, inverse } = this.props;
      const { headers, contents } = this.parseChildren();
      const classes = classnames(
        theme.tabs,
        className,
        {
          [theme.fixed]: fixed,
          [theme.inverse]: inverse,
        }
      );
      return (
        <div ref={(node) => { this.tabsNode = node; }} data-react-toolbox="tabs" className={classes}>
          <nav className={theme.navigation} ref={(node) => { this.navigationNode = node; }}>
            {this.renderHeaders(headers)}
          </nav>
          <span className={theme.pointer} style={this.state.pointer} />
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
