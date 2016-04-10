import React, { PropTypes, Component } from 'react';
import ClassNames from 'classnames';
import style from './style';

class CardActions extends Component {
  static propTypes = {
    children: PropTypes.any,
    className: PropTypes.string
  };

  render () {
    const { children, className, ...other } = this.props;
    const classes = ClassNames(style.cardActions, className);

    return (
      <div className={classes} {...other}>
        {children}
      </div>
    );
  }
}

export default CardActions;
