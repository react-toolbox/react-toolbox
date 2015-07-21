capitalized = (prop) ->
  prop[0].toUpperCase() + prop[1..-1].toLowerCase()

vendorNoMoz = (prop, args) ->
  "Webkit#{capitalized(prop)}": args
  "Ms#{capitalized(prop)}":     args
  "#{prop}":                    args

module.exports =
  transform: (value) -> vendorNoMoz('transform', value)
