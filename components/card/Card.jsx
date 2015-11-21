import React, { PropTypes, Component } from 'react';
import ClassNames from 'classnames';
import style from './style';

class Card extends Component {

  static propTypes = {
    children: PropTypes.any,
    className: PropTypes.string,
    raised: PropTypes.bool
  }

  render () {
    const {
      children,
      className,
      raised,
      ...otherProps
    } = this.props;

    const classes = ClassNames(style.card, {
      [style.raised]: raised
    }, className);

    return (
      <div
        data-react-toolbox="card"
        className={classes}
      >
        {children}
      </div>
    );
  }
}

export default Card;
