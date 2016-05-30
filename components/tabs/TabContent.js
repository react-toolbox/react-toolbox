import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { TABS } from '../identifiers.js';

class TabContent extends Component {
  static propTypes = {
    active: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string,
    tabIndex: PropTypes.number,
    theme: PropTypes.shape({
      active: PropTypes.string,
      tab: PropTypes.string
    })
  };

  static defaultProps = {
    active: false,
    className: ''
  };

  render () {
    const className = classnames(this.props.theme.tab, {
      [this.props.theme.active]: this.props.active
    }, this.props.className);

    return (
      <section className={className} tabIndex={this.props.tabIndex}>
        {this.props.children}
      </section>
    );
  }
}

export default themr(TABS)(TabContent);
export { TabContent };
