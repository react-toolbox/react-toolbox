/* global React */

import style from './style';
import Navigation from '../navigation';

export default React.createClass({
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
      className: 'normal'
    };
  },

  getInitialState () {
    return { active: this.props.active };
  },

  render () {
    let rootClass = style.root;
    let containerClass = `${style.container} ${this.props.className}`;
    if (this.state.active) rootClass += ' active';
    if (this.props.type) containerClass += ` ${this.props.type}`;

    return (
      <div data-react-toolbox='dialog' data-flex='vertical center' className={rootClass}>
        <div className={containerClass}>
          { this.props.title ? <h1>{this.props.title}</h1> : null }
          { this.props.children }
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
