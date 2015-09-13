###
@todo
###

Autocomplete  = require '../../components/autocomplete'

module.exports = React.createClass

  # -- States & Properties
  getInitialState: ->
    countries: ["Spain", "England", "USA", "Thailand", "Tongo", "Slovenia"]
    countries_obj:
      "ES-es"   : "Spain"
      "TH-th"   : "Thailand"
      "EN-gb"   : "England"
      "EN-en"   : "USA"

  # -- Events
  onAutocompleteValues: (ref, method) ->
    console.log @refs.autocomplete_multiple.getValue()
    console.log @refs.autocomplete_simple.getValue()

  # -- Render
  render: ->
    countries_selected = ["USA", "Tongo"]
    countries_obj_selected = "TH-th"

    <section>
      <h2>Autocomplete</h2>
      <p>lorem ipsum...</p>

      <Autocomplete ref="autocomplete_multiple"
                    label="Choose a country"
                    onChange={this.onAutocompleteValues}
                    placeholder="Elements is up to you..."
                    dataSource={@state.countries}
                    value={countries_selected}/>

      <Autocomplete ref="autocomplete_simple"
                    multiple=false
                    onChange={this.onAutocompleteValues}
                    dataSource={@state.countries_obj}
                    value={countries_obj_selected}/>
    </section>
