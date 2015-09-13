/* global React */

import css from './style';
import utils from '../utils';
import Input from '../input';

export default React.createClass({
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
    type: React.PropTypes.string,
    value: React.PropTypes.any
  },

  getDefaultProps () {
    return {
      className: '',
      dataSource: {},
      multiple: true,
      type: 'text'
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
    this.setState({focus: false});
  },

  handleHover (event) {
    this.setState({active: event.target.getAttribute('id')});
  },

  handleSelect (event) {
    utils.events.pauseEvent(event);
    this._selectOption(event.target.getAttribute('id'));
  },

  handleDelete (event) {
    this.state.values.delete(event.target.getAttribute('id'));
    this.setState({focus: false});
    if (this.props.onChange) this.props.onChange(this);
  },

  renderSelected () {
    if (this.props.multiple) {
      return (
        <ul className={css.values} data-flex='horizontal wrap' onClick={this.handleDelete}>
          {[...this.state.values].map(([key, value]) => {
            return (<li key={key} id={key}>{value}</li>);
          })}
        </ul>
      );
    }
  },

  render () {
    let className = `${css.root} ${this.props.className}`;
    if (this.props.type) className += ` ${this.props.type}`;
    if (this.state.focus) className += ' focus';

    return (
      <div data-react-toolbox='autocomplete' className={className}>
        {this.props.label ? (<label>{this.props.label}</label>) : ''}
        {this.renderSelected()}
        <Input {...this.props} ref='input' label='' value=''
               onBlur={this.handleBlur}
               onChange={this.handleQueryChange}
               onFocus={this.handleFocus}
               onKeyUp={this.handleKeyPress} />
        <ul ref='suggestions'
            className={css.suggestions}
            onMouseDown={this.handleSelect}
            onMouseOver={this.handleHover}>
          {[...this._getSuggestions()].map(([key, value]) => {
            return (
              <li id={key} key={key} className={this.state.active === key ? 'active' : ''}>
                {value}
              </li>
            );
          })}
        </ul>
      </div>
    );
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
    if (!this.props.multiple) {
      this.state.values.clear();
      this.state.query = this.state.dataSource.get(key);
    } else {
      this.state.query = '';
    }
    this.state.values.set(key, this.state.dataSource.get(key));
    this.refs.input.blur();
    if (this.props.onChange) this.props.onChange(this);
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
  }
});
