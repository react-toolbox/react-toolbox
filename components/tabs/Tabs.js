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
      index: PropTypes.number,
      onChange: PropTypes.func,
      theme: PropTypes.shape({
        navigation: PropTypes.string,
        pointer: PropTypes.string,
        tabs: PropTypes.string
      })
    };

    static defaultProps = {
      index: 0
    };

    state = {
      pointer: {}
    };

    componentDidMount () {
      !this.props.disableAnimatedBottomBorder && this.updatePointer(this.props.index);
    }

    componentWillReceiveProps (nextProps) {
      !this.props.disableAnimatedBottomBorder && this.updatePointer(nextProps.index);
    }

    componentWillUnmount () {
      clearTimeout(this.pointerTimeout);
    }

    handleHeaderClick = (idx) => {
      if (this.props.onChange) this.props.onChange(idx);
    };

    parseChildren () {
      const headers = [];
      const contents = [];

      React.Children.forEach(this.props.children, (item) => {
        if (item.type === Tab) {
          headers.push(item);
          if (item.props.children) {
            contents.push(<TabContent children={item.props.children} />);
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
          key: idx,
          active: this.props.index === idx,
          onClick: this.handleHeaderClick.bind(this, idx, item)
        });
      });
    }

    renderContents (contents) {
      const activeIdx = contents.findIndex((item, idx) => {
        return this.props.index === idx;
      });

      if (contents && contents[activeIdx]) {
        return React.cloneElement(contents[activeIdx], {
          key: activeIdx,
          active: true,
          tabIndex: activeIdx
        });
      }
    }

    render () {
      const { className, theme } = this.props;
      const { headers, contents } = this.parseChildren();
      return (
        <div ref='tabs' data-react-toolbox='tabs' className={classnames(theme.tabs, className)}>
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
