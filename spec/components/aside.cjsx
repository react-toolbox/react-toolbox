###
@todo
###

Aside           = require '../../components/aside'
Button          = require '../../components/button'

module.exports = React.createClass

  # -- States & Properties

  # -- Events
  onClick: (ref, method) ->
    @refs[ref][method]()

  # -- Render
  render: ->
    <section>

      <h2>Aside</h2>
      <Aside ref="left" hideable=true>
        <div style={padding: '20px'}>
          <h2>Officia deserunt mollit.</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
      </Aside>

      <Aside ref="right" type="right">
        <Button label="Close" onClick={@onClick.bind null, "right", "hide"} />
      </Aside>

      <nav>
        <Button className="accent" label="Show aside left" type="raised" onClick={@onClick.bind null, "left", "show"} />
        <Button className="primary" label="Show aside left" type="raised" label="Show aside right" onClick={@onClick.bind null, "right", "show"} />
      </nav>
    </section>
