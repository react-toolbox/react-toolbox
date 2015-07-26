TestUtils   = React.addons.TestUtils
expect      = require('expect')
utils       = require('./utils')
Slider      = require('../slider')
ProgressBar = require('../progress_bar')

describe 'Slider', ->
  describe '#positionToValue', ->
    before ->
      props = { min: -500, max: 500 }
      state = { sliderStart:  500, sliderLength: 100 }
      @slider = utils.renderComponent(Slider, props, state)

    it 'returns min when position is less than origin', ->
      expect(@slider.positionToValue({x: 400})).toEqual(-500)

    it 'returns max when position is more and origin plus length', ->
      expect(@slider.positionToValue({x: 900})).toEqual(500)

    it 'returns the proper position when the position is inside slider', ->
      expect(@slider.positionToValue({x: 520})).toEqual(-300)

  describe '#endPositionToValue', ->
    before ->
      props = { min: -500, max: 500 }
      state = { sliderStart:  500, sliderLength: 100, startPosition: 520, startValue: -300 }
      @slider = utils.renderComponent(Slider, props, state)

    it 'returns the proper value when is moved left', ->
      expect(@slider.endPositionToValue({x: 510})).toEqual(-400)

    it 'returns the proper value when is moved right', ->
      expect(@slider.endPositionToValue({x: 570})).toEqual(200)

    it 'returns the proper value when is not moved', ->
      expect(@slider.endPositionToValue({x: 520})).toEqual(-300)

  describe '#trimValue', ->
    before ->
      props = { min: 0, max: 100, step: 0.1 }
      @slider = utils.renderComponent(Slider, props)

    it 'rounds to the proper number', ->
      expect(@slider.trimValue(57.16)).toEqual(57.2)
      expect(@slider.trimValue(57.12)).toEqual(57.10)

    it 'returns min if number is less than min', ->
      expect(@slider.trimValue(-57.16)).toEqual(0)

    it 'returns max if number is more than max', ->
      expect(@slider.trimValue(257.16)).toEqual(100)

  describe '#valueForInput', ->
    before ->
      props = { min: 0, max: 100, step: 0.01 }
      @slider = utils.renderComponent(Slider, props)

    it 'returns a fixed number when an integer is given', ->
      expect(@slider.valueForInput(4)).toEqual('4.00')

    it 'returns a fixed number when a float is given', ->
      expect(@slider.valueForInput(4.06)).toEqual('4.06')

  describe '#calculateKnobOffset', ->
    it 'returns the corresponding offset for a given value and slider length/start', ->
      props = { min: -500, max: 500, value: -250 }
      state = { sliderStart:  500, sliderLength: 100 }
      slider = utils.renderComponent(Slider, props, state)
      expect(slider.calculateKnobOffset()).toEqual(25)

  describe '#render', ->
    it "contains a linear progress bar with proper properties", ->
      slider = utils.renderComponent(Slider, {min: 100, max: 1000, value: 140})
      progress = TestUtils.findRenderedComponentWithType(slider, ProgressBar)
      expect(progress.props.mode).toEqual('determinate')
      expect(progress.props.type).toEqual('linear')
      expect(progress.props.value).toEqual(140)
      expect(progress.props.min).toEqual(100)
      expect(progress.props.max).toEqual(1000)

  describe 'events', ->
    before ->
      props = { min: -500, max: 500 }
      state = { sliderStart:  0, sliderLength: 1000 }
      @slider = utils.renderComponent(Slider, props, state)

    it "sets pressed state when knob is clicked", ->
      TestUtils.Simulate.mouseDown(@slider.refs.knob)
      expect(@slider.state.pressed).toEqual(true)

    it "sets a proper value when the slider is clicked", ->
      TestUtils.Simulate.mouseDown(@slider.refs.slider, { pageX: 200 })
      expect(@slider.state.value).toEqual(-300)
