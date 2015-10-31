import React from 'react';
import ReactDOM from 'react-dom';
import Input from '../input';
import style from './style';
import utils from '../utils';

class Autocomplete extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    dataSource: React.PropTypes.any,
    disabled: React.PropTypes.bool,
    error: React.PropTypes.string,
    label: React.PropTypes.string,
    multiple: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    required: React.PropTypes.bool,
    value: React.PropTypes.any
  };

  static defaultProps = {
      className: '',
      dataSource: {},
      multiple: true
  };

  state = {
    dataSource: this._indexDataSource(this.props.dataSource),
    focus: false,
    query: '',
    up: false,
    values: new Map(),
    width: undefined
  };

  componentDidMount () {
    if (this.props.value) this.setValue(this.props.value);
    this.setState({
      width: ReactDOM.findDOMNode(this).getBoundingClientRect().width
    });
  }

  componentWillReceiveProps (props) {
    if (props.dataSource) {
      this.setState({dataSource: this._indexDataSource(props.dataSource)});
    }
  }

  componentWillUpdate (props, state) {
    this.refs.input.setValue(state.query);
  }

  handleQueryChange = () => {
    const query = this.refs.input.getValue();
    if (this.state.query !== query) {
      this.setState({query});
    }
  };

  handleKeyPress = (event) => {
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
  };

  handleFocus = () => {
    const client = event.target.getBoundingClientRect();
    const screen_height = window.innerHeight || document.documentElement.offsetHeight;

    this.refs.suggestions.scrollTop = 0;
    this.setState({
      active: '',
      up: client.top > ((screen_height / 2) + client.height),
      focus: true
    });
  };

  handleBlur = () => {
    if (this.state.focus) this.setState({focus: false});
  };

  handleHover = (event) => {
    this.setState({active: event.target.getAttribute('id')});
  };

  handleSelect = (event) => {
    utils.events.pauseEvent(event);
    this._selectOption(event.target.getAttribute('id'));
  };

  handleUnselect = (event) => {
    this._unselectOption(event.target.getAttribute('id'));
  };

  renderSelected () {
    if (this.props.multiple) {
      return (
        <ul className={style.values} onClick={this.handleUnselect}>
          {[...this.state.values].map(([key, value]) => {
            return (<li className={style.value} key={key} id={key}>{value}</li>);
          })}
        </ul>
      );
    }
  }

  renderSuggestions () {
    return [...this._getSuggestions()].map(([key, value]) => {
      let className = style.suggestion;
      if (this.state.active === key) className += ` ${style.active}`;
      return <li id={key} key={key} className={className}>{value}</li>;
    });
  }

  render () {
    let className = style.root;
    if (this.props.className) className += ` ${this.props.className}`;
    if (this.state.focus) className += ` ${style.focus}`;

    let suggestionsClassName = style.suggestions;
    if (this.state.up) suggestionsClassName += ` ${style.up}`;
    const suggestionsStyle = {width: this.state.width};

    return (
      <div data-react-toolbox='autocomplete' className={className}>
        {this.props.label ? <label className={style.label}>{this.props.label}</label> : ''}
        {this.renderSelected()}
        <Input
          ref='input'
          {...this.props}
          label=''
          value=''
          className={style.input}
          onBlur={this.handleBlur}
          onChange={this.handleQueryChange}
          onFocus={this.handleFocus}
          onKeyUp={this.handleKeyPress} />
        <ul
          ref='suggestions'
          className={suggestionsClassName}
          onMouseDown={this.handleSelect}
          onMouseOver={this.handleHover}
          style={suggestionsStyle}
        >
          {this.renderSuggestions()}
        </ul>
      </div>
    );
  }

  _indexDataSource (data = {}) {
    if (data.length) {
      return new Map(data.map((item) => [item, item]));
    } else {
      return new Map(Object.keys(data).map((key) => [key, data[key]]));
    }
  }

  _getSuggestions () {
    const query = this.state.query.toLowerCase().trim() || '';
    const suggestions = new Map();
    for (const [key, value] of this.state.dataSource) {
      if (!this.state.values.has(key) && value.toLowerCase().trim().startsWith(query)) {
        suggestions.set(key, value);
      }
    }
    return suggestions;
  }

  _selectOption (key) {
    const { dataSource } = this.state;
    let { values } = this.state;
    const query = !this.props.multiple ? dataSource.get(key) : '';
    values = new Map(values);

    if (!this.props.multiple) values.clear();
    values.set(key, dataSource.get(key));

    this.setState({focus: false, query, values}, () => {
      this.refs.input.blur();
      if (this.props.onChange) this.props.onChange(this);
    });
  }

  _unselectOption (key) {
    if (key) {
      const values = new Map(this.state.values);
      values.delete(key);
      this.setState({focus: false, values}, () => {
        if (this.props.onChange) this.props.onChange(this);
      });
    }
  }

  getValue () {
    const values = [...this.state.values.keys()];
    return this.props.multiple ? values : (values.length > 0 ? values[0] : null);
  }

  setValue (dataParam = []) {
    const values = new Map();
    const data = (typeof dataParam === 'string') ? [dataParam] : dataParam;
    for (const [key, value] of this.state.dataSource) {
      if (data.indexOf(key) !== -1) values.set(key, value);
    }
    this.setState({values, query: this.props.multiple ? '' : values.get(data[0])});
  }
}

export default Autocomplete;
