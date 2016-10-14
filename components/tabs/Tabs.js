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
      pointer: {}
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
        const startPoint = this.refs.tabs.getBoundingClientRect().left;
        const label = this.refs.navigation.children[idx].getBoundingClientRect();
        this.setState({
          pointer: {
            top: `${this.refs.navigation.getBoundingClientRect().height}px`,
            left: `${label.left - startPoint}px`,
            width: `${label.width}px`
          }
        });
      }, 20);
    }

    renderHeaders (headers) {
      return headers.map((item, idx) => {
        return React.cloneElement(item, {
          id: idx,
          key: idx,
          theme: this.props.theme,
          active: this.props.index === idx,
          onClick: event => {
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
          <nav className={theme.navigation} ref='navigation'>
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
