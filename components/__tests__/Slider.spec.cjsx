TestUtils   = React.addons.TestUtils
expect      = require('expect')
utils       = require('./utils')
Slider      = require('../slider')

describe 'Slider', ->
  describe '#events', ->
    slider = null

    before ->
      props = { min: -500, max: 500 }
      state = { sliderStart:  0, sliderLength: 1000 }
      slider = utils.renderComponent(Slider, props, state)

    it "sets pressed state when knob is clicked", ->
      TestUtils.Simulate.mouseDown(slider.refs.knob)
      expect(slider.state.pressed).toEqual(true)

    it "sets a proper value when the slider is clicked", ->
      TestUtils.Simulate.mouseDown(slider.refs.slider, { pageX: 200 })
      expect(slider.state.value).toEqual(-300)
