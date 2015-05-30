###
@todo
###

List            = require "../components/list"
ListItem        = require "../components/list_item"

module.exports  = React.createClass

  render: ->
    mock = (id: i, title: "Title #{i}" for i in [1..128])
    <article data-screen="console">
      <List dataSource={mock} itemFactory={ListItem} onScroll={@props.onScroll} />
    </article>
