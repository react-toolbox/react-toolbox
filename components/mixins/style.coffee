###
@todo
###

module.exports = React.createClass

  # -- States & Properties
  propTypes:
    style       : React.PropTypes.string

  # -- Lifecycle
  componentWillMount: ->
    console.log "07-lifecycle -> componentWillMount"

  componentDidMount: ->
    console.log "07-lifecycle -> componentDidMount"

  componentWillReceiveProps: (next_props) ->
    console.log "07-lifecycle -> componentWillReceiveProps -> ", next_props

  componentWillUpdate: (next_props, next_states) ->
    console.log "07-lifecycle -> componentWillUpdate -> ", next_props, next_states

  componentDidUpdate: (prev_props, prev_states) ->
    console.log "07-lifecycle -> componentDidUpdate -> ", prev_props, prev_states

  componentWillUnmount: ->
    console.log "07-lifecycle -> componentWillUnmount"

  shouldComponentUpdate: (next_props, next_states) ->
    console.log "07-lifecycle -> shouldComponentUpdate -> ", next_props, next_states
    true
