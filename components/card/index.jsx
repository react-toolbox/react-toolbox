import React from 'react';
import autobind from 'autobind-decorator'
import Navigation from '../navigation';
import Ripple from '../ripple';
import style from './style.scss';

@autobind
export default class Card extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    color: React.PropTypes.string,
    image: React.PropTypes.string,
    text: React.PropTypes.string,
    loading: React.PropTypes.bool,
    onClick: React.PropTypes.func,
    title: React.PropTypes.string,
    type: React.PropTypes.string
  };

  static defaultProps = {
    className: '',
    loading: false,
    type: 'default'
  };

  state = {
    loading: this.props.loading
  };

  handleMouseDown (event) {
    if (this.props.onClick) {
      event.preventDefault();
      this.refs.ripple.start(event);
      this.props.onClick(event, this);
    }
  }

  renderTitle () {
    let styleFigure = {}, styleOverflow = {};
    if (this.props.image) styleFigure.backgroundImage = `url(${this.props.image})`;
    if (this.props.color) {
      styleFigure.backgroundColor = this.props.color;
      styleOverflow.backgroundColor = this.props.color;
    }

    if (this.props.title || this.props.image) {
      return (
        <figure className={style.figure} style={styleFigure}>
          { this.props.subtitle ? <small>{this.props.subtitle}</small> : null }
          { this.props.title ? <h5>{this.props.title}</h5> : null }
          { this.props.color ? <div className={style.overflow} style={styleOverflow}></div> : null }
        </figure>
      );
    }
  }

  renderActions () {
    if (this.props.actions) {
      return (
        <Navigation className={style.navigation} actions={this.props.actions} />
      );
    }
  }

  render () {
    let className = style.root;
    if (this.props.type) className += ` ${style[this.props.type]}`;
    if (this.props.onClick) className += ` ${style.touch}`;
    if (this.props.image || this.props.color) className += ` ${style.contrast}`;
    if (this.props.color) className += ` ${style.color}`;
    if (this.state.loading) className += ` ${style.loading}`;
    if (this.props.className) className += ` ${this.props.className}`;

    return (
      <div
        data-react-toolbox='card'
        className={className}
        onMouseDown={this.handleMouseDown}
      >
        { this.renderTitle() }
        { this.props.text ? <p className={style.text}>{this.props.text}</p> : null }
        { this.renderActions() }
        <Ripple
          ref='ripple'
          className={style.ripple}
          loading={this.state.loading}
          spread={2.5}
        />
      </div>
    );
  }

  loading (value) {
    this.setState({loading: value});
  }
};
