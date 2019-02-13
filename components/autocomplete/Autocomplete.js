/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { AUTOCOMPLETE } from '../identifiers.js';
import InjectChip from '../chip/Chip.js';
import InjectInput from '../input/Input.js';
import events from '../utils/events.js';
import Portal from '../hoc/Portal';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import Transition from 'react-transition-group/Transition';

const POSITION = {
  AUTO: 'auto',
  DOWN: 'down',
  UP: 'up',
};

const factory = (Chip, Input) => {
  class Autocomplete extends Component {
    static propTypes = {
      allowClear: PropTypes.bool,
      clearTooltip: PropTypes.string,
      className: PropTypes.string,
      direction: PropTypes.oneOf(['auto', 'up', 'down']),
      disabled: PropTypes.bool,
      error: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node,
      ]),
      keepFocusOnChange: PropTypes.bool,
      label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node,
      ]),
      labelKey: PropTypes.string,
      valueKey: PropTypes.string,
      multiple: PropTypes.bool,
      onBlur: PropTypes.func,
      onChange: PropTypes.func,
      onFocus: PropTypes.func,
      onKeyDown: PropTypes.func,
      onKeyUp: PropTypes.func,
      onQueryChange: PropTypes.func,
      query: PropTypes.string,
      selectedPosition: PropTypes.oneOf(['above', 'below', 'none']),
      source: PropTypes.any,
      minWidth: PropTypes.number,
      suggestionMatch: PropTypes.oneOf(['disabled', 'start', 'anywhere', 'word', 'none']),
      theme: PropTypes.shape({
        active: PropTypes.string,
        autocomplete: PropTypes.string,
        focus: PropTypes.string,
        input: PropTypes.string,
        suggestion: PropTypes.string,
        suggestions: PropTypes.string,
        up: PropTypes.string,
        value: PropTypes.string,
        values: PropTypes.string,
      }),
      value: PropTypes.any,
      inputProps: PropTypes.object,
    };

    static defaultProps = {
      allowClear: false,
      clearTooltip: 'Clear',
      className: '',
      direction: 'auto',
      keepFocusOnChange: false,
      multiple: true,
      selectedPosition: 'above',
      source: {},
      suggestionMatch: 'start',
    };

    state = {
      focus: false,
      query: this.props.query,
    };

    componentWillReceiveProps(nextProps) {
      if (this.props.query !== nextProps.query) {
        this.setState({ query: nextProps.query });
      }
    }

    shouldComponentUpdate(nextProps, nextState) {
      if (!this.state.focus && nextState.focus) {
        this.calculateDirection();
      }
      return true;
    }

    handleChange = (value, event) => {
      if (this.props.onChange) {
        this.props.onChange(value, event);
      }
      if (!this.props.keepFocusOnChange) {
        this.updateQuery(undefined);
        this.setState({ query: undefined, focus: false }, () => {
          ReactDOM.findDOMNode(this).querySelector('input').blur();
        });
      }
    };

    handleMouseDown = (event) => {
      this.selectOrCreateActiveItem(event);
    };

    handleQueryBlur = (event) => {
      if (this.state.focus) this.setState({ focus: false });
      if (this.props.onBlur) this.props.onBlur(event, this.state.active);
    };

    updateQuery = (query) => {
      if (this.props.onQueryChange) this.props.onQueryChange(query);
      this.setState({ query });
    };

    handleQueryChange = (value, event) => {
      if (value === '' && !this.props.multiple &&
        this.props.allowClear && this.props.onChange) {
        this.props.onChange(null, event);
      }
      this.updateQuery(value);
      this.setState({ active: null });
    };

    handleQueryFocus = (event) => {
      event.target.scrollTop = 0;
      this.setState({ active: null, focus: true });
      if (this.props.onFocus) this.props.onFocus(event);
    };

    handleQueryKeyDown = (event) => {
      if (event.which === 13) {
        this.selectOrCreateActiveItem(event);
      }

      if(this.props.onKeyDown) this.props.onKeyDown(event);
    };

    handleQueryKeyUp = (event) => {
      if (event.which === 27) ReactDOM.findDOMNode(this).querySelector('input').blur();

      if ([40, 38].indexOf(event.which) !== -1) {
        const suggestionsKeys = [...this.suggestions().keys()];
        let index = suggestionsKeys.indexOf(this.state.active) + (event.which === 40 ? +1 : -1);
        if (index < 0) index = suggestionsKeys.length - 1;
        if (index >= suggestionsKeys.length) index = 0;
        this.setState({ active: suggestionsKeys[index] });
      }

      if(this.props.onKeyUp) this.props.onKeyUp(event);
    };

    handleSuggestionHover = (event) => {
      let t = event.target;
      while (t && !t.id) {
        t = t.parentNode;
      }
      this.setState({ active: t && t.id || '' });
    };

    calculateDirection() {
      const client = ReactDOM.findDOMNode(this.inputNode).getBoundingClientRect();
      const screen_width = window.innerWidth || document.documentElement.offsetWidth;
      const screen_height = window.innerHeight || document.documentElement.offsetHeight;
      let direction = this.props.direction;
      if (this.props.direction === 'auto') {
        const up = client.top > ((screen_height / 2) + client.height);
        direction = up ? 'up' : 'down';
      }
      let top = client.top
        + (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop)
        - (document.documentElement.clientTop || document.body.clientTop || 0);
      top = direction == 'down' ? top + client.height + 'px' : top + 'px';
      const bottom = direction == 'up' ? '0px' : undefined;
      let left = (client.left
        + (window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft)
        - (document.documentElement.clientLeft || document.body.clientLeft || 0));
      let width = (this.props.minWidth && client.width < this.props.minWidth ? this.props.minWidth : client.width);
      if (left + width >= screen_width) {
        left = screen_width - width;
      }
      let maxHeight = direction == 'down' ? (screen_height-client.top-client.height) : client.top;
      if (maxHeight > screen_height*0.45) {
        maxHeight = Math.floor(screen_height*0.45);
      }
      left = left+'px';
      width = width+'px';
      maxHeight = maxHeight+'px';
      if (this.state.top !== top || this.state.left !== left ||
        this.state.width !== width || this.state.bottom !== bottom ||
        this.state.maxHeight !== maxHeight) {
        this.setState({ top, bottom, left, width, maxHeight });
      }
    }

    selectOrCreateActiveItem(event) {
      let target = this.state.active;
      if (target == null) {
        for (let k of this.suggestions().keys()) {
          this.setState({ active: k });
          break;
        }
      } else {
        this.select(event, target);
      }
    }

    normalise(value) {
      const sdiak = 'áâäąáâäąččććççĉĉďđďđééěëēėęéěëēėęĝĝğğġġģģĥĥħħíîíîĩĩīīĭĭįįi̇ıĵĵķķĸĺĺļļŀŀłłĺľĺľňńņŋŋņňńŉóöôőøōōóöőôøřřŕŕŗŗššśśŝŝşşţţťťŧŧũũūūŭŭůůűűúüúüűųųŵŵýyŷŷýyžžźźżżß';
      const bdiak = 'AAAAAAAACCCCCCCCDDDDEEEEEEEEEEEEEGGGGGGGGHHHHIIIIIIIIIIIIIIJJKKKLLLLLLLLLLLLNNNNNNNNNOOOOOOOOOOOORRRRRRSSSSSSSSTTTTTTUUUUUUUUUUUUUUUUUWWYYYYYYZZZZZZS';

      let normalised = '';
      for (let p = 0; p < value.length; p++) {
        if (sdiak.indexOf(value.charAt(p)) !== -1) {
          normalised += bdiak.charAt(sdiak.indexOf(value.charAt(p)));
        } else {
          normalised += value.charAt(p);
        }
      }

      return normalised.toLowerCase().trim();
    }

    suggestions() {
      let suggest = new Map();
      const source = this.source();
      const query = this.normalise(this.state.query == null ? '' : this.state.query+'');

      if (query !== '' && this.props.suggestionMatch !== 'disabled' && this.props.suggestionMatch !== 'none') {
        for (const [key, value] of source) {
          if (this.matches(this.normalise(value), query)) {
            suggest.set(''+key, value);
          }
        }
      } else {
        suggest = this.props.multiple ? new Map(source) : source;
      }
      if (this.props.multiple) {
        const values = this.isValueAnObject() ? Object.keys(this.props.value) : this.props.value||[];
        for (const k of values) {
          suggest.delete(''+k);
        }
      }

      return suggest;
    }

    matches(value, query) {
      const { suggestionMatch } = this.props;

      if (suggestionMatch === 'start') {
        return value.startsWith(query);
      } else if (suggestionMatch === 'anywhere') {
        return value.includes(query);
      } else if (suggestionMatch === 'word') {
        const re = new RegExp(`\\b${query}`, 'g');
        return re.test(value);
      }

      return false;
    }

    source() {
      const src = this.props.source;
      if (this._cachedSource != src) {
        this._cachedSource = src;
        const valueKey = this.props.valueKey || 'value';
        const labelKey = this.props.labelKey || 'label';
        if (src.hasOwnProperty('length')) {
          this._source = new Map(src.map(item => {
            if (Array.isArray(item)) {
              return [''+item[0], item[1]];
            } else if (typeof item != 'object') {
              return [''+item, item];
            } else {
              return [''+item[valueKey], item[labelKey]];
            }
          }));
        } else {
          this._source = new Map(Object.keys(src).map(key => [`${key}`, src[key]]));
        }
      }
      return this._source;
    }

    select = (event, target) => {
      events.pauseEvent(event);
      let newValue = target === void 0 ? event.target.id : target;
      if (this.isValueAnObject()) {
        newValue = { ...(this.props.value||{}), [newValue]: true };
      } else if (this.props.multiple) {
        newValue = [ ...(this.props.value||[]), newValue ];
      }
      this.handleChange(newValue, event);
    }

    unselect(key, event) {
      if (!this.props.disabled) {
        let newValue;
        if (this.isValueAnObject()) {
          newValue = { ...this.props.value };
          delete newValue[key];
        } else if (this.props.multiple) {
          newValue = (this.props.value||[]).filter(v => v != key);
        }
        this.handleChange(newValue, event);
      }
    }

    isValueAnObject() {
      return this.props.value && !Array.isArray(this.props.value) && typeof this.props.value === 'object';
    }

    mapToObject(array) {
      return array.reduce((obj, k) => {
        obj[k] = true;
        return obj;
      }, {});
    }

    renderSelected() {
      if (this.props.multiple) {
        const values = this.isValueAnObject() ? Object.keys(this.props.value) : this.props.value||[];
        const source = this.source();
        const selectedItems = values.map(key => (
          <Chip
            key={key}
            className={this.props.theme.value}
            deletable
            onDeleteClick={this.unselect.bind(this, key)}
          >
            {source.get(''+key)}
          </Chip>
         ));

        return <ul className={this.props.theme.values}>{selectedItems}</ul>;
      }
    }

    renderSuggestions() {
      const { theme } = this.props;
      return [...this.suggestions()].map(([key, value]) => {
        const className = classnames(theme.suggestion, { [theme.active]: this.state.active === key });
        return (
          <li
            id={key}
            key={key}
            className={className}
            onMouseDown={this.handleMouseDown}
            onMouseOver={this.handleSuggestionHover}
          >
            {value}
          </li>
        );
      });
    }

    renderSuggestionList() {
      const { theme } = this.props;
      const { top, bottom, maxHeight, left, width } = this.state;
      return (<TransitionGroup style={{position: 'absolute', top, left, width}}>
        <Transition
          appear={true}
          timeout={0}
          onEntered={(node, appearing) => { node.style.maxHeight = maxHeight; }}>
          <ul style={{bottom}}
            className={theme.suggestions}>
            {this.renderSuggestions()}
          </ul>
        </Transition>
      </TransitionGroup>);
    }

    render() {
      const {
        placeholder, allowClear, className, clearTooltip, disabled,
        error, label, value, selectedPosition, theme, multiple
      } = this.props;
      const inputProps = this.props.inputProps || {};
      const outerClassName = classnames(theme.autocomplete, {
        [theme.focus]: this.state.focus,
      }, className);
      const withClear = allowClear && (multiple
        ? value && Object.keys(value).length > 0
        : value != null);
      return (
        <div data-react-toolbox="autocomplete" className={outerClassName}>
          {selectedPosition === 'above' ? this.renderSelected() : null}
          {withClear ? <span
            className={'material-icons '+theme.clear}
            title={clearTooltip}
            onClick={e => this.handleChange(multiple ? [] : null, e)}>clear</span> : null}
          <Input
            {...inputProps}
            ref={(node) => { this.inputNode = node; }}
            autoComplete="off"
            className={theme.input+(withClear ? ' '+theme.withclear : '')}
            placeholder={placeholder}
            disabled={disabled}
            error={error}
            label={label}
            onBlur={this.handleQueryBlur}
            onChange={this.handleQueryChange}
            onFocus={this.handleQueryFocus}
            onKeyDown={this.handleQueryKeyDown}
            onKeyUp={this.handleQueryKeyUp}
            theme={theme}
            themeNamespace="input"
            value={this.state.query == null
              ? (multiple || value == null
                ? ''
                : this.source().get(''+value))
              : this.state.query}
          />
          <Portal>
            {this.state.focus ? this.renderSuggestionList() : null}
          </Portal>
          {selectedPosition === 'below' ? this.renderSelected() : null}
        </div>
      );
    }
  }

  return Autocomplete;
};

const Autocomplete = factory(InjectChip, InjectInput);
export default themr(AUTOCOMPLETE, null, { withRef: true })(Autocomplete);
export { factory as autocompleteFactory };
export { Autocomplete };
