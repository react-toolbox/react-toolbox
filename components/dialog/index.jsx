import React from 'react';
import Button from '../button';
import style from './style';

export default class Dialog extends React.Component {
  static propTypes = {
    actions: React.PropTypes.array,
    active: React.PropTypes.bool,
    className: React.PropTypes.string,
    title: React.PropTypes.string,
    type: React.PropTypes.string
  };

  static defaultProps = {
    actions: [],
    type: 'normal'
  };

  state = {
    active: this.props.active
  };

  renderActions () {
    return this.props.actions.map((action, idx) => {
      let className = style.button;
      if (action.className) className += ` ${action.className}`;
      return <Button key={idx} {...action} className={className} />;
    });
  }

  render () {
    let className = `${style.root} ${style[this.props.type]}`;
    if (this.state.active) className += ` ${style.active}`;
    if (this.props.className) className += ` ${this.props.className}`;

    return (
      <div data-react-toolbox='dialog' className={className}>
        <div role='overlay' className={style.overlay} />
        <div role='content' className={style.content}>
          <section role='body' className={style.body}>
            { this.props.title ? <h6 className={style.title}>{this.props.title}</h6> : null }
            { this.props.children }
          </section>
          <nav role='navigation' className={style.navigation}>
            { this.renderActions() }
          </nav>
        </div>
      </div>
    );
  }

  show () {
    this.setState({active: true});
  }

  hide () {
    this.setState({active: false});
  }
};
