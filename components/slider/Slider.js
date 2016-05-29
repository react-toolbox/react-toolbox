import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { SLIDER } from '../identifiers.js';
import events from '../utils/events.js';
import prefixer from '../utils/prefixer.js';
import utils from '../utils/utils.js';
import InjectProgressBar from '../progress_bar/ProgressBar.js';
import InjectInput from '../input/Input.js';

const factory = (ProgressBar, Input) => {
  class Slider extends Component {
    static propTypes = {
      className: PropTypes.string,
      editable: PropTypes.bool,
      max: PropTypes.number,
      min: PropTypes.number,
      onChange: PropTypes.func,
      pinned: PropTypes.bool,
      snaps: PropTypes.bool,
      step: PropTypes.number,
      theme: PropTypes.shape({
        container: PropTypes.string,
        editable: PropTypes.string,
        innerknob: PropTypes.string,
        innerprogress: PropTypes.string,
        input: PropTypes.string,
        knob: PropTypes.string,
        pinned: PropTypes.string,
        pressed: PropTypes.string,
        progress: PropTypes.string,
        ring: PropTypes.string,
        slider: PropTypes.string,
        snap: PropTypes.string,
        snaps: PropTypes.string
      }),
      value: PropTypes.number
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
      inputFocused: false,
      inputValue: null,
      sliderLength: 0,
      sliderStart: 0
    };

    componentDidMount () {
      window.addEventListener('resize', this.handleResize);
      this.handleResize();
    }

    shouldComponentUpdate (nextProps, nextState) {
      if (!this.state.inputFocused && nextState.inputFocused) return false;
      if (this.state.inputFocused && this.props.value !== nextProps.value) {
        this.setState({inputValue: this.valueForInput(nextProps.value)});
        return false;
      }
      return true;
    }

    componentWillUnmount () {
      window.removeEventListener('resize', this.handleResize);
      events.removeEventsFromDocument(this.getMouseEventMap());
      events.removeEventsFromDocument(this.getTouchEventMap());
      events.removeEventsFromDocument(this.getKeyboardEvents());
    }

    handleInputFocus = () => {
      this.setState({
        inputFocused: true,
        inputValue: this.valueForInput(this.props.value)
      });
    };

    handleInputChange = (value) => {
      this.setState({inputValue: value});
    };

    handleInputBlur = (event) => {
      const value = this.state.inputValue || 0;
      this.setState({inputFocused: false, inputValue: null}, () => {
        this.props.onChange(this.trimValue(value), event);
      });
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
      if (this.state.inputFocused) this.refs.input.blur();
      events.addEventsToDocument(this.getMouseEventMap());
      this.start(events.getMousePosition(event));
      events.pauseEvent(event);
    };

    handleMouseMove = (event) => {
      events.pauseEvent(event);
      this.move(events.getMousePosition(event));
    };

    handleMouseUp = () => {
      this.end(this.getMouseEventMap());
    };

    handleResize = (event, callback) => {
      const {left, right} = ReactDOM.findDOMNode(this.refs.progressbar).getBoundingClientRect();
      const cb = (callback) || (() => {});
      this.setState({sliderStart: left, sliderLength: right - left}, cb);
    };

    handleSliderBlur = () => {
      events.removeEventsFromDocument(this.getKeyboardEvents());
    };

    handleSliderFocus = () => {
      events.addEventsToDocument(this.getKeyboardEvents());
    };

    handleTouchEnd = () => {
      this.end(this.getTouchEventMap());
    };

    handleTouchMove = (event) => {
      this.move(events.getTouchPosition(event));
    };

    handleTouchStart = (event) => {
      if (this.state.inputFocused) this.refs.input.blur();
      this.start(events.getTouchPosition(event));
      events.addEventsToDocument(this.getTouchEventMap());
      events.pauseEvent(event);
    };

    addToValue (increment) {
      let value = this.state.inputFocused ? parseFloat(this.state.inputValue) : this.props.value;
      value = this.trimValue(value + increment);
      if (value !== this.props.value) this.props.onChange(value);
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
      events.removeEventsFromDocument(revents);
      this.setState({ pressed: false });
    }

    knobOffset () {
      const { max, min } = this.props;
      return this.state.sliderLength * (this.props.value - min) / (max - min);
    }

    move (position) {
      const newValue = this.positionToValue(position);
      if (newValue !== this.props.value) this.props.onChange(newValue);
    }

    positionToValue (position) {
      const { sliderStart: start, sliderLength: length } = this.state;
      const { max, min } = this.props;
      return this.trimValue((position.x - start) / length * (max - min) + min);
    }

    start (position) {
      this.handleResize(null, () => {
        this.setState({pressed: true});
        this.props.onChange(this.positionToValue(position));
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
          <div ref='snaps' className={this.props.theme.snaps}>
            {utils.range(0, (this.props.max - this.props.min) / this.props.step).map(i => {
              return <div key={`span-${i}`} className={this.props.theme.snap} />;
            })}
          </div>
        );
      }
    }

    renderInput () {
      if (this.props.editable) {
        const value = this.state.inputFocused ? this.state.inputValue : this.valueForInput(this.props.value);
        return (
          <Input
            ref='input'
            className={this.props.theme.input}
            onFocus={this.handleInputFocus}
            onChange={this.handleInputChange}
            onBlur={this.handleInputBlur}
            value={value}
            />
        );
      }
    }

    render () {
      const { theme } = this.props;
      const knobStyles = prefixer({transform: `translateX(${this.knobOffset()}px)`});
      const className = classnames(theme.slider, {
        [theme.editable]: this.props.editable,
        [theme.pinned]: this.props.pinned,
        [theme.pressed]: this.state.pressed,
        [theme.ring]: this.props.value === this.props.min
      }, this.props.className);

      return (
        <div
          className={className}
          data-react-toolbox='slider'
          onBlur={this.handleSliderBlur}
          onFocus={this.handleSliderFocus}
          tabIndex='0'
          >
          <div
            ref='slider'
            className={theme.container}
            onMouseDown={this.handleMouseDown}
            onTouchStart={this.handleTouchStart}
            >
            <div
              ref='knob'
              className={theme.knob}
              onMouseDown={this.handleMouseDown}
              onTouchStart={this.handleTouchStart}
              style={knobStyles}
              >
              <div className={theme.innerknob} data-value={parseInt(this.props.value)}></div>
            </div>

            <div className={theme.progress}>
              <ProgressBar
                ref='progressbar'
                className={theme.innerprogress}
                max={this.props.max}
                min={this.props.min}
                mode='determinate'
                value={this.props.value}
                />
              {this.renderSnaps()}
            </div>
          </div>

          {this.renderInput()}
        </div>
      );
    }
  }

  return Slider;
};

const Slider = factory(InjectProgressBar, InjectInput);
export default themr(SLIDER)(Slider);
export { factory as sliderFactory };
export { Slider };
