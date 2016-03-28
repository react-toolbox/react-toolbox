import React from 'react';
import Tab from './Tab';
import TabContent from './TabContent';
import style from './style';

class Tabs extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    disableAnimatedBottomBorder: React.PropTypes.bool,
    index: React.PropTypes.number,
    tab: React.PropTypes.string,
    onChange: React.PropTypes.func
  };

  static defaultProps = {
    index: 0
  };

  state = {
    pointer: {}
  };

  componentDidMount () {
    !this.props.disableAnimatedBottomBorder &&
      this.updatePointer(this.props.index, this.props);
  }

  componentWillReceiveProps (nextProps) {
    !this.props.disableAnimatedBottomBorder &&
      this.updatePointer(nextProps.index, nextProps);
  }

  componentWillUnmount () {
    clearTimeout(this.pointerTimeout);
  }

  handleHeaderClick = (idx) => {
    if (this.props.onChange)
      this.props.onChange(idx, this.props.children[idx].key);
  };

  parseChildren () {
    const headers = [];
    const contents = [];

    React.Children.forEach(this.props.children, (item) => {
      if (item.type === Tab) {
        headers.push(item);
        if (item.props.children) {
          contents.push(<TabContent key={item.key} children={item.props.children}/>);
        }
      } else if (item.type === TabContent) {
        contents.push(item);
      }
    });

    return {headers, contents};
  }

  updatePointer (idx, props) {
    if (props.tab)
      idx = props.children.findIndex(c => c.key === props.tab);

    clearTimeout(this.pointerTimeout);
    this.pointerTimeout = setTimeout(() => {
      const startPoint = this.refs.tabs.getBoundingClientRect().left;
      const label = this.refs.navigation.children[idx].getBoundingClientRect();
      this.setState({
        pointer: {
          top: `${this.refs.navigation.getBoundingClientRect().height}px`,
          left: `${label.left - startPoint}px`,
          width: `${label.width}px`
        }
      });
    }, 20);
  }

  renderHeaders (headers) {
    return headers.map((item, idx) => {
      return React.cloneElement(item, {
        key: item.key || idx,
        active: this.props.tab
          ? this.props.tab === item.key
          : this.props.index === idx,
        onClick: this.handleHeaderClick.bind(this, idx, item)
      });
    });
  }

  renderContents (contents) {
    var idx = contents.findIndex((item, idx) => {
      return this.props.tab
        ? this.props.tab === item.key
        : this.props.index === idx;
    });

    return React.cloneElement(contents[idx], {
      key: contents[idx].key || idx,
      active: true,
      tabIndex: idx
    });
  }

  render () {
    let className = style.root;
    const { headers, contents } = this.parseChildren();
    if (this.props.className) className += ` ${this.props.className}`;

    return (
      <div ref='tabs' data-react-toolbox='tabs' className={className}>
        <nav className={style.navigation} ref='navigation'>
          {this.renderHeaders(headers)}
        </nav>
        <span className={style.pointer} style={this.state.pointer} />
        {this.renderContents(contents)}
      </div>
    );
  }
}

export default Tabs;
