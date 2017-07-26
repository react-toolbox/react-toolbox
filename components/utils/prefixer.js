const WEBKIT = 'Webkit';
const MICROSOFT = 'Ms';

const properties = {
  transform: [WEBKIT, MICROSOFT],
};

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.substr(1);
}

function getPrefixes(property, value) {
  return properties[property].reduce((acc, item) => {
    acc[`${item}${capitalize(property)}`] = value; // eslint-disable-line no-param-reassign
    return acc;
  }, {});
}

function addPrefixesTo(style, property, value) {
  const vendor = getPrefixes(property, value);
  // eslint-disable-next-line no-restricted-syntax
  for (const prefix in vendor) {
    if ({}.hasOwnProperty.call(vendor, prefix)) {
      style[prefix] = vendor[prefix]; // eslint-disable-line no-param-reassign
    }
  }

  return style;
}

function prefixer(style, defaultValue = {}) {
  const _style = defaultValue;
  // eslint-disable-next-line no-restricted-syntax
  for (const property in style) {
    if ({}.hasOwnProperty.call(style, property)) {
      _style[property] = style[property];
      if (properties[property]) {
        addPrefixesTo(_style, property, style[property]);
      }
    }
  }

  return _style;
}

export default prefixer;
