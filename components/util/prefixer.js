const WEBKIT = 'Webkit';
const MICROSOFT = 'Ms';

const properties = {
  transform: [WEBKIT, MICROSOFT]
};

function capitalize (string) {
  return string.charAt(0).toUpperCase() + string.substr(1);
}

function getPrefixes (property, value) {
  return properties[property].reduce(function (acc, item) {
    acc[`${item}${capitalize(property)}`] = value;
    return acc;
  }, {});
}

function prefixer (style) {
  let _style = style;

  for (let property in properties) {
    if (style[property]) {
      _style = Object.assign(_style, getPrefixes(property, style[property]));
    }
  }

  return _style;
}

module.exports = prefixer;
