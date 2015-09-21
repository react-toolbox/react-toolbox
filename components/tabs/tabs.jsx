/* global React */

import { addons } from 'react/addons';
import style from './style';

function _pointerPosition (index = 0, navigation) {
  const label = navigation.children[index].getBoundingClientRect();
  return {
    top: `${navigation.getBoundingClientRect().height}px`,
    left: `${label.left}px`,
    width: `${label.width}px`
  };
}

export default React.createClass({
  mixins: [addons.PureRenderMixin],

  displayName: 'Tabs',

  propTypes: {
    className: React.PropTypes.string,
    index: React.PropTypes.number.isRequired,
    onChange: React.PropTypes.func
  },

  getDefaultProps () {
    return {
      className: '',
      index: 0
    };
  },

  getInitialState () {
    return {
      index: this.props.index,
      pointer: {}
    };
  },

  componentDidMount () {
    this.setState({
      pointer: _pointerPosition(this.state.index, this.refs.navigation.getDOMNode())
    });
  },

  componentWillReceiveProps (next_props) {
    const index = next_props.index || this.state.index;
    this.setState({
      index: index,
      pointer: _pointerPosition(index, this.refs.navigation.getDOMNode())
    });
  },

  onClick (index) {
    this.setState({
      index: index,
      pointer: _pointerPosition(index, this.refs.navigation.getDOMNode())
    });
    if (this.props.onChange) this.props.onChange(this);
  },

  render () {
    let labels = [];
    const tabs = this.props.children.map((tab, index) => {
      let active = this.state.index === index;

      let className = tab.props.className;
      if (active) className += ' active';
      if (tab.props.disabled) className += ' disabled';
      if (tab.props.hidden) className += ' hidden';

      labels.push({
        className: className,
        label: tab.props.label,
        key: index,
        onClick: !tab.props.disabled ? this.onClick.bind(null, index) : null
      });

      return React.cloneElement(tab, {active: active, key: index, tabIndex: index });
    });

    return (
      <div
        data-react-toolbox='tabs'
        className={style.root + ' ' + this.props.className}
        data-flex='vertical'
      >
        <nav ref='navigation' data-flex='horizontal'>
          { labels.map((props) => { return <label {...props}>{props.label}</label>; }) }
        </nav>
        <span className={style.pointer} style={this.state.pointer}></span>
        { tabs }
      </div>
    );
  },

  active (value) {
    this.setState({active: value});
    if (this.props.onActive && value) {
      this.props.onActive(this);
    }
  }
});
