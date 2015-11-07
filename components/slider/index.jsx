import React from 'react';
import ReactDOM from 'react-dom';
import style from './style';
import utils from '../utils';
import ProgressBar from '../progress_bar';
import Input from '../input';

class Slider extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    editable: React.PropTypes.bool,
    max: React.PropTypes.number,
    min: React.PropTypes.number,
    onChange: React.PropTypes.func,
    pinned: React.PropTypes.bool,
    snaps: React.PropTypes.bool,
    step: React.PropTypes.number,
    value: React.PropTypes.number
  };

  static defaultProps = {
    className: '',
    editable: false,
    max: 100,
    min: 0,
    pinned: false,
    snaps: false,
    step: 0.01,
    value: 0
  };

  state = {
    sliderStart: 0,
    sliderLength: 0,
    value: this.props.value
  };

  componentDidMount () {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState.value !== this.state.value) {
      if (this.props.onChange) this.props.onChange(this);
      if (this.refs.input) this.refs.input.setValue(this.valueForInput(this.state.value));
    }
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.handleResize);
  }


  handleInputBlur = () => {
    this.setState({value: this.trimValue(this.refs.input.getValue()) });
  };

  handleKeyDown = (event) => {
    if ([13, 27].indexOf(event.keyCode) !== -1) {
      this.refs.input.blur();
      ReactDOM.findDOMNode(this).blur();
    }
    if (event.keyCode === 38) this.addToValue(this.props.step);
    if (event.keyCode === 40) this.addToValue(-this.props.step);
  };

  handleMouseDown = (event) => {
    utils.events.addEventsToDocument(this.getMouseEventMap());
    this.start(utils.events.getMousePosition(event));
    utils.events.pauseEvent(event);
  };

  handleMouseMove = (event) => {
    utils.events.pauseEvent(event);
    this.move(utils.events.getMousePosition(event));
  };

  handleMouseUp = () => {
    this.end(this.getMouseEventMap());
  };

  handleResize = (event, callback) => {
    const {left, right} = ReactDOM.findDOMNode(this.refs.progressbar).getBoundingClientRect();
    const cb = callback || () => {};
    this.setState({sliderStart: left, sliderLength: right - left}, cb);
  };

  handleSliderBlur = () => {
    utils.events.removeEventsFromDocument(this.getKeyboardEvents());
  };

  handleSliderFocus = () => {
    utils.events.addEventsToDocument(this.getKeyboardEvents());
  };

  handleTouchEnd = () => {
    this.end(this.getTouchEventMap());
  };

  handleTouchMove = (event) => {
    this.move(utils.events.getTouchPosition(event));
  };

  handleTouchStart = (event) => {
    this.start(utils.events.getTouchPosition(event));
    utils.events.addEventsToDocument(this.getTouchEventMap());
    utils.events.pauseEvent(event);
  };

  addToValue (value) {
    this.setState({value: this.trimValue(this.state.value + value)});
  }

  getKeyboardEvents () {
    return {
      keydown: this.handleKeyDown
    };
  }

  getMouseEventMap () {
    return {
      mousemove: this.handleMouseMove,
      mouseup: this.handleMouseUp
    };
  }

  getTouchEventMap () {
    return {
      touchmove: this.handleTouchMove,
      touchend: this.handleTouchEnd
    };
  }

  end (revents) {
    utils.events.removeEventsFromDocument(revents);
    this.setState({pressed: false});
  }

  knobOffset () {
    const { max, min } = this.props;
    return this.state.sliderLength * (this.state.value - min) / (max - min);
  }

  move (position) {
    this.setState({value: this.positionToValue(position)});
  }

  positionToValue (position) {
    const { sliderStart: start, sliderLength: length } = this.state;
    const { max, min } = this.props;
    return this.trimValue((position.x - start) / length * (max - min) + min);
  }

  start (position) {
    this.handleResize(null, () => {
      this.setState({pressed: true, value: this.positionToValue(position)});
    });
  }

  stepDecimals () {
    return (this.props.step.toString().split('.')[1] || []).length;
  }

  trimValue (value) {
    if (value < this.props.min) return this.props.min;
    if (value > this.props.max) return this.props.max;
    return utils.round(value, this.stepDecimals());
  }

  valueForInput (value) {
    const decimals = this.stepDecimals();
    return decimals > 0 ? value.toFixed(decimals) : value.toString();
  }

  renderSnaps () {
    if (this.props.snaps) {
      return (
        <div ref='snaps' className={style.snaps}>
          {
            utils.range(0, (this.props.max - this.props.min) / this.props.step).map(i => {
              return (<div key={`span-${i}`} className={style.snap}></div>);
            })
          }
        </div>
      );
    }
  }

  renderInput () {
    if (this.props.editable) {
      return (
        <Input
          ref='input'
          className={style.input}
          onBlur={this.handleInputBlur}
          value={this.valueForInput(this.state.value)} />
      );
    }
  }

  render () {
    const knobStyles = utils.prefixer({transform: `translateX(${this.knobOffset()}px)`});
    let className = this.props.className;
    if (this.props.editable) className += ` ${style.editable}`;
    if (this.props.pinned) className += ` ${style.pinned}`;
    if (this.state.pressed) className += ` ${style.pressed}`;
    if (this.state.value === this.props.min) className += ` ${style.ring}`;

    return (
      <div
        data-react-toolbox='slider'
        className={style.root + className}
        tabIndex='0'
        onBlur={this.handleSliderBlur}
        onFocus={this.handleSliderFocus}
      >
        <div
          ref='slider'
          className={style.container}
          onMouseDown={this.handleMouseDown}
          onTouchStart={this.handleTouchStart}
        >
          <div
            ref='knob'
            className={style.knob}
            onMouseDown={this.handleMouseDown}
            onTouchStart={this.handleTouchStart}
            style={knobStyles}
          >
            <div className={style.innerknob} data-value={parseInt(this.state.value)}></div>
          </div>

          <div className={style.progress}>
            <ProgressBar
              ref='progressbar'
              className={style.innerprogress}
              max={this.props.max}
              min={this.props.min}
              mode='determinate'
              value={this.state.value}
            />
            { this.renderSnaps() }
          </div>
        </div>

        { this.renderInput() }
      </div>
    );
  }

  getValue () {
    return this.state.value;
  }

  setValue (value) {
    this.setState({value});
  }
}

export default Slider;
