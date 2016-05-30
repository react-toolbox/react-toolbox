import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { TABS } from '../identifiers.js';

class Tab extends Component {
  static propTypes = {
    active: PropTypes.bool,
    activeClassName: PropTypes.string,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    hidden: PropTypes.bool,
    label: PropTypes.any.isRequired,
    onActive: PropTypes.func,
    onClick: PropTypes.func,
    theme: PropTypes.shape({
      active: PropTypes.string,
      disabled: PropTypes.string,
      hidden: PropTypes.string,
      label: PropTypes.string
    })
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
    const { active, activeClassName, hidden, disabled, className, theme } = this.props;
    const _className = classnames(theme.label, {
      [theme.active]: active,
      [theme.hidden]: hidden,
      [theme.disabled]: disabled,
      [activeClassName]: active
    }, className);

    return (
      <label data-react-toolbox='tab' className={_className} onClick={this.handleClick}>
        {this.props.label}
      </label>
    );
  }
}

export default themr(TABS)(Tab);
export { Tab };
