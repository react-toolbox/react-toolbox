###
@todo
###

C = require "constants"

module.exports = (value) ->
  if value or value is null
    window.localStorage.setItem C.STORAGE.SESSION, JSON.stringify value
    value
  else
    JSON.parse window.localStorage.getItem C.STORAGE.SESSION
