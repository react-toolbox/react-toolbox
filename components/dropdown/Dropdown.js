import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { DROPDOWN } from '../identifiers.js';
import InjectInput from '../input/Input.js';
import events from '../utils/events.js';

const factory = (Input) => {
  class Dropdown extends Component {
    static propTypes = {
      allowBlank: PropTypes.bool,
      auto: PropTypes.bool,
      className: PropTypes.string,
      disabled: PropTypes.bool,
      error: PropTypes.string,
      label: PropTypes.string,
      name: PropTypes.string,
      onBlur: PropTypes.func,
      onChange: PropTypes.func,
      onFocus: PropTypes.func,
      source: PropTypes.array.isRequired,
      template: PropTypes.func,
      theme: PropTypes.shape({
        active: PropTypes.string,
        disabled: PropTypes.string,
        dropdown: PropTypes.string,
        error: PropTypes.string,
        errored: PropTypes.string,
        field: PropTypes.string,
        label: PropTypes.string,
        selected: PropTypes.string,
        templateValue: PropTypes.string,
        up: PropTypes.string,
        value: PropTypes.string,
        values: PropTypes.string
      }),
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ])
    };

    static defaultProps = {
      auto: true,
      className: '',
      allowBlank: true,
      disabled: false
    };

    state = {
      active: false,
      up: false
    };

    componentWillUpdate (nextProps, nextState) {
      if (!this.state.active && nextState.active) {
        events.addEventsToDocument({click: this.handleDocumentClick});
      }
    }

    componentDidUpdate (prevProps, prevState) {
      if (prevState.active && !this.state.active) {
        events.removeEventsFromDocument({click: this.handleDocumentClick});
      }
    }

    componentWillUnmount () {
      if (this.state.active) {
        events.removeEventsFromDocument({click: this.handleDocumentClick});
      }
    }

    close = () => {
      if (this.state.active) {
        this.setState({active: false});
      }
    }

    handleDocumentClick = (event) => {
      if (this.state.active && !events.targetIsDescendant(event, ReactDOM.findDOMNode(this))) {
        this.setState({active: false});
      }
    };

    handleMouseDown = (event) => {
      events.pauseEvent(event);
      const client = event.target.getBoundingClientRect();
      const screen_height = window.innerHeight || document.documentElement.offsetHeight;
      const up = this.props.auto ? client.top > ((screen_height / 2) + client.height) : false;
      if (this.props.onFocus) this.props.onFocus(event);
      this.setState({active: true, up});
    };

    handleSelect = (item, event) => {
      if (this.props.onBlur) this.props.onBlur(event);
      if (!this.props.disabled && this.props.onChange) {
        if (this.props.name) {
          event.target.name = this.props.name;
        }
        this.props.onChange(item, event);
        this.setState({active: false});
      }
    };

    getSelectedItem = () => {
      for (const item of this.props.source) {
        if (item.value === this.props.value) return item;
      }
      if (!this.props.allowBlank) {
        return this.props.source[0];
      }
    };

    renderTemplateValue (selected) {
      const { theme } = this.props;
      const className = classnames(theme.field, {
        [theme.errored]: this.props.error,
        [theme.disabled]: this.props.disabled
      });

      return (
        <div className={className} onMouseDown={this.handleMouseDown}>
          <div className={`${theme.templateValue} ${theme.value}`}>
            {this.props.template(selected)}
          </div>
          {this.props.label ? <label className={theme.label}>{this.props.label}</label> : null}
          {this.props.error ? <span className={theme.error}>{this.props.error}</span> : null}
        </div>
      );
    }

    renderValue (item, idx) {
      const { theme } = this.props;
      const className = item.value === this.props.value ? theme.selected : null;
      return (
        <li key={idx} className={className} onMouseDown={this.handleSelect.bind(this, item.value)}>
          {this.props.template ? this.props.template(item) : item.label}
        </li>
      );
    }

    render () {
      const {template, theme, source, ...others} = this.props;
      const selected = this.getSelectedItem();
      const className = classnames(theme.dropdown, {
        [theme.up]: this.state.up,
        [theme.active]: this.state.active,
        [theme.disabled]: this.props.disabled
      }, this.props.className);

      return (
        <div data-react-toolbox='dropdown' className={className}>
          <Input
            {...others}
            className={theme.value}
            onMouseDown={this.handleMouseDown}
            readOnly
            type={template && selected ? 'hidden' : null}
            value={selected && selected.label}
          />
        {template && selected ? this.renderTemplateValue(selected) : null}
          <ul className={theme.values} ref='values'>
            {source.map(this.renderValue.bind(this))}
          </ul>
        </div>
      );
    }
  }

  return Dropdown;
};

const Dropdown = factory(InjectInput);
export default themr(DROPDOWN)(Dropdown);
export { factory as dropdownFactory };
export { Dropdown };
