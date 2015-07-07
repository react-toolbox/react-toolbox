###
@todo
###

Dropdown = require '../../components/dropdown'

module.exports = React.createClass

  # -- States & Properties
  getInitialState: ->
    countries: [
      value: "ES-es", label: "Spain", img: "http://"
    ,
      value: "TH-th", label: "Thailand", img: "http://"
    ,
      value: "EN-gb", label: "England", img: "http://"
    ,
      value: "EN-en", label: "USA", img: "http://"
    ,
      value: "FR-fr", label: "France", img: "http://"
    ]
    selected: "TH-th"

  # -- Events
  onChange: (dropdown) ->
    console.log "[DROPDOWN]", dropdown.getValue()

  # -- Internal
  customDropdownItem: (data) ->
    style =
      width           : 32
      height          : 32
      backgroundColor : '#ccc'
      marginRight     : 8

    <div data-flex="horizontal grow" data-flex-content="center">
      <img src={data.img} data-flex-grow="min" style={style} />
      <div data-flex-grow="max" data-flex="vertical" >
        <strong>{data.label}</strong>
        <small>{data.value}</small>
      </div>
    </div>

  # -- Render
  render: ->
    <section>
      <h2>Dropdown</h2>
      <p>lorem ipsum...</p>
      <Dropdown dataSource={@state.countries} label="Countries"
                onChange={@onChange}/>
      <Dropdown dataSource={@state.countries} disabled={true}
                onChange={@onChange}/>
      <Dropdown dataSource={@state.countries} value={@state.selected}
                onChange={@onChange}/>
      <Dropdown dataSource={@state.countries} value={@state.selected}
                template={@customDropdownItem} onChange={@onChange}/>
    </section>
