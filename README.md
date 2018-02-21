# <a href='http://react-toolbox.io'><img src='http://i.imgur.com/VCSElQX.png' height='50'></a>

[![npm version](https://img.shields.io/npm/v/react-toolbox.svg?style=flat-square)](https://www.npmjs.com/package/react-toolbox) [![Build Status](http://img.shields.io/travis/react-toolbox/react-toolbox/master.svg?style=flat-square)](https://travis-ci.org/react-toolbox/react-toolbox) [![NPM Status](http://img.shields.io/npm/dm/react-toolbox.svg?style=flat-square)](https://www.npmjs.org/package/react-toolbox) [![Donate](https://img.shields.io/badge/donate-paypal-blue.svg?style=flat-square)](https://paypal.me/javivelasco) [![OpenCollective](https://opencollective.com/react-toolbox/backers/badge.svg)](#backers) 
[![OpenCollective](https://opencollective.com/react-toolbox/sponsors/badge.svg)](#sponsors)

React Toolbox is a set of [React](http://facebook.github.io/react/) components that implement [Google's Material Design specification](https://material.google.com/). It's powered by [CSS Modules](https://github.com/css-modules/css-modules) and harmoniously integrates with your [webpack](http://webpack.github.io/) workflow, although you can use any other module bundler. You can take a tour through our documentation website and try the components live!

**Note:**  ⚠️ This source code refers to the [future version](https://github.com/react-toolbox/react-toolbox/blob/dev/ROADMAP.md). To check the source for `1.x` go to `master` branch. There is a [migration guide](https://github.com/react-toolbox/react-toolbox/wiki/Migrating-from-version-1.3-to-2.0) so you can start working with 2.0-beta.x now!

## Installation

React Toolbox can be installed as an [npm package](https://www.npmjs.org/package/react-toolbox):

```bash
$ npm install --save react-toolbox
```

## Prerequisites

React Toolbox uses [CSS Modules](https://github.com/css-modules/css-modules) by default to import stylesheets written using PostCSS/[cssnext](http://cssnext.io/) features. In case you want to import the components already bundled with CSS, your module bundler should be able to require these PostCSS modules.

Although we recommend [webpack](https://webpack.github.io/), you are free to use whatever module bundler you want as long as it can compile and require PostCSS files located in your `node_modules`. If you are experiencing require errors, make sure your configuration satisfies this requirement.

Of course this is a set of React components so you should be familiar with [React](https://facebook.github.io/react/). If want to customize your components via themes, you may want to take a look to [react-css-themr](https://github.com/javivelasco/react-css-themr) which is used by React Toolbox to make components easily themeable.

### Usage in Create React App Projects

[Create React App](https://github.com/facebookincubator/create-react-app) does not allow to change the default configuration, so you need an additional build step to configure `react-toolbox` in its project.

Follow [these instructions](https://github.com/react-toolbox/react-toolbox-themr) to add `react-toolbox` to a project created with Create React App.

### Usage in Webpack Projects (*Not* Create React App)

```bash
npm install postcss-loader --save-dev
npm install postcss --save
npm install postcss-cssnext --save
```

Configure webpack 1.x loader for .css files to use postcss:
```js
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss?sourceMap&sourceComments',
        ],
      },
```
Declare plugins to be used by postcss (as part of webpack's config object):
```js
  postcss: () => {
    return [
      /* eslint-disable global-require */
      require('postcss-cssnext'),
      /* eslint-enable global-require */
    ];
  },
```

Configure webpack 2.x or 3.x loader for .css files to use postcss:
```js
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true, // default is false
              sourceMap: true,
              importLoaders: 1,
              localIdentName: "[name]--[local]--[hash:base64:8]"
            }
          },
          "postcss-loader"
        ]
      }
```

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

>**Note:** if you use it with Create React App, you need to make this additional change:
>
>```diff
>- import {Button} from 'react-toolbox/lib/button';
>+ import Button from 'react-toolbox/lib/button/Button';
>```

Take into account that any required style will be included in the final CSS so your final CSS would include `Button` styles in this case. It's more efficient to import components this way (`from 'react-toolbox/lib/button'`) (or with raw imports) because if you require from the project root (i.e. `from 'react-toolbox'`), every stylesheet of React Toolbox will be included, even if you don't use it.

## Importing components

First let's take a look on how the components are structured in the project. The [components](https://github.com/react-toolbox/react-toolbox/tree/dev/components) folder contains a folder for each component or set of related components. For example, the `app_bar`:

```
 |- /app_bar
 |---- AppBar.js
 |---- config.css
 |---- index.js
 |---- readme.md
 |---- theme.css
```

As you can see in the previous block, each folder includes: a Javascript file for each component/subcomponent; a README with documentation, an index Javascript file that imports and injects styles and dependencies for you, a default theme PostCSS/cssnext stylesheet and a config.css with configuration variables (CSS Custom Properties). Depending on whether you want the styles to be directly bundled or not, you can import components in **two** different ways.

### Bundled component

If you import from the index file, the imported component comes with all dependencies and themes already required and injected for you. This means that the CSS for each dependency will be bundled in your final CSS automatically and the component markup includes the classnames to be styled. For example:

```js
import { AppBar } from 'react-toolbox/lib/app_bar';
```

### Raw component

If you import from the component definition, the imported component is bundled with its dependencies, but it does not include any styles. This means no CSS will be bundled, and the component markup will **not** include any classname. It's your responsibility to provide a theme to the component to be properly styled. You can do so via properties or context. For example:

```js
import { AppBar } from 'react-toolbox/lib/app_bar/AppBar.js';
```

## Customizing components

Every component accepts a `theme` property intended to provide a [CSS Module import object](https://github.com/css-modules/css-modules) that will be used by the component to assign local classnames to its DOM nodes. Therefore, each one implements a documented **classname API**. So if you want to customize a component, you just need to provide a theme object with the appropriate classname mapping.  

If the component already has a theme injected, the properties you pass will be merged with the injected theme. In this way, you can **add** classnames to the nodes of a specific component and use them to add or to override styles. For example, if you want to customize the `AppBar` to be purple:

```js
import React from 'react';
import { AppBar } from 'react-toolbox/lib/app_bar';
import theme from './PurpleAppBar.css';

const PurpleAppBar = (props) => (
  <AppBar {...props} theme={theme} />
);

export default PurpleAppBar;

```

```css
.appBar {
  background-color: #800080;
}
```

In this case we are **adding** styles to a specific instance of an `AppBar` component that already has its default styles injected. It works because the component background by default has the same priority as the one we added. There will be cases where the original rule is more restrictive. For those cases you would need to boost priority using the same restrictions as in the original stylesheet. Feel free to take a look into the default theme.css files or just check the selectors you want to override in DevTools.

If the component has no styles injected, you should provide a theme object implementing the full API. You are free to require the CSS Module you want but take into account that every classname is there for a reason. You can either provide a theme via prop or via context as described in the next section.

### Customizing all instances of a component type

Install [react-css-themr](https://github.com/javivelasco/react-css-themr) with `npm install react-css-themr --save`

Create a CSS Module theme style file for each component type, for example for `Button`:

```css
# /css/button.css

.button {
  text-transform: uppercase;
}
```

Create a theme file that imports each component's custom theme style under the special theme key listed in that widgets's documentation, i.e.:

```js
# theme.js

import RTButton from './css/button.css';
import RTDatePicker from './css/datepicker.css';

export default {
  RTButton, RTDatePicker,
};
```

Wrap your component tree with ThemeProvider at the desired level in your component hierarchy. You can maintain different themes, each importing differently styled css files \(i.e. `import RTButton from './css/adminAreaButton.css'`\) and can provide each one at different points in the tree.

```js
import React from 'react';
import { ThemeProvider } from 'react-css-themr';
import theme from './theme';

class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <div>
          ...
        </div>
      </ThemeProvider>
    );
  }
}
export default App;
```

## Theming (configuration variables)

You can apply theming in multiple ways. First of all, you have to understand that React Toolbox stylesheets are written using PostCSS with cssnext features and use CSS Custom Properties from the **config** files we saw earlier. In addition, there are some global CSS Properties imported by each component: [colors](https://github.com/react-toolbox/react-toolbox/blob/dev/components/colors.css) and [variables](https://github.com/react-toolbox/react-toolbox/blob/dev/components/variables.css). You can override both the global and component-specific **variables** to get the results you want using one of the methods below.

### Settings configuration variables in JavaScript

You can override both the global and component-specific CSS Custom Properties at build-time by supplying an object with these variable names and your desired values to the PostCSS customProperties plugin. i.e. if using postcss-next in webpack:

```js

// This can also be stored in a separate file:
const reactToolboxVariables = { 
  'color-text': '#444548',
  /* Note that you can use global colors and variables */
  'color-primary': 'var(--palette-blue-500)',
  'button-height': '30px',
};

// webpack's config object:
const config = {
...
    postcss: () => {
    return [
      /* eslint-disable global-require */
      require('postcss-cssnext')({
        features: {
          customProperties: {
            variables: reactToolboxVariables,
          },
        },
      }),
      /* optional - see next section */
      require('postcss-modules-values'),
      /* eslint-enable global-require */
    ];
  },
}

```

### Settings configuration variables using CSS Module Values

Instead of using a JavaScript object for variables, you can use [CSS Module Values](https://github.com/css-modules/css-modules/blob/master/docs/values-variables.md) (`npm install postcss-modules-values --save`) and the [modules-values-extract](https://github.com/alexhisen/modules-values-extract) utility to declare these variables in component-specific theme .css files, where you would typically store additional style overrides.

CSS Module Values also offer the advantage that importing a css file with @value declarations makes these values properties of the imported style object, i.e.:

```css
# variables.css

@value buttonPrimaryBackgroundColor: #9c3990;
```

```js
import styleVariables from './css/variables.css';

styleVariables.buttonPrimaryBackgroundColor
```

In [this demo project](https://github.com/alexhisen/mobx-forms-demo), modules-values-extract utility is used to extract all @values with dashes in their name from all css files in the /css folder and to feed them to customProperties in [webpack](https://github.com/alexhisen/mobx-forms-demo/blob/master/webpack.config.js). In the demo project, variables that are not specific to a particular component are in [variables.css](https://github.com/alexhisen/mobx-forms-demo/blob/master/src/css/variables.css) and button-specific variables are in [button.css](https://github.com/alexhisen/mobx-forms-demo/blob/master/src/css/button.css). Note that button.css also imports certain values from variables.css just to demonstrate this capability \(the import can also be used in a @value declaration\) and it uses CSS overrides instead of color variables that exist in the React-Toolbox Button component to show an alternative method if the variables are not sufficient.

> **IMPORTANT: Changes to the module values do not take effect immediately with Webpack Hot-Module-Reload - webpack / webpack-dev-server must be restarted!**

## Roboto Font and Material Design Icons

React Toolbox assumes that you are importing [Roboto Font](https://fonts.google.com/specimen/Roboto) and [Material Design Icons](https://material.io/icons/).

In order to import the fonts for you, we'd need to include them in the CSS which is considered a bad practice. If you are not including them in your app, go to the linked sites and follow the instructions.

## Server Side Rendering

The only requirement for SSR is to be able to require ES6 and CSS Modules in the backend. To make it possible you can check projects like [CSS Modules register hook](https://github.com/css-modules/css-modules-require-hook) or [Webpack Isomorphic tools](https://github.com/halt-hammerzeit/webpack-isomorphic-tools). Also, make sure you can import from `node_modules`.

## Examples

For now we have a [repository example](https://github.com/react-toolbox/react-toolbox-example) demonstrating configuration and some basic customization. For now it's not using SSR rendering but it shouldn't be difficult to implement an example so it will come soon. Feel free to PR your example project or to add some use cases to the repository:

Another 2.x demo project is https://github.com/alexhisen/mobx-forms-demo

## TypeScript

TypeScript external module definition files are included, and should not require any manual steps to utilize. They will be picked up by the TypeScript compiler when importing from the npm package.

Note that to comply with the official recommendation for npm typings, a triple-slash reference to `react.d.ts` is *NOT included*. You will need to reference [react.d.ts](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/react/react.d.ts) somewhere in your project.

## Authors and Contributors

The project is being initially developed and maintained by [Javier Velasco](http://javivelasco.com) and [Javier Jiménez](http://soyjavi.com) and the [contribution scene](https://github.com/react-toolbox/react-toolbox/graphs/contributors) is just getting warm. We want to create reference components so any contribution is very welcome.

To work in the project you'd need a `node` version supporting ES6 syntax. Although the project is built using Babel we use some ES6 features in the development server. Also, the package has been tested with `node 4.2.1`. Consider using [nvm](https://github.com/creationix/nvm) or [n](https://github.com/tj/n) to handle different node versions!

To start the documentation site locally, you'll need to install the dependencies from both the main package and the docs subproject:

```
$ git clone https://github.com/react-toolbox/react-toolbox.git
$ cd react-toolbox/
$ npm install
$ cd docs/
$ npm install
$ npm start
```

Local documentation will then be available at `http://localhost:8081/`.

## Extensions

We don't officially support components that are not covered by [Google Material Design](https://www.google.com/design/spec/material-design/introduction.html). If you want to implement some complementary component feel free to open a PR adding your a link in this section:

[on github: react-toolbox-additions](https://github.com/MaximKomlev/react-toolbox-additions) and [on npm: react-toolbox-additions](https://www.npmjs.com/package/react-toolbox-additions).

Form generation and validation using React-Toolbox form widgets - [mobx-schema-form](https://github.com/alexhisen/mobx-schema-form)

## Support

### Backers
Support us with a monthly donation and help us continue our activities. [[Become a backer](https://opencollective.com/react-toolbox#backer)]

<a href="https://opencollective.com/react-toolbox/backer/0/website" target="_blank"><img src="https://opencollective.com/react-toolbox/backer/0/avatar.svg"></a>
<a href="https://opencollective.com/react-toolbox/backer/1/website" target="_blank"><img src="https://opencollective.com/react-toolbox/backer/1/avatar.svg"></a>
<a href="https://opencollective.com/react-toolbox/backer/2/website" target="_blank"><img src="https://opencollective.com/react-toolbox/backer/2/avatar.svg"></a>
<a href="https://opencollective.com/react-toolbox/backer/3/website" target="_blank"><img src="https://opencollective.com/react-toolbox/backer/3/avatar.svg"></a>
<a href="https://opencollective.com/react-toolbox/backer/4/website" target="_blank"><img src="https://opencollective.com/react-toolbox/backer/4/avatar.svg"></a>
<a href="https://opencollective.com/react-toolbox/backer/5/website" target="_blank"><img src="https://opencollective.com/react-toolbox/backer/5/avatar.svg"></a>
<a href="https://opencollective.com/react-toolbox/backer/6/website" target="_blank"><img src="https://opencollective.com/react-toolbox/backer/6/avatar.svg"></a>
<a href="https://opencollective.com/react-toolbox/backer/7/website" target="_blank"><img src="https://opencollective.com/react-toolbox/backer/7/avatar.svg"></a>
<a href="https://opencollective.com/react-toolbox/backer/8/website" target="_blank"><img src="https://opencollective.com/react-toolbox/backer/8/avatar.svg"></a>
<a href="https://opencollective.com/react-toolbox/backer/9/website" target="_blank"><img src="https://opencollective.com/react-toolbox/backer/9/avatar.svg"></a>
<a href="https://opencollective.com/react-toolbox/backer/10/website" target="_blank"><img src="https://opencollective.com/react-toolbox/backer/10/avatar.svg"></a>
<a href="https://opencollective.com/react-toolbox/backer/11/website" target="_blank"><img src="https://opencollective.com/react-toolbox/backer/11/avatar.svg"></a>
<a href="https://opencollective.com/react-toolbox/backer/12/website" target="_blank"><img src="https://opencollective.com/react-toolbox/backer/12/avatar.svg"></a>
<a href="https://opencollective.com/react-toolbox/backer/13/website" target="_blank"><img src="https://opencollective.com/react-toolbox/backer/13/avatar.svg"></a>
<a href="https://opencollective.com/react-toolbox/backer/14/website" target="_blank"><img src="https://opencollective.com/react-toolbox/backer/14/avatar.svg"></a>
<a href="https://opencollective.com/react-toolbox/backer/15/website" target="_blank"><img src="https://opencollective.com/react-toolbox/backer/15/avatar.svg"></a>
<a href="https://opencollective.com/react-toolbox/backer/16/website" target="_blank"><img src="https://opencollective.com/react-toolbox/backer/16/avatar.svg"></a>
<a href="https://opencollective.com/react-toolbox/backer/17/website" target="_blank"><img src="https://opencollective.com/react-toolbox/backer/17/avatar.svg"></a>
<a href="https://opencollective.com/react-toolbox/backer/18/website" target="_blank"><img src="https://opencollective.com/react-toolbox/backer/18/avatar.svg"></a>
<a href="https://opencollective.com/react-toolbox/backer/19/website" target="_blank"><img src="https://opencollective.com/react-toolbox/backer/19/avatar.svg"></a>
<a href="https://opencollective.com/react-toolbox/backer/20/website" target="_blank"><img src="https://opencollective.com/react-toolbox/backer/20/avatar.svg"></a>
<a href="https://opencollective.com/react-toolbox/backer/21/website" target="_blank"><img src="https://opencollective.com/react-toolbox/backer/21/avatar.svg"></a>
<a href="https://opencollective.com/react-toolbox/backer/22/website" target="_blank"><img src="https://opencollective.com/react-toolbox/backer/22/avatar.svg"></a>
<a href="https://opencollective.com/react-toolbox/backer/23/website" target="_blank"><img src="https://opencollective.com/react-toolbox/backer/23/avatar.svg"></a>
<a href="https://opencollective.com/react-toolbox/backer/24/website" target="_blank"><img src="https://opencollective.com/react-toolbox/backer/24/avatar.svg"></a>
<a href="https://opencollective.com/react-toolbox/backer/25/website" target="_blank"><img src="https://opencollective.com/react-toolbox/backer/25/avatar.svg"></a>
<a href="https://opencollective.com/react-toolbox/backer/26/website" target="_blank"><img src="https://opencollective.com/react-toolbox/backer/26/avatar.svg"></a>
<a href="https://opencollective.com/react-toolbox/backer/27/website" target="_blank"><img src="https://opencollective.com/react-toolbox/backer/27/avatar.svg"></a>
<a href="https://opencollective.com/react-toolbox/backer/28/website" target="_blank"><img src="https://opencollective.com/react-toolbox/backer/28/avatar.svg"></a>
<a href="https://opencollective.com/react-toolbox/backer/29/website" target="_blank"><img src="https://opencollective.com/react-toolbox/backer/29/avatar.svg"></a>


### Sponsors
Become a sponsor and get your logo on our README on Github with a link to your site. [[Become a sponsor](https://opencollective.com/react-toolbox#sponsor)]

<a href="https://opencollective.com/react-toolbox/sponsor/0/website" target="_blank"><img src="https://opencollective.com/react-toolbox/sponsor/0/avatar.svg"></a>
<a href="https://opencollective.com/react-toolbox/sponsor/1/website" target="_blank"><img src="https://opencollective.com/react-toolbox/sponsor/1/avatar.svg"></a>
<a href="https://opencollective.com/react-toolbox/sponsor/2/website" target="_blank"><img src="https://opencollective.com/react-toolbox/sponsor/2/avatar.svg"></a>
<a href="https://opencollective.com/react-toolbox/sponsor/3/website" target="_blank"><img src="https://opencollective.com/react-toolbox/sponsor/3/avatar.svg"></a>
<a href="https://opencollective.com/react-toolbox/sponsor/4/website" target="_blank"><img src="https://opencollective.com/react-toolbox/sponsor/4/avatar.svg"></a>
<a href="https://opencollective.com/react-toolbox/sponsor/5/website" target="_blank"><img src="https://opencollective.com/react-toolbox/sponsor/5/avatar.svg"></a>
<a href="https://opencollective.com/react-toolbox/sponsor/6/website" target="_blank"><img src="https://opencollective.com/react-toolbox/sponsor/6/avatar.svg"></a>
<a href="https://opencollective.com/react-toolbox/sponsor/7/website" target="_blank"><img src="https://opencollective.com/react-toolbox/sponsor/7/avatar.svg"></a>
<a href="https://opencollective.com/react-toolbox/sponsor/8/website" target="_blank"><img src="https://opencollective.com/react-toolbox/sponsor/8/avatar.svg"></a>
<a href="https://opencollective.com/react-toolbox/sponsor/9/website" target="_blank"><img src="https://opencollective.com/react-toolbox/sponsor/9/avatar.svg"></a>
<a href="https://opencollective.com/react-toolbox/sponsor/10/website" target="_blank"><img src="https://opencollective.com/react-toolbox/sponsor/10/avatar.svg"></a>
<a href="https://opencollective.com/react-toolbox/sponsor/11/website" target="_blank"><img src="https://opencollective.com/react-toolbox/sponsor/11/avatar.svg"></a>
<a href="https://opencollective.com/react-toolbox/sponsor/12/website" target="_blank"><img src="https://opencollective.com/react-toolbox/sponsor/12/avatar.svg"></a>
<a href="https://opencollective.com/react-toolbox/sponsor/13/website" target="_blank"><img src="https://opencollective.com/react-toolbox/sponsor/13/avatar.svg"></a>
<a href="https://opencollective.com/react-toolbox/sponsor/14/website" target="_blank"><img src="https://opencollective.com/react-toolbox/sponsor/14/avatar.svg"></a>
<a href="https://opencollective.com/react-toolbox/sponsor/15/website" target="_blank"><img src="https://opencollective.com/react-toolbox/sponsor/15/avatar.svg"></a>
<a href="https://opencollective.com/react-toolbox/sponsor/16/website" target="_blank"><img src="https://opencollective.com/react-toolbox/sponsor/16/avatar.svg"></a>
<a href="https://opencollective.com/react-toolbox/sponsor/17/website" target="_blank"><img src="https://opencollective.com/react-toolbox/sponsor/17/avatar.svg"></a>
<a href="https://opencollective.com/react-toolbox/sponsor/18/website" target="_blank"><img src="https://opencollective.com/react-toolbox/sponsor/18/avatar.svg"></a>
<a href="https://opencollective.com/react-toolbox/sponsor/19/website" target="_blank"><img src="https://opencollective.com/react-toolbox/sponsor/19/avatar.svg"></a>
<a href="https://opencollective.com/react-toolbox/sponsor/20/website" target="_blank"><img src="https://opencollective.com/react-toolbox/sponsor/20/avatar.svg"></a>
<a href="https://opencollective.com/react-toolbox/sponsor/21/website" target="_blank"><img src="https://opencollective.com/react-toolbox/sponsor/21/avatar.svg"></a>
<a href="https://opencollective.com/react-toolbox/sponsor/22/website" target="_blank"><img src="https://opencollective.com/react-toolbox/sponsor/22/avatar.svg"></a>
<a href="https://opencollective.com/react-toolbox/sponsor/23/website" target="_blank"><img src="https://opencollective.com/react-toolbox/sponsor/23/avatar.svg"></a>
<a href="https://opencollective.com/react-toolbox/sponsor/24/website" target="_blank"><img src="https://opencollective.com/react-toolbox/sponsor/24/avatar.svg"></a>
<a href="https://opencollective.com/react-toolbox/sponsor/25/website" target="_blank"><img src="https://opencollective.com/react-toolbox/sponsor/25/avatar.svg"></a>
<a href="https://opencollective.com/react-toolbox/sponsor/26/website" target="_blank"><img src="https://opencollective.com/react-toolbox/sponsor/26/avatar.svg"></a>
<a href="https://opencollective.com/react-toolbox/sponsor/27/website" target="_blank"><img src="https://opencollective.com/react-toolbox/sponsor/27/avatar.svg"></a>
<a href="https://opencollective.com/react-toolbox/sponsor/28/website" target="_blank"><img src="https://opencollective.com/react-toolbox/sponsor/28/avatar.svg"></a>
<a href="https://opencollective.com/react-toolbox/sponsor/29/website" target="_blank"><img src="https://opencollective.com/react-toolbox/sponsor/29/avatar.svg"></a>

## License

This project is licensed under the terms of the [MIT license](https://github.com/react-toolbox/react-toolbox/blob/master/LICENSE).
