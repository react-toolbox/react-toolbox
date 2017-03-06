import React, { Component, PropTypes } from 'react';
import { Animated, Easing } from 'react-native';

class RippleNode extends Component {
  static propTypes = {
    active: PropTypes.bool,
    color: PropTypes.string,
    idx: PropTypes.string,
    onFinish: PropTypes.func,
    spreadSize: PropTypes.number,
    startX: PropTypes.number,
    startY: PropTypes.number,
  };

  static defaultProps = {
    color: '#000',
  };

  state = {
    opacity: new Animated.Value(0.3),
    scale: new Animated.Value(0),
  };

  componentWillMount() {
    Animated.timing(this.state.scale, {
      toValue: 1,
      duration: 800,
      easing: Easing.linear,
    }).start();
  }

  componentWillReceiveProps(nextProps) {
    const { active: nextActive } = nextProps;
    const { active, onFinish, idx } = this.props;

    if (active !== nextActive) {
      Animated.timing(this.state.opacity, {
        toValue: 0,
        duration: 800,
        easing: Easing.linear,
      }).start(() => {
        onFinish(idx);
      });
    }
  }

  getStyle = () => {
    const { color, spreadSize, startX, startY } = this.props;
    const { opacity, scale } = this.state;
    return {
      backgroundColor: color,
      borderRadius: spreadSize / 2,
      height: spreadSize,
      left: startX - (spreadSize / 2),
      opacity,
      position: 'absolute',
      top: startY - (spreadSize / 2),
      transform: [{ scale }],
      width: spreadSize,
      zIndex: 100,
    };
  };

  render() {
    return (
      <Animated.View
        {...this.props}
        pointerEvents="none"
        style={this.getStyle()}
      />
    );
  }
}

export default RippleNode;
