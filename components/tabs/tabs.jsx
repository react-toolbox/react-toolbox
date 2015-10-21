import React from 'react';
import style from './style';

export default class Tabs extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    index: React.PropTypes.number.isRequired,
    onChange: React.PropTypes.func
  };

  static defaultProps = {
    className: '',
    index: 0
  };

  state = {
    index: this.props.index,
    pointer: {}
  };

  componentDidMount () {
    this.setState({
      pointer: this._pointerPosition(this.state.index, this.refs.navigation)
    });
  }

  componentWillReceiveProps (next_props) {
    const index = next_props.index || this.state.index;
    this.setState({
      index: index,
      pointer: this._pointerPosition(index, this.refs.navigation)
    });
  }

  _pointerPosition (index = 0, navigation) {
    const startPoint = this.refs.tabs.getBoundingClientRect().left;
    const label = navigation.children[index].getBoundingClientRect();

    return {
      top: `${navigation.getBoundingClientRect().height}px`,
      left: `${label.left - startPoint}px`,
      width: `${label.width}px`
    };
  }

  onClick (index) {
    this.setState({
      index: index,
      pointer: this._pointerPosition(index, this.refs.navigation)
    });
    if (this.props.onChange) this.props.onChange(this);
  }

  renderLabels (labels) {
    return labels.map((props) => {
      return <label {...props}>{ props.label }</label>;
    });
  }

  render () {
    let labels = [];

    const tabs = this.props.children.map((tab, index) => {
      let active = this.state.index === index;
      let className = `${style.label} ${tab.props.className}`;

      if (active) className += ` ${style.active}`;
      if (tab.props.disabled) className += ` ${style.disabled}`;
      if (tab.props.hidden) className += ` ${style.hidden}`;

      labels.push({
        className: className,
        label: tab.props.label,
        key: index,
        onClick: !tab.props.disabled ? ::this.onClick(index) : null
      });

      return React.cloneElement(tab, {active: active, key: index, tabIndex: index });
    });

    let className = style.root;
    if (this.props.className) className += ` ${this.props.className}`;

    return (
      <div data-react-toolbox='tabs' ref='tabs' className={className}>
        <nav className={style.navigation} ref='navigation'>
          { this.renderLabels(labels) }
        </nav>
        <span className={style.pointer} style={this.state.pointer} />
        { tabs }
      </div>
    );
  }

  active (value) {
    this.setState({active: value});
    if (this.props.onActive && value) {
      this.props.onActive(this);
    }
  }
};
