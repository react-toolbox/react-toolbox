const THEME_FILES = {
  APP_BAR: '/app_bar/theme.css',
  AUTOCOMPLETE: '/autocomplete/theme.css',
  AVATAR: '/avatar/theme.css',
  BUTTON: '/button/theme.css',
  CARD: '/card/theme.css',
  CHIP: '/chip/theme.css',
  CHECKBOX: '/checkbox/theme.css',
  DATE_PICKER: '/date_picker/theme.css',
  DIALOG: '/dialog/theme.css',
  DRAWER: '/drawer/theme.css',
  DROPDOWN: '/dropdown/theme.css',
  INPUT: '/input/theme.css',
  LAYOUT: '/layout/theme.css',
  LINK: '/link/theme.css',
  LIST: '/list/theme.css',
  MENU: '/menu/theme.css',
  NAVIGATION: '/navigation/theme.css',
  OVERLAY: '/overlay/theme.css',
  PROGRESS_BAR: '/progress_bar/theme.css',
  RADIO: '/radio/theme.css',
  RIPPLE: '/ripple/theme.css',
  SLIDER: '/slider/theme.css',
  SNACKBAR: '/snackbar/theme.css',
  SWITCH: '/switch/theme.css',
  TABLE: '/table/theme.css',
  TABS: '/tabs/theme.css',
  TOOLTIP: '/tooltip/theme.css',
  TIME_PICKER: '/time_picker/theme.css'
}

module.exports = function getPath(component) {
  return THEME_FILES[component]
}
