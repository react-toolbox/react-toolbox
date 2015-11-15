import React from 'react';
import ReactDOM from 'react-dom';
import MenuItem from './menu_item';
import utils from '../utils';
import style from './style.menu';

const POSITION = {
  AUTO: 'auto',
  STATIC: 'static',
  TOP_LEFT: 'top-left',
  TOP_RIGHT: 'top-right',
  BOTTOM_LEFT: 'bottom-left',
  BOTTOM_RIGHT: 'bottom-right'
};

class Menu extends React.Component {
  static propTypes = {
    active: React.PropTypes.bool,
    className: React.PropTypes.string,
    onHide: React.PropTypes.func,
    onSelect: React.PropTypes.func,
    onShow: React.PropTypes.func,
    outline: React.PropTypes.bool,
    position: React.PropTypes.string,
    ripple: React.PropTypes.bool,
    selectable: React.PropTypes.bool,
    selected: React.PropTypes.any
  };

  static defaultProps = {
    active: false,
    outline: true,
    position: POSITION.STATIC,
    ripple: true,
    selectable: true
  };

  state = {
    active: this.props.active,
    rippled: false
  };

  componentDidMount () {
    const { width, height } = this.refs.menu.getBoundingClientRect();
    const position = this.props.position === POSITION.AUTO ? this.calculatePosition() : this.props.position;
    this.setState({ position, width, height });
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState.active && !this.state.active) {
      if (this.props.onHide) this.props.onHide();
      utils.events.removeEventsFromDocument({click: this.handleDocumentClick});
    } else if (!prevState.active && this.state.active && this.props.onShow) {
      this.props.onShow();
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.position !== nextProps.position) {
      const position = nextProps.position === POSITION.AUTO ? this.calculatePosition() : nextProps.position;
      this.setState({ position });
    }
  }

  componentWillUpdate (prevState, nextState) {
    if (!prevState.active && nextState.active) {
      utils.events.addEventsToDocument({click: this.handleDocumentClick});
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (!this.state.active && nextState.active && this.props.position === POSITION.AUTO) {
      const position = this.calculatePosition();
      if (this.state.position !== position) {
        this.setState({ position, active: false }, () => {
          setTimeout(() => {this.setState({active: true}); }, 20);
        });
        return false;
      }
    }
    return true;
  }

  handleDocumentClick = (event) => {
    if (this.state.active && !utils.events.targetIsDescendant(event, ReactDOM.findDOMNode(this))) {
      this.setState({active: false, rippled: false});
    }
  };

  handleSelect = (item) => {
    const { value, onClick } = item.props;
    this.setState({ active: false, rippled: this.props.ripple }, () => {
      if (onClick) onClick();
      if (this.props.onSelect) this.props.onSelect(value);
    });
  };

  calculatePosition () {
    const {top, left, height, width} = ReactDOM.findDOMNode(this).parentNode.getBoundingClientRect();
    const {height: wh, width: ww} = utils.getViewport();
    const toTop = top < ((wh / 2) - height / 2);
    const toLeft = left < ((ww / 2) - width / 2);
    return `${toTop ? 'top' : 'bottom'}-${toLeft ? 'left' : 'right'}`;
  }

  getMenuStyle () {
    const { width, height, position } = this.state;
    if (position !== POSITION.STATIC) {
      if (this.state.active) {
        return { clip: `rect(0 ${width}px ${height}px 0)` };
      } else if (position === POSITION.TOP_RIGHT) {
        return { clip: `rect(0 ${width}px 0 ${width}px)` };
      } else if (position === POSITION.BOTTOM_RIGHT) {
        return { clip: `rect(${height}px ${width}px ${height}px ${width}px)` };
      } else if (position === POSITION.BOTTOM_LEFT) {
        return { clip: `rect(${height}px 0 ${height}px 0)` };
      } else if (position === POSITION.TOP_LEFT) {
        return { clip: `rect(0 0 0 0)` };
      }
    }
  }

  getRootStyle () {
    if (this.state.position !== POSITION.STATIC) {
      return { width: this.state.width, height: this.state.height };
    }
  }

  renderItems () {
    return React.Children.map(this.props.children, (item) => {
      if (item.type === MenuItem) {
        return React.cloneElement(item, {
          ripple: item.props.ripple || this.props.ripple,
          selected: item.props.value && this.props.selectable && item.props.value === this.props.selected,
          onClick: this.handleSelect.bind(this, item)
        });
      } else {
        return React.cloneElement(item);
      }
    });
  }

  render () {
    const outlineStyle = { width: this.state.width, height: this.state.height };
    let className = `${style.root} ${style[this.state.position]}`;
    if (this.state.active) className += ` ${style.active}`;
    if (this.state.rippled) className += ` ${style.rippled}`;
    if (this.props.className) className += ` ${this.props.className}`;

    return (
      <div className={className} style={this.getRootStyle()}>
        { this.props.outline ? <div className={style.outline} style={outlineStyle}></div> : null }
        <ul ref='menu' className={style.menu} style={this.getMenuStyle()}>
          { this.renderItems() }
        </ul>
      </div>
    );
  }

  show () {
    this.setState({active: true});
  }

  hide () {
    this.setState({active: false});
  }
}

export default Menu;
