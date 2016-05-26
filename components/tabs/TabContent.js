import React from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';

class TabContent extends React.Component {
  static propTypes = {
    active: React.PropTypes.bool,
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    tabIndex: React.PropTypes.number,
    theme: React.PropTypes.shape({
      active: React.PropTypes.string,
      tab: React.PropTypes.string
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

export default themr('ToolboxTabs')(TabContent);
