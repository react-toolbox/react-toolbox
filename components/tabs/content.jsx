import React from 'react';
import style from './style';

class TabContent extends React.Component {
  static propTypes = {
    active: React.PropTypes.bool,
    className: React.PropTypes.string,
    onActive: React.PropTypes.func,
    tabIndex: React.PropTypes.number
  };

  static defaultProps = {
    active: false,
    className: ''
  };

  componentWillReceiveProps (nextProps) {
    if (nextProps.active && this.props.onActive) {
      this.props.onActive();
    }
  }

  render () {
    let className = style.tab;
    if (this.props.active) className += ` ${style.active}`;
    if (this.props.className) className += ` ${this.props.className}`;

    return (
      <section className={className} tabIndex={this.props.tabIndex}>
        {this.props.children}
      </section>
    );
  }
}

export default TabContent;
