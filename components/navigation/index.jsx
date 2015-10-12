import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import style from './style';
import Button from '../button';
import Link from '../link';

export default React.createClass({
  mixins: [PureRenderMixin],

  displayName: 'Navigation',

  propTypes: {
    actions: React.PropTypes.array,
    className: React.PropTypes.string,
    routes: React.PropTypes.array,
    type: React.PropTypes.string
  },

  getDefaultProps () {
    return {
      actions: [],
      className: '',
      type: 'default',
      routes: []
    };
  },

  render () {
    let className = `${style[this.props.type]}`;
    if (this.props.className) className += ` ${this.props.className}`;

    const buttons = this.props.actions.map((action, index) => {
      return <Button key={index} {...action} />;
    });

    const links = this.props.routes.map((route, index) => {
      return <Link key={index} {...route} />;
    });

    return (
      <nav data-react-toolbox='navigation' className={className}>
        { links }
        { buttons }
        { this.props.children }
      </nav>
    );
  }
});
