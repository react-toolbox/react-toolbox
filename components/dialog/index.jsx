/* global React */

import { addons } from 'react/addons';
import Navigation from '../navigation';
import style from './style.scss';

export default React.createClass({
  mixins: [addons.PureRenderMixin],

  displayName: 'Dialog',

  propTypes: {
    actions: React.PropTypes.array,
    active: React.PropTypes.bool,
    className: React.PropTypes.string,
    title: React.PropTypes.string,
    type: React.PropTypes.string
  },

  getDefaultProps () {
    return {
      actions: [],
      type: 'normal'
    };
  },

  getInitialState () {
    return { active: this.props.active };
  },

  render () {
    let className = `${style.root} ${style[this.props.type]}`;
    if (this.state.active) className += ` ${style.active}`;
    if (this.props.className) className += ` ${this.props.className}`;

    return (
      <div data-react-toolbox='dialog' className={className}>
        <div className={style.overlay} />
        <div className={style.content}>
          { this.props.title ? <h6>{this.props.title}</h6> : null }
          <section>
            { this.props.children }
          </section>
          { this.props.actions.length > 0 ? <Navigation actions={this.props.actions}/> : null }
        </div>
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
