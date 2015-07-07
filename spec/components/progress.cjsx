###
@todo
###

ProgressBar = require '../../components/progress_bar'

module.exports = React.createClass

  # -- States & Properties
  getInitialState: ->
    progress: 0
    buffer:   10

  # -- Lifecycle
  componentWillMount: ->
    @simulateProgress()

  # -- Simulate kind of a progress async function
  simulateProgress: ->
    setTimeout =>
      if @state.progress < 100
        @increaseProgress()
        @increaseBuffer() if @state.progress > @state.buffer
      else
        @replaceState @getInitialState()
      @simulateProgress()
    , (Math.random() * 1 + 1) * 1000

  increaseProgress: ->
    @setState progress: Math.random() * 30 + @state.progress

  increaseBuffer: ->
    @setState buffer: Math.random() * (100 - @state.progress) + @state.progress

  # -- Render
  render: ->
    <section>
      <h2>Progress bars</h2>

      <p>Determinate</p>
      <ProgressBar mode="determinate" value={@state.progress} buffer={@state.buffer}/>

      <p>Indeterminate...</p>
      <ProgressBar mode="indeterminate"/>

      <p>Circular</p>
      <ProgressBar type="circular" mode="indeterminate"/>
    </section>
