export function themr() {
  return (Component) => {
    Component.defaultProps = Component.defaultProps || {};  // eslint-disable-line no-param-reassign
    Component.defaultProps.theme = {}; // eslint-disable-line no-param-reassign
    return Component;
  };
}
