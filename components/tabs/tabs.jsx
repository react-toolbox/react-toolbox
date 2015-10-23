import React from 'react';
import style from './style';

class Tabs extends React.Component {
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
    setTimeout(() => {
      this.setState({pointer: this._pointerPosition(this.state.index)});
    }, 20);
  }

  componentWillReceiveProps (next_props) {
    const index = next_props.index || this.state.index;
    this.setState({
      index,
      pointer: this._pointerPosition(index)
    });
  }

  _pointerPosition (index = 0) {
    const startPoint = this.refs.tabs.getBoundingClientRect().left;
    const label = this.refs.navigation.children[index].getBoundingClientRect();

    return {
      top: `${this.refs.navigation.getBoundingClientRect().height}px`,
      left: `${label.left - startPoint}px`,
      width: `${label.width}px`
    };
  }

  handleClick = (index) => {
    this.setState({
      index,
      pointer: this._pointerPosition(index)
    });
    if (this.props.onChange) this.props.onChange(this);
  };

  renderLabels (labels) {
    return labels.map((props) => {
      return <label {...props}>{ props.label }</label>;
    });
  }

  render () {
    const labels = [];

    const tabs = this.props.children.map((tab, index) => {
      const active = this.state.index === index;
      let className = `${style.label} ${tab.props.className}`;

      if (active) className += ` ${style.active}`;
      if (tab.props.disabled) className += ` ${style.disabled}`;
      if (tab.props.hidden) className += ` ${style.hidden}`;

      labels.push({
        className,
        label: tab.props.label,
        key: index,
        onClick: !tab.props.disabled ? this.handleClick.bind(this, index) : null
      });

      return React.cloneElement(tab, { active, key: index, tabIndex: index });
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
}

export default Tabs;
