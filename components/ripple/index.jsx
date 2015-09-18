/* global React */

import { addons } from 'react/addons';
import style from './style';

export default React.createClass({
  mixins: [addons.PureRenderMixin],

  displayName: 'Ripple',

  propTypes: {
    auto: React.PropTypes.bool,
    className: React.PropTypes.string,
    loading: React.PropTypes.bool
  },

  getDefaultProps () {
    return {
      auto: true,
      className: '',
      loading: false
    };
  },

  getInitialState () {
    return {
      active: false,
      restarting: false,
      top: null,
      left: null,
      width: null
    };
  },

  start ({ pageX, pageY }) {
    const {top, left, width} = this._getDescriptor(pageX, pageY);
    this.setState({active: false, restarting: true, width: 0}, () => {
      this.refs.ripple.getDOMNode().offsetWidth; //eslint-disable-line no-unused-expressions
      this.setState({active: true, restarting: false, top: top, left: left, width: width});
    });
  },

  end () {
    this.setState({active: false});
  },

  _getDescriptor (pageX, pageY) {
    let { left, top, width } = this.getDOMNode().getBoundingClientRect();
    return {
      left: pageX - left,
      top: pageY - top,
      width: width * 2.5
    };
  },

  render () {
    let { left, top, width } = this.state;
    let className = `${style.ripple} ${this.props.className}`;
    if (this.state.active) className += ' active';
    if (this.state.restarting) className += ' restarting';
    if (this.props.loading) className += ' loading';

    return (
      <span
        className={style.root}
        onMouseDown={this.props.auto ? this.start : null}
        onMouseUp={this.end}>

        <span
          ref="ripple"
          className={className}
          style={{left: left, top: top, width: width, height: width}}>
        </span>
      </span>
    );
  }
});
