/* global React */

import css from './style';
import utils from '../utils';
import Input from '../input';

export default React.createClass({
  displayName: 'Autocomplete',

  propTypes: {
    className: React.PropTypes.string,
    colors: React.PropTypes.object,
    dataSource: React.PropTypes.any,
    disabled: React.PropTypes.bool,
    error: React.PropTypes.string,
    exact: React.PropTypes.bool,
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
      colors: {},
      dataSource: {},
      exact: true,
      multiple: true,
      type: 'text'
    };
  },

  getInitialState () {
    return {
      focus: false,
      dataSource: utils.index(this.props.dataSource),
      suggestions: {},
      values: {}
    };
  },

  componentDidMount () {
    if (this.props.value) {
      this.setValue(this.props.value);
    }
  },

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataSource) {
      this.setState({dataSource: utils.index(nextProps.dataSource)});
    }
  },

  onFocus () {
    this.refs.suggestions.getDOMNode().scrollTop = 0;
    this.setState({
      focus: true,
      suggestions: this._getSuggestions()
    });
  },

  onChange () {
    let value = this.refs.input.getValue().toLowerCase().trim();
    if (value.length > 0) {
      let suggestions = this._getSuggestions(value);
      let focus = Object.keys(suggestions).length > 0;
      this.setState({focus: focus, suggestions: suggestions});
    }
  },

  onKeyPress (event) {
    let keyAscii = event.which;
    let query = this.refs.input.getValue().trim();
    let index;
    const children = this.refs.suggestions.getDOMNode().children;

    if (this.state.focus) {
      for (index = 0; index < children.length; ++index) {
        let child = children[index];
        if (child.classList.contains('active')) {
          child.classList.remove('active');
          query = child.getAttribute('id');
          break;
        }
      }
    }

    if (keyAscii === 13 && query !== '') {
      let suggestion;

      for (let key of Object.keys(this.state.suggestions)) {
        let label = this.state.suggestions[key];
        if (query.toLowerCase() === label.toLowerCase()) {
          suggestion = {};
          suggestion[`${key}`] = label;
          break;
        }
      }

      if (!this.exact) {
        let temp = {};
        temp[`${query}`] = query;
        this._addValue(suggestion || temp);
      } else if (suggestion) {
        this._addValue(suggestion);
      }

    } else if (this.state.focus && [40, 38].indexOf(keyAscii) !== -1) {
      if (keyAscii === 40) {
        index = index >= children.length - 1 ? 0 : index + 1;
      } else {
        index = index === 0 ? children.length - 1 : index - 1;
      }
      children[index].classList.add('active');
    }
  },

  onBlur () {
    setTimeout(() => {
      this.setState({focus: false, suggestions: {}});
    }, 300);
  },

  onSelect (event) {
    let temp = {};
    let key = event.target.getAttribute('id');
    temp[`${key}`] = this.state.suggestions[key];
    this._addValue(temp);
  },

  onRefreshSelection () {
    for (let child of this.refs.suggestions.getDOMNode().children) {
      if (child.classList.contains('active')) {
        child.classList.remove('active');
      }
      break;
    }
  },

  onDelete (event) {
    delete this.state.values[event.target.getAttribute('id')];
    this.setState({focus: false, values: this.state.values});
    if (this.props.onChange) this.props.onChange(this);
  },

  renderLabel () {
    if (this.props.label) {
      return (<label>{this.props.label}</label>);
    }
  },

  renderMultiple () {
    if (this.props.multiple) {
      return (
        <ul className={css.values} data-flex='horizontal wrap' onClick={this.onDelete}>
          { Object.keys(this.state.values).map(key => {
              return (
                <li
                  key={key}
                  id={this.state.values[key]}
                  style={{backgroundColor: this.props.colors[key]}}>
                    {this.state.values[key]}
                </li>
              );
            })
          }
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
        {this.renderLabel()}
        {this.renderMultiple()}
        <Input {...this.props} ref='input' value='' label=''
               onBlur={this.onBlur}
               onChange={this.onChange}
               onFocus={this.onFocus}
               onKeyDown={this.onKeyPress}
               />
        <ul
          ref='suggestions'
          className={css.suggestions}
          onClick={this.onSelect}
          onMouseEnter={this.onRefreshSelection}>
          {
            Object.keys(this.state.suggestions).map((key) => {
              return (
                <li key={key} id={key}>
                  {this.state.suggestions[key]}
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  },

  getValue () {
    let values = Object.keys(this.state.values);
    if (this.props.multiple) {
      return values;
    } else {
      return values.length > 0 ? values[0] : null;
    }
  },

  setValue (dataParam = []) {
    let data = dataParam;
    let values = {};
    if (typeof dataParam === 'string') data = [dataParam];

    if (this.state.dataSource) {
      for (let key in this.state.dataSource) {
        if (data.indexOf(key) !== -1) {
          values[key] = this.state.dataSource[key];
        }
      }
    }

    this.setState({values: values});
    if (!this.props.multiple && Object.keys(values).length > 0) {
      this.refs.input.setValue(values[Object.keys(values)[0]]);
    }
  },

  setError (data) {
    this.input.setError(data);
  },

  _addValue (value) {
    let key = Object.keys(value)[0];
    let values;

    if (this.props.multiple) {
      values = this.state.values;
      values[key] = value[key];
      if (this.props.onChange) this.props.onChange(this);
    } else {
      values = value;
      setTimeout(() => {
        if (this.props.onChange) this.props.onChange(this);
      }, 10);
    }

    this.setState({focus: false, values: values});
    this.refs.input.setValue(this.props.multiple ? '' : value[key]);
  },

  _getSuggestions (query) {
    let suggestions = {};

    for (let key of Object.keys(this.state.dataSource)) {
      let label = this.state.dataSource[key];
      if (!this.state.values[key]) {
        if (!query || label.toLowerCase().trim().indexOf(query) === 0) {
          suggestions[key] = label;
        }
      }
    }

    return suggestions;
  }
});
