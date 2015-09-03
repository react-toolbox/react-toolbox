Tabs = require('../../components/tabs').Tabs
Tab  = require('../../components/tabs').Tab

module.exports = React.createClass

  render: ->
    <section>
      <h2>Tabs</h2>
      <Tabs>
        <Tab label='Primary'>
          <small>primary</small>
        </Tab>
        <Tab label='Secondary'>
          <small>secondary</small>
        </Tab>
        <Tab label='Third' disabled>
          <small>third</small>
        </Tab>
        <Tab label='Fourth' hidden>
          <small>Fourth</small>
        </Tab>
        <Tab label='Fifth'>
          <small>Fifth</small>
        </Tab>
      </Tabs>
    </section>
