/* global React */

import { addons } from 'react/addons';
import Button from '../button';
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

  renderActions () {
    return this.props.actions.map((action, idx) => {
      let className = style.button;
      if (action.className) className += ` ${action.className}`;
      return <Button key={idx} {...action} className={className} />;
    });
  },

  render () {
    let className = `${style.root} ${style[this.props.type]}`;
    if (this.state.active) className += ` ${style.active}`;
    if (this.props.className) className += ` ${this.props.className}`;

    return (
      <div data-react-toolbox='dialog' className={className}>
        <div className={style.overlay} />
        <div className={style.content}>
          <section className={style.body}>
            { this.props.title ? <h6 className={style.title}>{this.props.title}</h6> : null }
            { this.props.children }
          </section>
          <nav className={style.navigation}>
            { this.renderActions() }
          </nav>
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
