/* global React */

import { addons } from 'react/addons';
import utils from '../utils';
import Input from '../input';
import CSSModules from 'react-css-modules';
import style from './style';

const Autocomplete = React.createClass({
  mixins: [addons.PureRenderMixin],

  displayName: 'Autocomplete',

  propTypes: {
    className: React.PropTypes.string,
    dataSource: React.PropTypes.any,
    disabled: React.PropTypes.bool,
    error: React.PropTypes.string,
    label: React.PropTypes.string,
    multiple: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    required: React.PropTypes.bool,
    value: React.PropTypes.any
  },

  getDefaultProps () {
    return {
      className: '',
      dataSource: {},
      multiple: true
    };
  },

  getInitialState () {
    return {
      dataSource: this._indexDataSource(this.props.dataSource),
      focus: false,
      query: '',
      values: new Map()
    };
  },

  componentDidMount () {
    if (this.props.value) this.setValue(this.props.value);
  },

  componentWillReceiveProps (props) {
    if (props.dataSource) {
      this.setState({dataSource: this._indexDataSource(props.dataSource)});
    }
  },

  componentWillUpdate (props, state) {
    this.refs.input.setValue(state.query);
  },

  handleQueryChange () {
    const query = this.refs.input.getValue();
    if (this.state.query !== query) {
      this.setState({query: query});
    }
  },

  handleKeyPress (event) {
    if (event.which === 13 && this.state.active) {
      this._selectOption(this.state.active);
    }

    if ([40, 38].indexOf(event.which) !== -1) {
      const suggestionsKeys = [...this._getSuggestions().keys()];
      let index = suggestionsKeys.indexOf(this.state.active) + (event.which === 40 ? +1 : -1);
      if (index < 0) index = suggestionsKeys.length - 1;
      if (index >= suggestionsKeys.length) index = 0;
      this.setState({active: suggestionsKeys[index]});
    }
  },

  handleFocus () {
    this.refs.suggestions.getDOMNode().scrollTop = 0;
    this.setState({active: '', focus: true});
  },

  handleBlur () {
    if (this.state.focus) this.setState({focus: false});
  },

  handleHover (event) {
    this.setState({active: event.target.getAttribute('id')});
  },

  handleSelect (event) {
    utils.events.pauseEvent(event);
    this._selectOption(event.target.getAttribute('id'));
  },

  handleUnselect (event) {
    this._unselectOption(event.target.getAttribute('id'));
  },

  _indexDataSource (data = {}) {
    if (data.length) {
      return new Map(data.map((item) => [item, item]));
    } else {
      return new Map(Object.keys(data).map((key) => [key, data[key]]));
    }
  },

  _getSuggestions () {
    let query = this.state.query.toLowerCase().trim() || '';
    let suggestions = new Map();
    for (let [key, value] of this.state.dataSource) {
      if (!this.state.values.has(key) && value.toLowerCase().trim().startsWith(query)) {
        suggestions.set(key, value);
      }
    }
    return suggestions;
  },

  _selectOption (key) {
    let { values, dataSource } = this.state;
    let query = !this.props.multiple ? dataSource.get(key) : '';
    values = new Map(values);

    if (!this.props.multiple) values.clear();
    values.set(key, dataSource.get(key));

    this.setState({focus: false, query: query, values: values}, () => {
      this.refs.input.blur();
      if (this.props.onChange) this.props.onChange(this);
    });
  },

  _unselectOption (key) {
    if (key) {
      let values = new Map(this.state.values);
      values.delete(key);
      this.setState({focus: false, values: values}, () => {
        if (this.props.onChange) this.props.onChange(this);
      });
    }
  },

  getValue () {
    let values = [...this.state.values.keys()];
    return this.props.multiple ? values : (values.length > 0 ? values[0] : null);
  },

  setValue (dataParam = []) {
    let values = new Map();
    let data = (typeof dataParam === 'string') ? [dataParam] : dataParam;
    for (let [key, value] of this.state.dataSource) {
      if (data.indexOf(key) !== -1) values.set(key, value);
    }
    this.setState({values: values, query: this.props.multiple ? '' : values.get(data[0])});
  },

  setError (data) {
    this.input.setError(data);
  },

  renderSelected () {
    if (this.props.multiple) {
      return (
        <ul data-flex='horizontal wrap' onClick={this.handleUnselect}>
          {[...this.state.values].map(([key, value]) => {
            return (<li styleName='value' key={key} id={key}>{value}</li>);
          })}
        </ul>
      );
    }
  },

  render () {
    let suggestionsStyle = this.state.focus ? 'suggestions-visible' : 'suggestions';
    let suggestions = [...this._getSuggestions()].map(([key, value]) => {
      let styleName = this.state.active !== key ? 'suggestion' : 'suggestion-active';
      return <li id={key} key={key} styleName={styleName}>{value}</li>;
    });

    return (
      <div data-toolbox='autocomplete' styleName='container' className={this.props.className}>
        {this.props.label ? (<label styleName='label'>{this.props.label}</label>) : ''}
        {this.renderSelected()}
        <Input
          {...this.props}
          ref='input'
          label=''
          value=''
          onBlur={this.handleBlur}
          onChange={this.handleQueryChange}
          onFocus={this.handleFocus}
          onKeyUp={this.handleKeyPress} />
        <ul
          ref='suggestions'
          styleName={suggestionsStyle}
          onMouseDown={this.handleSelect}
          onMouseOver={this.handleHover}
        >
          {suggestions}
        </ul>
      </div>
    );
  }
});

export default CSSModules(Autocomplete, style);
