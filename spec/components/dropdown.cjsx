###
@todo
###

Dropdown = require '../../components/dropdown'

module.exports = React.createClass

  # -- States & Properties
  getInitialState: ->
    countries: ["Spain", "England", "USA", "Thailand", "Tongo", "Slovenia"]
    countries_obj:
      "ES-es"   : "Spain"
      "TH-th"   : "Thailand"
      "EN-gb"   : "England"
      "EN-en"   : "USA"
      "FR-fr"   : "France"

  # -- Render
  render: ->
    countries_selected = ["USA", "Tongo"]
    countries_obj_selected = "TH-th"

    <section>
      <h2>Dropdown</h2>
      <p>lorem ipsum...</p>
      <Dropdown ref="dropdown" dataSource={@state.countries_obj} label="Countries"/>
      <Dropdown ref="dropdown" dataSource={@state.countries_obj} disabled={true}/>
      <Dropdown ref="dropdown" dataSource={@state.countries_obj}
                value={countries_obj_selected} />
    </section>
