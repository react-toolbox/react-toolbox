import React from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';

class TabHeader extends React.Component {
  static propTypes = {
    active: React.PropTypes.bool,
    activeClassName: React.PropTypes.string,
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    hidden: React.PropTypes.bool,
    label: React.PropTypes.any.isRequired,
    onActive: React.PropTypes.func,
    onClick: React.PropTypes.func,
    theme: React.PropTypes.shape({
      active: React.PropTypes.string,
      disabled: React.PropTypes.string,
      hidden: React.PropTypes.string,
      label: React.PropTypes.string
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

export default themr('ToolboxTabs')(TabHeader);
