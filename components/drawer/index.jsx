/* global React */

import { addons } from 'react/addons';
import CSSModules from 'react-css-modules';
import style from './style.scss';

const Drawer = React.createClass({
  mixins: [addons.PureRenderMixin],

  displayName: 'Drawer',

  propTypes: {
    active: React.PropTypes.bool,
    className: React.PropTypes.string,
    hideable: React.PropTypes.bool,
    type: React.PropTypes.string
  },

  getDefaultProps () {
    return {
      className: '',
      type: 'left'
    };
  },

  getInitialState () {
    return { active: this.props.active };
  },

  handleOverlayClick () {
    if (this.props.hideable) {
      this.setState({active: false});
    }
  },

  render () {
    let styleName = 'drawer';
    if (this.state.active) styleName += '-active';

    return (
      <div styleName={`${styleName} ${this.props.type}`} className={this.props.className}>
        <div styleName='overlay' onClick={this.handleOverlayClick}></div>
        <aside styleName='content'>
          { this.props.children }
        </aside>
      </div>
    );
  },

  show () {
    this.setState({active: true});
  },

  hide () {
    this.setState({active: false});
  }
});

export default CSSModules(Drawer, style, { allowMultiple: true });
