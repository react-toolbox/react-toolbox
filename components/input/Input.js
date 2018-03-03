import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { isValuePresent } from '../utils/utils';
import { INPUT } from '../identifiers';
import InjectedFontIcon from '../font_icon/FontIcon';

const factory = (FontIcon) => {
  class Input extends React.Component {
    static propTypes = {
      children: PropTypes.node,
      className: PropTypes.string,
      defaultValue: PropTypes.string,
      disabled: PropTypes.bool,
      error: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node,
      ]),
      floating: PropTypes.bool,
      hint: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node,
      ]),
      icon: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
      ]),
      label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node,
      ]),
      maxLength: PropTypes.number,
      multiline: PropTypes.bool,
      name: PropTypes.string,
      onBlur: PropTypes.func,
      onChange: PropTypes.func,
      onFocus: PropTypes.func,
      onKeyPress: PropTypes.func,
      required: PropTypes.bool,
      role: PropTypes.string,
      rows: PropTypes.number,
      theme: PropTypes.shape({
        bar: PropTypes.string,
        counter: PropTypes.string,
        disabled: PropTypes.string,
        error: PropTypes.string,
        errored: PropTypes.string,
        hidden: PropTypes.string,
        hint: PropTypes.string,
        icon: PropTypes.string,
        input: PropTypes.string,
        inputElement: PropTypes.string,
        required: PropTypes.string,
        withIcon: PropTypes.string,
      }),
      type: PropTypes.string,
      value: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.object,
        PropTypes.string,
      ]),
    };

    static defaultProps = {
      className: '',
      hint: '',
      disabled: false,
      floating: true,
      multiline: false,
      required: false,
      role: 'input',
      type: 'text',
    };

    componentDidMount() {
      if (this.props.multiline) {
        window.addEventListener('resize', this.handleAutoresize);
        this.handleAutoresize();
      }
    }

    componentWillReceiveProps(nextProps) {
      if (!this.props.multiline && nextProps.multiline) {
        window.addEventListener('resize', this.handleAutoresize);
      } else if (this.props.multiline && !nextProps.multiline) {
        window.removeEventListener('resize', this.handleAutoresize);
      }
    }

    componentDidUpdate() {
      // resize the textarea, if nessesary
      if (this.props.multiline) this.handleAutoresize();
    }

    componentWillUnmount() {
      if (this.props.multiline) window.removeEventListener('resize', this.handleAutoresize);
    }

    handleChange = (event) => {
      const { onChange, multiline, maxLength } = this.props;
      const valueFromEvent = event.target.value;

      // Trim value to maxLength if that exists (only on multiline inputs).
      // Note that this is still required even tho we have the onKeyPress filter
      // because the user could paste smt in the textarea.
      const haveToTrim = (multiline && maxLength && event.target.value.length > maxLength);
      const value = haveToTrim ? valueFromEvent.substr(0, maxLength) : valueFromEvent;

      // propagate to to store and therefore to the input
      if (onChange) onChange(value, event);
    };

    handleAutoresize = () => {
      const element = this.inputNode;
      const rows = this.props.rows;

      if (typeof rows === 'number' && !isNaN(rows)) {
        element.style.height = null;
      } else {
        // compute the height difference between inner height and outer height
        const style = getComputedStyle(element, null);
        const heightOffset = style.boxSizing === 'content-box'
          ? -(parseFloat(style.paddingTop) + parseFloat(style.paddingBottom))
          : parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);

        // resize the input to its content size
        element.style.height = 'auto';
        element.style.height = `${element.scrollHeight + heightOffset}px`;
      }
    }

    handleKeyPress = (event) => {
      // prevent insertion of more characters if we're a multiline input
      // and maxLength exists
      const { multiline, maxLength, onKeyPress } = this.props;
      if (multiline && maxLength) {
        // check if smt is selected, in which case the newly added charcter would
        // replace the selected characters, so the length of value doesn't actually
        // increase.
        const isReplacing = event.target.selectionEnd - event.target.selectionStart;
        const value = event.target.value;

        if (!isReplacing && value.length === maxLength) {
          event.preventDefault();
          event.stopPropagation();
          return undefined;
        }
      }

      if (onKeyPress) onKeyPress(event);
      return undefined;
    };

    blur() {
      this.inputNode.blur();
    }

    focus() {
      this.inputNode.focus();
    }

    render() {
      const { children, defaultValue, disabled, error, floating, hint, icon,
              name, label: labelText, maxLength, multiline, required, role,
              theme, type, value, onKeyPress, rows = 1, ...others } = this.props;
      const length = maxLength && value ? value.length : 0;
      const labelClassName = classnames(theme.label, { [theme.fixed]: !floating });

      const className = classnames(theme.input, {
        [theme.disabled]: disabled,
        [theme.errored]: error,
        [theme.hidden]: type === 'hidden',
        [theme.withIcon]: icon,
      }, this.props.className);

      const valuePresent = isValuePresent(value) || isValuePresent(defaultValue);

      const inputElementProps = {
        ...others,
        className: classnames(theme.inputElement, { [theme.filled]: valuePresent }),
        onChange: this.handleChange,
        ref: (node) => { this.inputNode = node; },
        role,
        name,
        defaultValue,
        disabled,
        required,
        type,
        value,
      };
      if (!multiline) {
        inputElementProps.maxLength = maxLength;
        inputElementProps.onKeyPress = onKeyPress;
      } else {
        inputElementProps.rows = rows;
        inputElementProps.onKeyPress = this.handleKeyPress;
      }

      return (
        <div data-react-toolbox="input" className={className}>
          {React.createElement(multiline ? 'textarea' : 'input', inputElementProps)}
          {icon ? <FontIcon className={theme.icon} value={icon} /> : null}
          <span className={theme.bar} />
          {labelText
            ? <label className={labelClassName}>
              {labelText}
              {required ? <span className={theme.required}> * </span> : null}
            </label>
            : null}
          {hint ? <span hidden={labelText} className={theme.hint}>{hint}</span> : null}
          {error ? <span className={theme.error}>{error}</span> : null}
          {maxLength ? <span className={theme.counter}>{length}/{maxLength}</span> : null}
          {children}
        </div>
      );
    }
  }

  return Input;
};

const Input = factory(InjectedFontIcon);
export default themr(INPUT)(Input);
export { factory as inputFactory };
export { Input };
