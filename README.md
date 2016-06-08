# <a href='http://react-toolbox.com'><img src='https://dl.dropboxusercontent.com/u/2247264/banner.png' height='50'></a>

[![npm version](https://img.shields.io/npm/v/react-toolbox.svg?style=flat-square)](https://www.npmjs.com/package/react-toolbox) [![Build Status](http://img.shields.io/travis/react-toolbox/react-toolbox/master.svg?style=flat-square)](https://travis-ci.org/react-toolbox/react-toolbox) [![NPM Status](http://img.shields.io/npm/dm/react-toolbox.svg?style=flat-square)](https://www.npmjs.org/package/react-toolbox) [![react-toolbox channel on discord](https://img.shields.io/badge/discord-%23react--toolbox%20%40%20reactiflux-61dafb.svg?style=flat-square)](https://discord.gg/0ZcbPKXt5bW9FLzM) [![Donate](https://img.shields.io/badge/donate-paypal-blue.svg?style=flat-square)](https://paypal.me/javivelasco)

React Toolbox is a set of [React](http://facebook.github.io/react/) components that implement [Google's Material Design specification](https://www.google.com/design/spec/material-design/introduction.html). It's powered by [CSS Modules](https://github.com/css-modules/css-modules) and harmoniously integrates with your [webpack](http://webpack.github.io/) workflow, although you can use any other module bundler. You can take a tour through our documentation website and try the components live!

## Installation

React Toolbox can be installed as an [npm package](https://www.npmjs.org/package/react-toolbox):

```bash
$ npm install --save react-toolbox
```

## Prerequisites

React Toolbox uses [CSS Modules](https://github.com/css-modules/css-modules) by default to import stylesheets written in [SASS](http://sass-lang.com/). In case you want to import the components already bundled with CSS, your module bundler should be able to require these SASS modules.

Although we recommend [webpack](https://webpack.github.io/), you are free to use whatever module bundler you want as long as it can compile and require SASS files located in your `node_modules`. If you are experiencing require errors, make sure your configuration satisfies this requirement.

Of course this is a set of React components so you should be familiar with [React](https://facebook.github.io/react/). If want to customize your components via themes, you may want to take a look to [react-css-themr](https://github.com/javivelasco/react-css-themr) which is used by React Toolbox to make component easily themeable.

## Basic usage

In this minimal example, we import a `Button` with styles already bundled:

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'react-toolbox/lib/button';

ReactDOM.render(
  <Button label="Hello World!" />,
  document.getElementById('app')
);
```

Take into account that any required style will be included in the final CSS so your final would include `Button` styles in this case. It's more convenient to import components this way (or with raw imports) because if you require from the project root, every stylesheet of React Toolbox will be included, even if you don't use it.

## Importing components

First let's take a look on how the components are structured in the project. The [components](https://github.com/react-toolbox/react-toolbox/tree/dev/components) folder contains a folder for each component or set of related components. For example, the `app_bar`:

```
 |- /app_bar
 |---- AppBar.js
 |---- _config.scss
 |---- index.js
 |---- readme.md
 |---- theme.scss
```

As you can see in the previous block, each folder includes: a Javascript file for each component/subcomponent; a README with documentation, an index Javascript file that imports and injects styles and dependencies for you, a default theme SASS stylesheet and a configuration partial with configuration variables. Depending on whether you want the styles to be directly bundled or not, you can import components in **two** different ways.

### Bundled component

You import from the index file so the imported component comes with all dependencies and themes already required and injected for you. This means that the CSS for each dependency will be bundled in your final CSS automatically and the component markup includes the classnames to be styled. For example:

```js
import { AppBar } from 'react-toolbox/lib/app_bar';
```

### Raw component

You import from the component definition so the imported component is bundled with its dependencies but it does not require any style for you. This means that no CSS will be bundled and the component markup will **not** include any classname. It's your responsibility to provide a theme to the component to be properly style and you can do it via properties or context. For example:

```js
import { AppBar } from 'react-toolbox/lib/app_bar/AppBar.js';
```

## Customizing components

Every component accepts a `theme` property intended to provide a [CSS Module import object](https://github.com/css-modules/css-modules) that will be used by the component to assign local classnames to its DOM nodes. Therefore, each one implements a documented **classname API** so if you want to customize a component, you just need to provide a theme object with the appropriated classname  mapping.  

If the component has already a theme injected, the properties you pass will be merged with the injected. In this way, you can **add** classnames to the nodes of a specific component and use them to add or to override styles. For example, if you want to customize the `AppBar` to be purple:

```js
import React from 'react';
import { AppBar } from 'react-toolbox/lib/app_bar';
import theme from './PurpleAppBar.scss';

const PurpleAppBar = (props) => (
  <AppBar {...props} theme={theme} />
);

export default PurpleAppBar;

```

```scss
.appBar {
  background-color: #800080;
}
```

In this case we are **adding** styles to an `AppBar` component that already has some styles injected. It works because the component background by default has the same priority as the one we added. There will be cases where the original rule is more restrictive. For those cases you would need to boost priority using the same restrictions as in the original stylesheet. Feel free to take a look into the original themes or just check the selectors you want to override in DevTools.

If the component has no styles injected, you should provide a theme object implementing the full API. You are free to require the CSS Module you want but take into account that every classname is there for a reason. You can either provide a theme via prop or via context as we will see later.

## Theming

You can afford theming in multiple ways. First of all, you have to understand that React Toolbox stylesheets are written in SASS and configured using the **config** files we saw earlier. Also you may want to check [colors](https://github.com/react-toolbox/react-toolbox/blob/dev/components/_colors.scss) and [globals](https://github.com/react-toolbox/react-toolbox/blob/dev/components/_globals.scss) files to get an overview on the **variables** you have to override to get the results you want.

In most scenarios you can get more customized themes by overriding those variables and compiling stylesheets with them. For example, you can create a `_theme.scss` SASS file:

```scss
@import "~react-toolbox/lib/colors";

$color-primary: $palette-blue-500;
$color-primary-dark: $palette-blue-700;
```

This file should be prepended to each stylesheet compilation which be achieved in multiple ways.

### Using SASS Loader

If you are using  [Webpack](http://webpack.github.io/) as module bundler, you are probably using [sass-loader](https://github.com/jtangelder/sass-loader) as well. What we want to do is to prepend to each SASS file compilation a bunch of variables to override and this can be done with the `data` option. For example:

```js
sassLoader: {
  data: '@import "' + path.resolve(__dirname, 'theme/_theme.scss') + '";'
}
```

In this case we have are prepending the theme import to each SASS compilation so the primary color will be changed in every single stylesheet. If you are not using webpack maybe your loader still has a similar option, otherwise don't worry, there are solutions.

### Using SASS imports and props

Remember that you can import components without styles and provide those styles using the theme property. For example, a theme for a button customized with the previous theme file would be like:

```scss
@import "theme.scss";
@import "~react-toolbox/lib/button/theme";
```

Then, when you use a button you can inject the appropriated theme:

```js
import { Button } from 'react-toolbox/lib/button/Button';
import buttonTheme from './theme/button.scss';

const ThemedButton = (props) => (
  <Button theme={buttonTheme}  {...props} />
);

export default ThemedButton;
```

With this technique you have to create wrappers for every component and this is not cool at all... but don't worry, we can provide the theme via context to avoid this.

### Using SASS imports and context

This is a good moment to check out [react-css-themr](http://github.com/javivelasco/react-css-themr) if you still didn't. Every component in React Toolbox has a key assigned that can be used to provide a default CSS Module. You can create a theme like:

```js
export default {
  RTRipple: require('./ripple.scss'),
  RTButton: require('./button.scss')
}
```

Check for each component what key uses. Then, when you have a theme object fully imported and customized for each component your application uses, you can use it like we list here:

```js
import React from 'react';
import { render } from 'react-dom';
import { ThemeProvider } from 'react-css-themr';
import theme from './theme/theme.js';
import App from './App.js';

render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
, document.getElementById('app'))
```

A couple of things here. First you need to use raw components to get this styles properly applied. Second, you have to add dependency themes by yourself. For example, the `Button` requires `Ripple` so you have to provide styles for both of them.

## Roboto Font and Material Design Icons

React Toolbox assumes that you are importing [Roboto Font](https://www.google.com/fonts/specimen/Roboto) and [Material Design Icons](https://www.google.com/design/icons/).

In order to import the fonts for you, we'd need to include them in the CSS which is considered a bad practice. If you are not including them in your app, go to the linked sites and follow the instructions.

## Server Side Rendering

The only requirement for SSR is to be able to require ES6 and CSS Modules in the backend. To make it possible you can check projects like [CSS Modules register hook](https://github.com/css-modules/css-modules-require-hook) or [Webpack Isomorphic tools](https://github.com/halt-hammerzeit/webpack-isomorphic-tools). Also, make sure you can import from `node_modules`.

## Examples

For now we have a [repository example](https://github.com/react-toolbox/react-toolbox-example) demonstrating configuration and some basic customization. For now it's not using SSR rendering but it shouldn't be difficult to implement an example so it will come soon. Feel free to PR your example project or to add some use cases to the repository.

## TypeScript

TypeScript external module definition files are included, and should not require any manual steps to utilize. They will be picked up by the TypeScript compiler when importing from the npm package.

Note that to comply with the official recommendation for npm typings, a triple-slash reference to `react.d.ts` is *NOT included*. You will need to reference [react.d.ts](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/react/react.d.ts) somewhere in your project.

## Authors and Contributors

The project is being initially developed and maintained by [Javier Velasco](http://javivelasco.com) and [Javier Jiménez](http://soyjavi.com) and the [contribution scene](https://github.com/react-toolbox/react-toolbox/graphs/contributors) is just getting warm. We want to create reference components so any contribution is very welcome.

To work in the project you'd need a `node` version supporting ES6 syntax. Although the project is built using Babel we use some ES6 features in the development server. Also, the package has been tested with `node 4.2.1`. Consider using [nvm](https://github.com/creationix/nvm) or [n](https://github.com/tj/n) to handle different node versions!

To start the documentation site locally, you'll need to install the dependencies from both the main package and the docs subproject:

```
$ git clone https://github.com/react-toolbox/react-toolbox.git
$ npm install
$ cd docs/
$ npm install
$ npm start
```

Local documentation will then be available at `http://localhost:8081/`.

## License

This project is licensed under the terms of the [MIT license](https://github.com/react-toolbox/react-toolbox/blob/master/LICENSE).
