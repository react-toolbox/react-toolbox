/* global React */

import css from './style';

export default React.createClass({

  displayName: 'Aside',

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

  onClick (event) {
    if (event.target === this.getDOMNode()) {
      this.setState({active: false});
    }
  },

  render () {
    let className = `${css.root} ${this.props.className}`;
    if (this.props.type) className += ` ${this.props.type}`;
    if (this.props.hideable) className += ' hideable';
    if (this.state.active) className += ' active';

    return (
      <div className={className} onClick={this.onClick}>
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
