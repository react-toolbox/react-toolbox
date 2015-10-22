import React from 'react';
import style from './style';
import Autocomplete from '../autocomplete';
import Button from '../button';
import Checkbox from '../checkbox';
import DatePicker from '../date_picker';
import Dropdown from '../dropdown';
import Input from '../input';
import RadioGroup from '../radio_group';
import Slider from '../slider';
import Switch from '../switch';
import TimePicker from '../time_picker';

class Form extends React.Component {
  static propTypes = {
    attributes: React.PropTypes.array,
    className: React.PropTypes.string,
    onChange: React.PropTypes.func,
    onError: React.PropTypes.func,
    onSubmit: React.PropTypes.func,
    onValid: React.PropTypes.func,
    storage: React.PropTypes.string
  };

  static defaultProps = {
    attributes: [],
    className: ''
  };

  state = {
    attributes: this.storage(this.props)
  };

  componentWillReceiveProps (next_props) {
    if (next_props.attributes) {
      let attributes = this.storage(next_props);
      this.setState({attributes: attributes});
      this.setValue(attributes.map((item) => { return item; }));
    }
  }

  onSubmit = (event) => {
    event.preventDefault();
    if (this.props.onSubmit) {
      this.props.onSubmit(event, this);
    }
  };

  onChange = (event) => {
    let is_valid = true;
    let value = this.getValue();
    for (let attr of this.state.attributes) {
      if (attr.required && value[attr.ref] !== undefined && value[attr.ref].trim() === '') {
        is_valid = false;
        console.log('NOT VALUD');
        if (this.refs[attr.ref].setError) this.refs[attr.ref].setError('Requited field');
        break;
      }
    }

    if (this.props.onChange) this.props.onChange(event, this);
    if (this.props.storage) this.storage(this.props, value);

    if (is_valid) {
      if (this.refs.submit) this.refs.submit.getDOMNode().removeAttribute('disabled');
      if (this.props.onValid) this.props.onValid(event, this);
    } else {
      if (this.refs.submit) this.refs.submit.getDOMNode().setAttribute('disabled', true);
      if (this.props.onError) this.props.onError(event, this);
    }
  };

  render () {
    let className = `${style.root} ${this.props.className}`;
    const attributes = this.state.attributes.map((attribute, index) => {
      if (attribute.type === 'autocomplete') {
        return <Autocomplete key={index} {...attribute} onChange={this.onChange}/>;
      } else if (attribute.type === 'submit') {
        return <Button key={index} {...attribute} type='square' ref='submit' onClick={this.onSubmit}/>;
      } else if (attribute.type === 'checkbox') {
        return <Checkbox key={index} {...attribute} onChange={this.onChange}/>;
      } else if (attribute.type === 'date_picker') {
        return <DatePicker key={index} {...attribute} onChange={this.onChange}/>;
      } else if (attribute.type === 'dropdown') {
        return <Dropdown key={index} {...attribute} onChange={this.onChange}/>;
      } else if (attribute.type === 'radio_group') {
        return <RadioGroup key={index} {...attribute} onChange={this.onChange}/>;
      } else if (attribute.type === 'slider') {
        return <Slider key={index} {...attribute} onChange={this.onChange}/>;
      } else if (attribute.type === 'switch') {
        return <Switch key={index} {...attribute} onChange={this.onChange}/>;
      } else if (attribute.type === 'time_picker') {
        return <TimePicker key={index} {...attribute} onChange={this.onChange}/>;
      } else {
        return <Input key={index} {...attribute} />;
      }
    });

    return (
      <form
        data-react-toolbox='form'
        className={className}
        onChange={this.onChange}
        onSubmit={this.onSubmit}
      >
        { attributes }
        { this.props.children }
      </form>
    );
  }

  storage (props, value) {
    let key = `react-toolbox-form-${props.storage}`;
    if (value) {
      let store = {};
      for (let attr of props.attributes) {
        if (attr.storage) store[attr.ref] = value[attr.ref];
      }
      window.localStorage.setItem(key, JSON.stringify(store));
    } else if (props.storage) {
      let store = JSON.parse(window.localStorage.getItem(key) || {});
      for (let input of props.attributes) {
        if (store && store[input.ref]) {
          input.value = store[input.ref];
        }
      }
    }

    return props.attributes;
  }

  getValue () {
    let value = {};
    for (let ref of Object.keys(this.refs)) {
      let el = this.refs[ref];
      if (el.getValue) {
        if (ref.indexOf('.') === -1) {
          value[ref] = el.getValue();
        } else {
          let parent = value;
          let hierarchy = ref.split('.');
          hierarchy.forEach((attr, index) => {
            if (index === hierarchy.length - 1) {
              parent[attr] = el.getValue();
            } else {
              parent[attr] = parent[attr] || {};
              parent = parent[attr];
            }
          });
        }
      }
    }

    return value;
  }

  setValue (data = {}) {
    for (let field of data) {
      if (this.refs[field.ref].setValue) {
        this.refs[field.ref].setValue(field.value);
      }
    }
  }
}

export default Form;
