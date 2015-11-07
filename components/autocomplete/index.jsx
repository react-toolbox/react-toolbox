import React from 'react';
import ReactDOM from 'react-dom';
import Input from '../input';
import style from './style';
import utils from '../utils';

class Autocomplete extends React.Component {
  static propTypes = {
    auto: React.PropTypes.bool,
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
      auto: true,
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

  handleBlur = () => {
    if (this.state.focus) this.setState({focus: false});
  };

  handleFocus = () => {
    const client = ReactDOM.findDOMNode(this.refs.input).getBoundingClientRect();
    const screen_height = window.innerHeight || document.documentElement.offsetHeight;
    const up = this.props.auto ? client.top > ((screen_height / 2) + client.height) : false;

    this.refs.suggestions.scrollTop = 0;
    this.setState({active: '', up: up, focus: true});
  };

  handleHover = (event) => {
    this.setState({active: event.target.getAttribute('id')});
  };

  handleQueryChange = () => {
    const query = this.refs.input.getValue();
    if (this.state.query !== query) {
      this.setState({query});
    }
  };

  handleSelect = (event) => {
    utils.events.pauseEvent(event);
    this._selectOption(event.target.getAttribute('id'));
  };

  handleUnselect = (event) => {
    this._unselectOption(event.target.getAttribute('id'));
  };

  renderLabel () {
    if (this.props.label) {
      return <label data-role='label' className={style.label}>{this.props.label}</label>;
    }
  }

  renderSelected () {
    if (this.props.multiple) {
      return (
        <ul className={style.values} data-role='selections' onClick={this.handleUnselect}>
          {[...this.state.values].map(([key, value]) => {
            return <li key={key} id={key} data-role='selection' className={style.value}>{value}</li>;
          })}
        </ul>
      );
    }
  }

  renderSuggestions () {
    return [...this._getSuggestions()].map(([key, value]) => {
      let className = style.suggestion;
      if (this.state.active === key) className += ` ${style.active}`;
      return <li id={key} key={key} data-role='suggestion' className={className}>{value}</li>;
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
        {this.renderLabel()}
        {this.renderSelected()}
        <Input
          data-role='input'
          {...this.props}
          ref='input'
          className={style.input}
          label=''
          onBlur={this.handleBlur}
          onChange={this.handleQueryChange}
          onFocus={this.handleFocus}
          onKeyUp={this.handleKeyPress}
          value=''
        />
        <ul
          ref='suggestions'
          data-role='suggestions'
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

  _indexDataSource (data = {}) {
    if (data.length) {
      return new Map(data.map((item) => [item, item]));
    } else {
      return new Map(Object.keys(data).map((key) => [key, data[key]]));
    }
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
