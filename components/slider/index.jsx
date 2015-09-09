const React = window.React;
const css = require('./style');
const utils = require('../utils');

const ProgressBar = require('../progress_bar');
const Input = require('../input');

module.exports = React.createClass({
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
    if (prevState.value !== this.state.value && this.props.onChange) {
      this.props.onChange(this);
    }

    if (this.refs.input) {
      const inputValue = parseFloat(this.refs.input.getValue());
      if (this.state.value !== inputValue) {
        this.refs.input.setValue(this.valueForInput(this.state.value));
      }
    }
  },

  onResize () {
    const bounds = this.refs.progressbar.getDOMNode().getBoundingClientRect();
    this.setState({
      sliderStart: bounds.left,
      sliderLength: bounds.right - bounds.left
    });
  },

  onSliderMouseDown (event) {
    const position = utils.events.getMousePosition(event);
    const value = this.positionToValue(position);
    this.setState({value: value}, (function () {
      this.start(position);
      utils.events.addEventsToDocument(this.getTouchEventMap());
    }).bind(this));
    utils.events.pauseEvent(event);
  },

  onSliderTouchStart (event) {
    const position = utils.events.getTouchPosition(event);
    const value = this.positionToValue(position);
    this.setState({value: value}, (function () {
      this.start(position);
      utils.events.addEventsToDocument(this.getTouchEventMap());
    }).bind(this));
    utils.events.pauseEvent(event);
  },

  onSliderFocus () {
    utils.events.addEventsToDocument(this.getKeyboardEvents());
  },

  onSliderBlur () {
    utils.events.removeEventsFromDocument(this.getKeyboardEvents());
  },

  onInputChange (event) {
    this.setState({value: this.trimValue(event.target.value) });
  },

  onKeyDown (event) {
    event.stopPropagation();
    if (event.keyCode in [13, 27]) this.getDOMNode().blur();
    if (event.keyCode === 38) this.addToValue(this.props.step);
    if (event.keyCode === 40) this.addToValue(-this.props.step);
  },

  onMouseDown (event) {
    this.start(utils.events.getMousePosition(event));
    utils.events.addEventsToDocument(this.getMouseEventMap());
  },

  onTouchStart (event) {
    event.stopPropagation();
    this.start(utils.events.getTouchPosition(event));
    utils.events.addEventsToDocument(this.getTouchEventMap());
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

  positionToValue (position) {
    const offset = position.x - this.state.sliderStart;
    return this.trimValue(offset / this.state.sliderLength * (this.props.max - this.props.min) + this.props.min);
  },

  start (position) {
    this.setState({
      pressed: true,
      startPosition: position.x,
      startValue: this.state.value
    });
  },

  move (position) {
    const value = this.endPositionToValue(position);
    this.setState({value: value});
  },

  end (revents) {
    utils.events.removeEventsFromDocument(revents);
    this.setState({pressed: false});
  },

  endPositionToValue (position) {
    const offset = position.x - this.state.startPosition;
    const diffValue = offset / this.state.sliderLength * (this.props.max - this.props.min);
    return this.trimValue(diffValue + this.state.startValue);
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
    this.setState({
      value: this.trimValue(this.state.value + value)
    });
  },

  valueForInput (value) {
    const decimals = this.stepDecimals();
    return decimals > 0 ? value.toFixed(decimals) : value.toString();
  },

  calculateKnobOffset () {
    return this.state.sliderLength * (this.state.value - this.props.min) / (this.props.max - this.props.min);
  },

  renderSnaps () {
    if (this.props.snaps) {
      return (
        <div ref='snaps' className={css.snaps}>
        {
          utils.range(0, (this.props.max - this.props.min) / this.props.step).map(i => {
            return (<div key={`span-${i}`} className={css.snap}></div>);
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
          className={css.input}
          onChange={this.onInputChange}
          value={this.valueForInput(this.state.value)} />
      );
    }
  },

  render () {
    let knobStyles = utils.prefixer({transform: `translateX(${this.calculateKnobOffset()}px)`});
    let className = this.props.className;
    if (this.props.editable) className += ' editable';
    if (this.props.pinned) className += ' pinned';
    if (this.state.pressed) className += ' pressed';
    if (this.state.value === this.props.min) className += ' ring';

    return (
      <div
        className={css.root + className}
        tabIndex='0'
        onFocus={this.onSliderFocus}
        onBlur={this.onSliderBlur} >

        <div
          ref='slider'
          className={css.container}
          onTouchStart={this.onSliderTouchStart}
          onMouseDown={this.onSliderMouseDown} >

          <div
            ref='knob'
            className={css.knob}
            style={knobStyles}
            onMouseDown={this.onMouseDown}
            onTouchStart={this.onTouchStart} >
              <div className={css.knobInner} data-value={parseInt(this.state.value)}></div>
          </div>

          <div className={css.progress}>
            <ProgressBar
              ref='progressbar'
              mode='determinate'
              className={css.progressInner}
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
