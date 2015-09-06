const React = window.React;

const css = require('./style');

module.exports = React.createClass({
  displayName: 'Face',

  getDefaultProps () {
    return {
      active: null,
      numbers: [],
      radius: 0
    };
  },

  _numberStyle (radius, num) {
    return {
      position: 'absolute',
      left: (radius + radius * Math.sin(360 * (Math.PI / 180) / 12 * (num - 1)) + this.props.spacing),
      top: (radius - radius * Math.cos(360 * (Math.PI / 180) / 12 * (num - 1)) + this.props.spacing)
    };
  },

  _faceStyle () {
    return {
      height: this.props.radius * 2,
      width: this.props.radius * 2
    };
  },

  render () {
    return (
      <div ref="root"
           className={css.face}
           onTouchStart={this.props.onTouchStart}
           onMouseDown={this.props.onMouseDown}
           style={this._faceStyle()}>
        {
          this.props.numbers.map((i, k) => {
            return (
              <span className={css.number + (parseInt(i) === this.props.active ? ' active' : '')}
                    style={this._numberStyle(this.props.radius - this.props.spacing, k + 1)}
                    key={i}>
                {i}
              </span>
            );
          })
        }
      </div>
    );
  }
});
