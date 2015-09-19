/* global React */

import { addons } from 'react/addons';
import style from './style';
import Button from '../button';
import Link from '../link';

export default React.createClass({
  mixins: [addons.PureRenderMixin],

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
    let className = `${style.root} ${this.props.className}`;
    if (this.props.type) className += ` ${this.props.type}`;

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
