import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { BUTTON } from '../identifiers';
import InjectFontIcon from '../font_icon/FontIcon';
import rippleFactory from '../ripple/Ripple';

const factory = (ripple, FontIcon) => {
  class SimpleBrowseButton extends Component {
    static propTypes = {
      accent: PropTypes.bool,
      accept: PropTypes.string,
      children: PropTypes.node,
      className: PropTypes.string,
      disabled: PropTypes.bool,
      flat: PropTypes.bool,
      floating: PropTypes.bool,
      icon: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
      ]),
      inverse: PropTypes.bool,
      label: PropTypes.string,
      mini: PropTypes.bool,
      multiple: PropTypes.bool,
      neutral: PropTypes.bool,
      onChange: PropTypes.func,
      onMouseLeave: PropTypes.func,
      onMouseUp: PropTypes.func,
      primary: PropTypes.bool,
      raised: PropTypes.bool,
      theme: PropTypes.shape({
        accent: PropTypes.string,
        button: PropTypes.string,
        flat: PropTypes.string,
        floating: PropTypes.string,
        icon: PropTypes.string,
        inverse: PropTypes.string,
        mini: PropTypes.string,
        neutral: PropTypes.string,
        primary: PropTypes.string,
        raised: PropTypes.string,
        rippleWrapper: PropTypes.string,
        toggle: PropTypes.string,
      }),
      type: PropTypes.string,
    };

    static defaultProps = {
      accent: false,
      accept: '*/*',
      className: '',
      flat: false,
      floating: false,
      mini: false,
      multiple: false,
      neutral: true,
      primary: false,
      raised: false,
    };

    getLevel = () => {
      if (this.props.primary) return 'primary';
      if (this.props.accent) return 'accent';
      return 'neutral';
    }

    getShape = () => {
      if (this.props.raised) return 'raised';
      if (this.props.floating) return 'floating';
      return 'flat';
    }

    handleMouseUp = (event) => {
      this.labelNode.blur();
      if (this.props.onMouseUp) this.props.onMouseUp(event);
    };

    handleMouseLeave = (event) => {
      this.labelNode.blur();
      if (this.props.onMouseLeave) this.props.onMouseLeave(event);
    };

    handleFileChange = (event) => {
      if (this.props.onChange) this.props.onChange(event);
    };

    render() {
      const {
        accent,    // eslint-disable-line
        accept,
        children,
        className,
        flat,      // eslint-disable-line
        floating,  // eslint-disable-line
        icon,
        inverse,
        label,
        mini,
        multiple,
        neutral,
        primary,   // eslint-disable-line
        raised,    // eslint-disable-line
        theme,
        ...others
      } = this.props;
      const element = 'label';
      const level = this.getLevel();
      const shape = this.getShape();

      const classes = classnames(theme.button, [theme[shape]], {
        [theme[level]]: neutral,
        [theme.mini]: mini,
        [theme.inverse]: inverse,
      }, className);

      const props = {
        ...others,
        ref: (node) => { this.labelNode = node; },
        onChange: null,
        className: classes,
        disabled: this.props.disabled,
        onMouseUp: this.handleMouseUp,
        onMouseLeave: this.handleMouseLeave,
        'data-react-toolbox': 'label',
      };

      return React.createElement(element, props,
          icon ? <FontIcon className={theme.icon} value={icon} /> : null,
        <span>{label}</span>,
        <input
          className={classes}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={this.handleFileChange}
        />,
          children,
        );
    }
  }

  return ripple(SimpleBrowseButton);
};

const BrowseButton = factory(rippleFactory({ centered: false }), InjectFontIcon);
export default themr(BUTTON)(BrowseButton);
export { factory as browseButtonFactory };
export { BrowseButton };
