React       = require('react/addons')
expect      = require('expect')
utils       = require('./utils')

TestUtils   = React.addons.TestUtils
Slider      = require('../slider')

describe 'Slider', ->
  before ->
    @component = TestUtils.renderIntoDocument(<Slider />)
    @component.setState({ sliderStart:  0, sliderLength: 1000 })

  describe '#events', ->
    it "sets pressed state when knob is clicked", ->
      TestUtils.Simulate.mouseDown(@component.refs.knob)
      expect(@component.state.pressed).toEqual(true)

    it "sets a proper value when the slider is clicked", ->
      TestUtils.Simulate.mouseDown(@component.refs.slider, { pageX: 800 })
      expect(@component.state.value).toEqual(80)
