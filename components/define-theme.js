const DEPENDENCIES = {};

export default function defineTheme (theme) {
  return generateModifiers(theme)(theme);
}

function generateModifiers (components) {
  return compose(Object.keys(components).map(function (component) {
    return compose(getDependencies(component).map(function (dependency) {
      return getModifier(component, dependency);
    }));
  }, idp));
}

function getDependencies (component) {
  return DEPENDENCIES[component] || [];
}

function idp (x) {
  return x;
}


function compose (fns) {
  return fns.reduce(function (f, g) {
    return function (x) {
      return f(g(x));
    };
  }, idp);
}

function getModifier (component, dependency) {
  return function dependencyThemeModifier (theme) {
    return { ...theme, [dependency]: modifyClasses(theme[dependency], theme[component])
    };
  };
}

function modifyClasses (baseTheme = {}, dependentTheme) {
  return Object.keys(baseTheme).reduce((result, baseKey) => (
    dependentTheme[baseKey]
      ? { ...result, [baseKey]: `${baseTheme[baseKey]} ${dependentTheme[baseKey]}` }
      : result
  ), baseTheme);
}
