import React, { PropTypes, Component } from 'react';
import ClassNames from 'classnames';
import style from './style';

class CardText extends Component {
  static propTypes = {
    children: PropTypes.any,
    className: PropTypes.string
  };

  render () {
    const { children, className, ...other } = this.props;
    const classes = ClassNames(style.cardText, className);

    return (
      <div className={classes} {...other}>
        {typeof children === 'string' ? <p>{children}</p> : children}
      </div>
    );
  }
}

export default CardText;
