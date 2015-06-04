###
@todo
###


module.exports = React.createClass

  # -- States & Properties
  propTypes:
    value        : React.PropTypes.array.required

  # -- Render
  render: ->
    <span data-component-fonticon className="icon #{@props.value}" />
