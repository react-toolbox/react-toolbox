import React from 'react';
import ClassNames from 'classnames';
import style from './style';

const Tooltip = (ComposedComponent) => class extends React.Component {
  static propTypes = {
    children: React.PropTypes.any,
    className: React.PropTypes.string,
    onClick: React.PropTypes.func,
    onMouseEnter: React.PropTypes.func,
    onMouseLeave: React.PropTypes.func,
    tooltip: React.PropTypes.string,
    tooltipDelay: React.PropTypes.number,
    tooltipHideOnClick: React.PropTypes.bool
  };

  static defaultProps = {
    className: '',
    tooltipDelay: 0,
    tooltipHideOnClick: true
  };

  state = {
    active: false
  };

  handleMouseEnter = (event) => {
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() =>this.setState({active: true}), this.props.tooltipDelay);
    if (this.props.onMouseEnter) this.props.onMouseEnter(event);
  };

  handleMouseLeave = (event) => {
    if (this.timeout) clearTimeout(this.timeout);
    if (this.state.active) this.setState({active: false});
    if (this.props.onMouseLeave) this.props.onMouseLeave(event);
  };

  handleClick = (event) => {
    if (this.timeout) clearTimeout(this.timeout);
    if (this.props.tooltipHideOnClick) this.setState({active: false});
    if (this.props.onClick) this.props.onClick(event);
  };

  render () {
    const {children, className, tooltip, tooltipDelay, tooltipHideOnClick, ...other} = this.props; //eslint-disable-line no-unused-vars
    const composedClassName = ClassNames(style.root, className);
    const tooltipClassName = ClassNames(style.tooltip, {
      [style.active]: this.state.active
    });

    return (
      <ComposedComponent
        {...other}
        className={composedClassName}
        onClick={this.handleClick}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        {children ? children : null}
        <span data-react-toolbox="tooltip" className={tooltipClassName}>{tooltip}</span>
      </ComposedComponent>
    );
  }
};

export default Tooltip;
