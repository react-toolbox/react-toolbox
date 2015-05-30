###
@todo
###

module.exports = React.createClass

  # -- States & Properties
  propTypes:
    itemFactory   : React.PropTypes.func.isRequired
    dataSource    : React.PropTypes.array.isRequired

  getDefaultProps: ->
    itemFactory   : (index) -> <div key={index}></div>
    dataSource    : []

  getInitialState: ->
    scrolling     : false
    scroll : 0

  # -- Lifecycle
  componentDidMount: ->
    @setState clientHeight: @getDOMNode().clientHeight

  # -- Events
  onScroll: (event) ->
    scroll = @refs.section.getDOMNode().scrollTop
    @props.onScroll? scroll > @state.scroll
    @setState scroll: scroll

  # -- Render
  render: ->
    <section ref="section" onScroll={@onScroll} className="scroll">
      <ul>
      {
        for item, index in @props.dataSource
          <li key={index}>{@props.itemFactory item}</li>
      }
      </ul>
    </section>
