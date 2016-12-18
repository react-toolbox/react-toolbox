const R = require('ramda')

const DEPENDENCIES = {
  APP_BAR: [ 'BUTTON' ],
  AUTOCOMPLETE: [ 'CHIP', 'INPUT' ],
  AVATAR: [],
  BUTTON: [ 'RIPPLE' ],
  CARD: [ 'AVATAR' ],
  CHECKBOX: [ 'RIPPLE' ],
  CHIP: [ 'AVATAR' ],
  DATE_PICKER: [ 'INPUT', 'DIALOG' ],
  DIALOG: [ 'OVERLAY', 'BUTTON' ],
  DRAWER: [ 'OVERLAY' ],
  DROPDOWN: [ 'INPUT' ],
  INPUT: [],
  LAYOUT: [ 'APP_BAR', 'DRAWER' ],
  LINK: [],
  LIST: [ 'RIPPLE', 'AVATAR', 'CHECKBOX' ],
  MENU: [ 'RIPPLE', 'BUTTON' ],
  NAVIGATION: [ 'BUTTON', 'LINK' ],
  OVERLAY: [],
  PROGRESS_BAR: [],
  RADIO: [ 'RIPPLE' ],
  RIPPLE: [],
  SLIDER: [ 'INPUT', 'PROGRESS_BAR' ],
  SNACKBAR: [ 'BUTTON' ],
  SWITCH: [ 'RIPPLE' ],
  TABLE: [ 'CHECKBOX' ],
  TABS: [],
  TIME_PICKER: [ 'INPUT', 'DIALOG' ],
  TOOLTIP: []
}

module.exports = function getDependencies(component) {
  return R.uniq(R.flatten(_getDependencies(component, [ component ])))
}

function _getDependencies(component, dependencies) {
  if (!DEPENDENCIES[component]) return dependencies
  return R.concat(dependencies, R.map(function (id) {
    return _getDependencies(id, [ id ])
  }, DEPENDENCIES[component]))
}
