const CSS_OPTION       = 'styles'
const JS_OPTION        = 'javascript'
const OUTPUT_OPTION    = 'output'
const DEFAULT_FILENAME = 'theme'
const DEFAULT_OUTPUT   = 'public/react-toolbox'
const DEFAULT_PATH     = './node_modules/react-toolbox/lib'
const OUTPUT_OPTIONS   = [ 'path', 'include', 'customProperties', 'css', 'js' ]
const INPUT_OPTIONS    = [
  'path',
  'include',
  'customProperties',
  CSS_OPTION,
  JS_OPTION,
  OUTPUT_OPTION
]

const DEFAULT_OPTIONS = {
  include: [
    'APP_BAR',
    'AUTOCOMPLETE',
    'AVATAR',
    'BUTTON',
    'CARD',
    'CHIP',
    'CHECKBOX',
    'DATE_PICKER',
    'DIALOG',
    'DRAWER',
    'DROPDOWN',
    'INPUT',
    'LAYOUT',
    'LINK',
    'LIST',
    'MENU',
    'NAVIGATION',
    'OVERLAY',
    'PROGRESS_BAR',
    'RADIO',
    'RIPPLE',
    'SLIDER',
    'SNACKBAR',
    'SWITCH',
    'TABLE',
    'TABS',
    'TOOLTIP',
    'TIME_PICKER'
  ],
  customProperties: {},
  output: DEFAULT_OUTPUT,
  path: DEFAULT_PATH
}

module.exports.OUTPUT_OPTION    = OUTPUT_OPTION
module.exports.CSS_OPTION       = CSS_OPTION
module.exports.JS_OPTION        = JS_OPTION
module.exports.DEFAULT_OPTIONS  = DEFAULT_OPTIONS
module.exports.DEFAULT_OUTPUT   = DEFAULT_OUTPUT
module.exports.DEFAULT_FILENAME = DEFAULT_FILENAME
module.exports.INPUT_OPTIONS    = INPUT_OPTIONS
module.exports.OUTPUT_OPTIONS   = OUTPUT_OPTIONS
