import React from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { INPUT } from '../identifiers.js';
import InjectedFontIcon from '../font_icon/FontIcon.js';

const factory = (FontIcon) => {
  class Input extends React.Component {
    static propTypes = {
      children: React.PropTypes.any,
      className: React.PropTypes.string,
      disabled: React.PropTypes.bool,
      error: React.PropTypes.string,
      floating: React.PropTypes.bool,
      hint: React.PropTypes.string,
      icon: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.element
      ]),
      label: React.PropTypes.string,
      maxLength: React.PropTypes.number,
      multiline: React.PropTypes.bool,
      name: React.PropTypes.string,
      onBlur: React.PropTypes.func,
      onChange: React.PropTypes.func,
      onFocus: React.PropTypes.func,
      onKeyPress: React.PropTypes.func,
      required: React.PropTypes.bool,
      rows: React.PropTypes.number,
      theme: React.PropTypes.shape({
        bar: React.PropTypes.string,
        counter: React.PropTypes.string,
        disabled: React.PropTypes.string,
        error: React.PropTypes.string,
        errored: React.PropTypes.string,
        hidden: React.PropTypes.string,
        hint: React.PropTypes.string,
        icon: React.PropTypes.string,
        input: React.PropTypes.string,
        inputElement: React.PropTypes.string,
        required: React.PropTypes.string,
        withIcon: React.PropTypes.string
      }),
      type: React.PropTypes.string,
      value: React.PropTypes.any
    };

    static defaultProps = {
      className: '',
      hint: '',
      disabled: false,
      floating: true,
      multiline: false,
      required: false,
      type: 'text'
    };

    componentDidMount () {
      if (this.props.multiline) {
        window.addEventListener('resize', this.handleAutoresize);
        this.handleAutoresize();
      }
    }

    componentWillReceiveProps (nextProps) {
      if (!this.props.multiline && nextProps.multiline) {
        window.addEventListener('resize', this.handleAutoresize);
      } else if (this.props.multiline && !nextProps.multiline) {
        window.removeEventListener('resize', this.handleAutoresize);
      }
    }

    componentDidUpdate () {
      // resize the textarea, if nessesary
      if (this.props.multiline) this.handleAutoresize();
    }

    componentWillUnmount () {
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
      const element = this.refs.input;
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
          return;
        }
      }

      if (onKeyPress) onKeyPress(event);
    };

    blur () {
      this.refs.input.blur();
    }

    focus () {
      this.refs.input.focus();
    }

    render () {
      const { children, disabled, error, floating, hint, icon,
              name, label: labelText, maxLength, multiline, required,
              theme, type, value, onKeyPress, rows = 1, ...others} = this.props;
      const length = maxLength && value ? value.length : 0;
      const labelClassName = classnames(theme.label, {[theme.fixed]: !floating});

      const className = classnames(theme.input, {
        [theme.disabled]: disabled,
        [theme.errored]: error,
        [theme.hidden]: type === 'hidden',
        [theme.withIcon]: icon
      }, this.props.className);

      const valuePresent = value !== null
        && value !== undefined
        && value !== ''
        && !(typeof value === Number && isNaN(value));

      const inputElementProps = {
        ...others,
        className: classnames(theme.inputElement, {[theme.filled]: valuePresent}),
        onChange: this.handleChange,
        ref: 'input',
        role: 'input',
        name,
        disabled,
        required,
        type,
        value
      };
      if (!multiline) {
        inputElementProps.maxLength = maxLength;
        inputElementProps.onKeyPress = onKeyPress;
      } else {
        inputElementProps.rows = rows;
        inputElementProps.onKeyPress = this.handleKeyPress;
      }

      return (
        <div data-react-toolbox='input' className={className}>
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
export default themr(INPUT, null, { withRef: true })(Input);
export { factory as inputFactory };
export { Input };
