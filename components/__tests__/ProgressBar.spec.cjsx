expect      = require('expect')
utils       = require('./utils')

TestUtils   = React.addons.TestUtils
ProgressBar = require('../progress_bar')

describe 'ProgressBar', ->
  describe '#props', ->
    it 'has the right default properties', ->
      progress = TestUtils.renderIntoDocument(<ProgressBar />)
      expect(progress.props.max).toEqual(100)
      expect(progress.props.min).toEqual(0)
      expect(progress.props.mode).toEqual('indeterminate')
      expect(progress.props.multicolor).toEqual(false)
      expect(progress.props.type).toEqual('linear')
      expect(progress.props.value).toEqual(0)

  describe '#calculateRadio', ->
    it 'calculates the right ratio', ->
      progress = TestUtils.renderIntoDocument(<ProgressBar min={100} max={300} />)
      expect(progress.calculateRatio(150)).toEqual(0.25)

  describe '#render', ->
    context 'when its a linear progress bar', ->
      it 'renders the value and buffer bar', ->
        progressWrapper = utils.shallowRenderComponent(ProgressBar).props.children
        expect(progressWrapper.props.children.length).toEqual(2)
