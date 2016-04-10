import React from 'react';
import ClassNames from 'classnames';
import style from './style';

class TabHeader extends React.Component {
  static propTypes = {
    active: React.PropTypes.bool,
    activeClassName: React.PropTypes.string,
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    hidden: React.PropTypes.bool,
    label: React.PropTypes.any.isRequired,
    onActive: React.PropTypes.func,
    onClick: React.PropTypes.func
  };

  static defaultProps = {
    active: false,
    className: '',
    disabled: false,
    hidden: false
  };

  componentDidUpdate (prevProps) {
    if (!prevProps.active && this.props.active && this.props.onActive) {
      this.props.onActive();
    }
  }

  handleClick = (event) => {
    if (!this.props.disabled && this.props.onClick) {
      this.props.onClick(event);
    }
  };

  render () {
    const className = ClassNames(style.label, {
      [style.active]: this.props.active,
      [style.hidden]: this.props.hidden,
      [style.disabled]: this.props.disabled,
      [this.props.activeClassName]: this.props.active
    }, this.props.className);

    return (
      <label data-react-toolbox='tab' className={className} onClick={this.handleClick}>
        {this.props.label}
      </label>
    );
  }
}

export default TabHeader;
