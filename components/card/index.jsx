import React from 'react';
import Navigation from '../navigation';
import Ripple from '../ripple';
import style from './style';

class Card extends React.Component {
  static propTypes = {
    actions: React.PropTypes.array,
    className: React.PropTypes.string,
    color: React.PropTypes.string,
    image: React.PropTypes.string,
    loading: React.PropTypes.bool,
    onClick: React.PropTypes.func,
    text: React.PropTypes.string,
    title: React.PropTypes.string,
    type: React.PropTypes.oneOf(['wide', 'event', 'image'])
  };

  static defaultProps = {
    className: '',
    loading: false
  };

  handleMouseDown = (event) => {
    if (this.props.onClick) {
      event.preventDefault();
      this.refs.ripple.start(event);
      this.props.onClick(event, this);
    }
  };

  renderTitle () {
    const styleFigure = {};
    const styleOverflow = {};
    if (this.props.image) styleFigure.backgroundImage = `url(${this.props.image})`;
    if (this.props.color) {
      styleFigure.backgroundColor = this.props.color;
      styleOverflow.backgroundColor = this.props.color;
    }

    if (this.props.title || this.props.image) {
      return (
        <figure className={style.figure} style={styleFigure}>
          { this.props.title ? <h5 data-role='title'>{this.props.title}</h5> : null }
          { this.props.subtitle ? <small data-role='subtitle'>{this.props.subtitle}</small> : null }
          { this.props.color ? <div className={style.overflow} style={styleOverflow}></div> : null }
        </figure>
      );
    }
  }

  renderActions () {
    if (this.props.actions) {
      return (
        <Navigation data-role='actions' className={style.navigation} actions={this.props.actions} />
      );
    }
  }

  render () {
    let className = style.root;
    if (this.props.type) className += ` ${style[this.props.type]}`;
    if (this.props.onClick) className += ` ${style.touch}`;
    if (this.props.image || this.props.color) className += ` ${style.contrast}`;
    if (this.props.color) className += ` ${style.color}`;
    if (this.props.loading) className += ` ${style.loading}`;
    if (this.props.className) className += ` ${this.props.className}`;

    return (
      <div
        data-react-toolbox='card'
        className={className}
        onMouseDown={this.handleMouseDown}
      >
        { this.renderTitle() }
        { this.props.text ? <p data-role='text' className={style.text}>{this.props.text}</p> : null }
        { this.renderActions() }
        <Ripple
          ref='ripple'
          className={style.ripple}
          loading={this.props.loading}
          spread={2.5}
        />
      </div>
    );
  }
}

export default Card;
