import React from 'react';
import ReactDOM from 'react-dom';
import style from './style';
import utils from '../utils';
import ProgressBar from '../progress_bar';
import Input from '../input';

export default React.createClass({
  displayName: 'Slider',

  propTypes: {
    className: React.PropTypes.string,
    editable: React.PropTypes.bool,
    max: React.PropTypes.number,
    min: React.PropTypes.number,
    onChange: React.PropTypes.func,
    pinned: React.PropTypes.bool,
    snaps: React.PropTypes.bool,
    step: React.PropTypes.number,
    value: React.PropTypes.number
  },

  getDefaultProps () {
    return {
      className: '',
      editable: false,
      max: 100,
      min: 0,
      pinned: false,
      snaps: false,
      step: 0.01,
      value: 0
    };
  },

  getInitialState () {
    return {
      sliderStart: 0,
      sliderLength: 0,
      value: this.props.value
    };
  },

  componentDidMount () {
    window.addEventListener('resize', this.onResize);
    this.onResize();
  },

  componentWillUnmount () {
    window.removeEventListener('resize', this.onResize);
  },

  componentDidUpdate (prevProps, prevState) {
    if (prevState.value !== this.state.value) {
      if (this.props.onChange) this.props.onChange(this);
      if (this.refs.input) this.refs.input.setValue(this.valueForInput(this.state.value));
    }
  },

  onResize () {
    const {left, right} = ReactDOM.findDOMNode(this.refs.progressbar).getBoundingClientRect();
    this.setState({sliderStart: left, sliderLength: right - left});
  },

  onSliderFocus () {
    utils.events.addEventsToDocument(this.getKeyboardEvents());
  },

  onSliderBlur () {
    utils.events.removeEventsFromDocument(this.getKeyboardEvents());
  },

  onInputChange () {
    this.setState({value: this.trimValue(this.refs.input.getValue()) });
  },

  onKeyDown (event) {
    if ([13, 27].indexOf(event.keyCode) !== -1) ReactDOM.findDOMNode(this).blur();
    if (event.keyCode === 38) this.addToValue(this.props.step);
    if (event.keyCode === 40) this.addToValue(-this.props.step);
    if (event.keyCode !== 9) utils.events.pauseEvent(event);
  },

  onMouseDown (event) {
    utils.events.addEventsToDocument(this.getMouseEventMap());
    this.start(utils.events.getMousePosition(event));
    utils.events.pauseEvent(event);
  },

  onTouchStart (event) {
    this.start(utils.events.getTouchPosition(event));
    utils.events.addEventsToDocument(this.getTouchEventMap());
    utils.events.pauseEvent(event);
  },

  onMouseMove (event) {
    utils.events.pauseEvent(event);
    this.move(utils.events.getMousePosition(event));
  },

  onTouchMove (event) {
    this.move(utils.events.getTouchPosition(event));
  },

  onMouseUp () {
    this.end(this.getMouseEventMap());
  },

  onTouchEnd () {
    this.end(this.getTouchEventMap());
  },

  getMouseEventMap () {
    return {
      mousemove: this.onMouseMove,
      mouseup: this.onMouseUp
    };
  },

  getTouchEventMap () {
    return {
      touchmove: this.onTouchMove,
      touchend: this.onTouchEnd
    };
  },

  getKeyboardEvents () {
    return {
      keydown: this.onKeyDown
    };
  },

  start (position) {
    this.setState({pressed: true, value: this.positionToValue(position)});
  },

  move (position) {
    this.setState({value: this.positionToValue(position)});
  },

  end (revents) {
    utils.events.removeEventsFromDocument(revents);
    this.setState({pressed: false});
  },

  positionToValue (position) {
    let { sliderStart: start, sliderLength: length } = this.state;
    let { max, min } = this.props;
    return this.trimValue((position.x - start) / length * (max - min) + min);
  },

  trimValue (value) {
    if (value < this.props.min) return this.props.min;
    if (value > this.props.max) return this.props.max;
    return utils.round(value, this.stepDecimals());
  },

  stepDecimals () {
    return (this.props.step.toString().split('.')[1] || []).length;
  },

  addToValue (value) {
    this.setState({value: this.trimValue(this.state.value + value)});
  },

  valueForInput (value) {
    const decimals = this.stepDecimals();
    return decimals > 0 ? value.toFixed(decimals) : value.toString();
  },

  knobOffset () {
    let { max, min } = this.props;
    return this.state.sliderLength * (this.state.value - min) / (max - min);
  },

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
  },

  renderInput () {
    if (this.props.editable) {
      return (
        <Input
          ref='input'
          className={style.input}
          onChange={this.onInputChange}
          value={this.valueForInput(this.state.value)} />
      );
    }
  },

  render () {
    let knobStyles = utils.prefixer({transform: `translateX(${this.knobOffset()}px)`});
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
        onFocus={this.onSliderFocus}
        onBlur={this.onSliderBlur} >

        <div
          ref='slider'
          className={style.container}
          onTouchStart={this.onTouchStart}
          onMouseDown={this.onMouseDown} >

          <div
            ref='knob'
            className={style.knob}
            style={knobStyles}
            onMouseDown={this.onMouseDown}
            onTouchStart={this.onTouchStart} >
              <div className={style.innerknob} data-value={parseInt(this.state.value)}></div>
          </div>

          <div className={style.progress}>
            <ProgressBar
              ref='progressbar'
              mode='determinate'
              className={style.innerprogress}
              value={this.state.value}
              max={this.props.max}
              min={this.props.min}/>
            { this.renderSnaps() }
          </div>
        </div>

        { this.renderInput() }
      </div>
    );
  },

  getValue () {
    return this.state.value;
  },

  setValue (value) {
    this.setState({value: value});
  }
});
