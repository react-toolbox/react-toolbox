/* global React */

import { addons } from 'react/addons';
import css from './style';

export default React.createClass({
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
    let className = `${css.root} ${this.props.className}`;
    if (this.props.type) className += ` ${this.props.type}`;
    if (this.props.hideable) className += ' hideable';
    if (this.state.active) className += ' active';

    return (
      <div className={className}>
        <div className={css.overlay} onClick={this.handleOverlayClick}></div>
        <aside className={css.container}>
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
