/* global React */

import { addons } from 'react/addons';
import CSSModules from 'react-css-modules';
import style from './style.scss';

const Ripple = React.createClass({
  mixins: [addons.PureRenderMixin],

  displayName: 'Ripple',

  propTypes: {
    className: React.PropTypes.string,
    loading: React.PropTypes.bool
  },

  getDefaultProps () {
    return {
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
    document.addEventListener('mouseup', this.end);
    const {top, left, width} = this._getDescriptor(pageX, pageY);
    this.setState({active: false, restarting: true, width: 0}, () => {
      this.refs.ripple.getDOMNode().offsetWidth; //eslint-disable-line no-unused-expressions
      this.setState({active: true, restarting: false, top: top, left: left, width: width});
    });
  },

  end () {
    document.removeEventListener('mouseup', this.end);
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
    let className = this.props.className;
    let styleName = this.props.loading ? 'loading' : 'normal';
    if (this.state.active) className += ` ${style.active}`;
    if (this.state.restarting) className += ` ${style.restarting}`;

    return (
      <span styleName='wrapper'>
        <span
          ref="ripple"
          data-toolbox='ripple'
          className={className}
          styleName={styleName}
          style={{left: left, top: top, width: width, height: width}}>
        </span>
      </span>
    );
  }
});

export default CSSModules(Ripple, style);
