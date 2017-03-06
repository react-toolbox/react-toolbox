import assoc from 'ramda/src/assoc';

export default function getNamespacedTheme(namespace, theme) {
  return Object.keys(theme)
    .filter(key => key.startsWith(namespace))
    .reduce((result, key) => (
      assoc(removeNamespace(key, namespace), theme[key], result)
    ), {});
}

function removeNamespace(key, themeNamespace) {
  const capitalized = key.substr(themeNamespace.length);
  return capitalized.slice(0, 1).toLowerCase() + capitalized.slice(1);
}
