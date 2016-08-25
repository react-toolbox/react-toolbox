import React, { PropTypes, Component } from 'react';
import style from './style';

class BottomNavigation extends Component {
  static propTypes = {
    active: PropTypes.number,
    children: PropTypes.node
  };

  static defaultProps = {
    active: 0
  };

  state = {
    active: this.props.active
  };

  componentWillReceiveProps (nextProps) {
    if (this.props.active !== nextProps.active && this.state.active !== nextProps.active) {
      this.setState({ active: nextProps.active });
    }
  }

  render () {
    const { active: defaultActive, children, theme, ...other } = this.props;
    const { active } = this.state;
    const filteredChildren = React.Children.map(children, (child, idx) => (
      React.cloneElement(child, {
        active: active === idx,
        index: idx,
        onClick: (event, index) => {
          this.setState({ active: index });
          if (child.props.onClick) child.props.onClick(event);
        }
      })
    ));

    return (
      <ul {...other} data-react-toolbox='bottom-navigation' className={style.ul}>
        {filteredChildren}
      </ul>
    );
  }
}

export default BottomNavigation;
