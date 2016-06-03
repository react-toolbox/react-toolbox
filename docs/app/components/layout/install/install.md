# Installation, usage and customization

React Toolbox is a set of [React](http://facebook.github.io/react/) components that implement [Google's Material Design specification](https://www.google.com/design/spec/material-design/introduction.html). It's powered by [CSS Modules](https://github.com/css-modules/css-modules) and harmoniously integrates with your [webpack](http://webpack.github.io/) workflow. You can take a tour through our documentation website and try the components live!

## Installation

React Toolbox can be installed as an [npm package](https://www.npmjs.org/package/react-toolbox):

```bash
npm install --save react-toolbox
```

## Prerequisites

React Toolbox uses [CSS Modules](https://github.com/css-modules/css-modules) and [SASS](http://sass-lang.com/) to provide default stylesheets. If you want to import components bundled with stylesheets, your module bundler should be able to require SASS modules. You can use whatever module bundler you want as long as it can require SASS files from `node_modules`, but we recommend [webpack](). If you are experiencing require errors, make sure your configuration satisfies the requirements.

Of course this is a set of React components so you should be familiar with [React](). If you are willing to customize your components via themes, you may want to take a look to [react-css-themr]() which is used to make styling easier.

## Basic usage

The minimal example requires a `Button` bundled with styles:

```
import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'react-toolbox/lib/button';

ReactDOM.render(
  <Button label="Hello World!" />,
  document.getElementById('app')
);
```

Take into account that any required style will be bundled in the final CSS so you probably would want to require components one by one instead of requiring directly from the root index.

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

There you can see a component definition file, a readme, an index file, a theme stylesheet and a configuration file holding the SASS variables to configure the stylesheet. Depending on whether you want the styles to be directly bundled or not, you can import components in two different ways:

- **Bundled component**: the component requires the corresponding `theme.scss` for you so it will be included in the final bundle. Also, the local classnames will be injected in the component automatically. To import a bundled component you have to require from the `index.js` file. For example: `import {AppBar} from 'react-toolbox/lib/app_bar'`.

- **Raw component**: the component is required alone, without any CSS. In this case you are responsible from providing a theme. To import a raw component you have to require directly from the component definition. For example: `import AppBar from 'react-toolbox/lib/app_bar/AppBar'`.

## Customization

Since you can import raw components and then inject a theme via props or context, you can use whatever you want to provide styles. We give you some SASS stylesheets but you can configure them at import time or even port them to CSS Next or whatever. Furthermore, you can provide extra theming classes that will be mixed in the component so you can even target DOM elements in subcomponents from a parent. Let's see some examples.

### Customization via SASS Loader

Every component in React Toolbox has a `_config.scss` partial and [some parent partials](https://github.com/react-toolbox/react-toolbox/tree/dev/components) defining configuration variables that are used in each `theme.scss`. Since all variables are defined as `!default`, you can prepend variable overrides with a custom `theme.scss` file to each SASS stylesheet required in the project.

If you are importing bundled components, you can use something like [sass-loader](https://github.com/jtangelder/sass-loader) to prepend your custom configuration files to every sass stylesheet by using the `data` option. For example, in your webpack config:

```js
sassLoader: {
  data: '@import "' + path.resolve(__dirname, 'theme/_theme.scss') + '";'
}
```

### Customization via Theme Property

Every component in React Toolbox have a **classname API** that can be browsed from the documentation. Also, they accept a `theme` property intended to provide a [CSS Module import object](https://github.com/css-modules/css-modules) that will be used by the component to assign local classnames to its DOM nodes.

React Toolbox uses [react-css-themr](github.com/javivelasco/react-css-themr) to make theming easier. Feel free to take a look to the documentation to learn how you can use themes for the components. For example, imagine you want to create a green success button whose icons are red:

```
// SuccessButton.js
import { Button } from 'react-toolbox/lib/button';
import successTheme from './success-theme.scss';

const SuccessButton = (props) => (
  <Button theme={successButtonTheme} {...props} />
);

export default SuccessButton;
```

```
// success-theme.scss
.primary {
  background: green;
}

.icon {
  color: red
}
```

The given classes will be added to the component and, since they are defined *after* the original CSS they would take priority. Note that you can also boost priority by assigning a `className`. Check more examples at [react-css-themr](www.github.com/javivelasco/react-css-themr) documentation.

### Customization via Theme Context

Alternatively, you can provide CSS Modules object to React Toolbox components using context. This is useful in case you want to create a custom theme without creating wrappers for each raw component. To use this customization you need to install react-css-themr and then use the **theme keys** specified in each component documentation. For example:

```
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'react-css-themr';
import Button from 'react-toolbox/lib/button/Button';
import App from './App.js';

const theme = {
  RTButton: require('./theme/button-style')
};

const ThemedApp = (children) => (
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
)

ReactDOM.render(<ThemedApp />, document.getElementById('app'));
```

## Roboto Font and Material Design Icons

React Toolbox assumes that you are importing [Roboto Font](https://www.google.com/fonts/specimen/Roboto) and [Material Design Icons](https://www.google.com/design/icons/).

In order to import the fonts for you, we'd need to include them in the CSS which is considered a bad practice. If you are not including them in your app, go to the linked sites and follow the instructions.
