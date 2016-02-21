# React Toolbox

[![npm version](https://img.shields.io/npm/v/react-toolbox.svg?style=flat-square)](https://www.npmjs.com/package/react-toolbox)
[![Build Status](http://img.shields.io/travis/react-toolbox/react-toolbox/master.svg?style=flat-square)](https://travis-ci.org/react-toolbox/react-toolbox)
[![NPM Status](http://img.shields.io/npm/dm/react-toolbox.svg?style=flat-square)](https://www.npmjs.org/package/react-toolbox)
[![react-toolbox channel on discord](https://img.shields.io/badge/discord-%23react--toolbox%20%40%20reactiflux-61dafb.svg?style=flat-square)](https://discord.gg/0ZcbPKXt5bW9FLzM)
[![Donate](https://img.shields.io/badge/donate-paypal-blue.svg?style=flat-square)](https://paypal.me/javivelasco)

React Toolbox is a set of [React](http://facebook.github.io/react/) components that implement [Google's Material Design specification](https://www.google.com/design/spec/material-design/introduction.html). It's powered by [CSS Modules](https://github.com/css-modules/css-modules) and harmoniously integrates with your [webpack](http://webpack.github.io/) workflow. You can take a tour through our documentation website and try the components live!

## Installation

React Toolbox can be installed as an [npm package](https://www.npmjs.org/package/react-toolbox):

```
npm install --save react-toolbox
```

## Usage

Although there are other ways to use React Toolbox, the recommended way is to create a webpack workflow with [babel-loader](https://github.com/babel/babel-loader), [css-loader](https://github.com/webpack/css-loader) and [sass-loader](https://github.com/jtangelder/sass-loader). A good starting point is [React Hot Webpack Boilerplate](https://github.com/gaearon/react-hot-boilerplate).

Once you have the workflow ready, you can just require and use the components:

```jsx
import React from 'react';
import Button from 'react-toolbox/lib/button';

const CustomButton = () => (
  <Button label="Hello world" raised accent />
);

export default CustomButton;
```

The previous code creates a React button component based on React Toolbox button. It's important to notice that requiring a module from the exposed root of the package will also import the **SASS** of the component.

## Roboto Font and Material Design Icons

React Toolbox assumes that you are importing [Roboto Font](https://www.google.com/fonts/specimen/Roboto) and [Material Design Icons](https://www.google.com/design/icons/).

In order to import the fonts for you, we'd need to include them in the CSS which is considered a bad practice. If you are not including them in your app, go to the linked sites and follow the instructions. 

## App component

There are some components in React Toolbox that require special positioning. For example, `Dialog` and `Drawer` components block the scroll showing a fixed positioned overlay. To handle these cases, React Toolbox needs some styling in your root node. This can be achieved by wrapping your app with a non intrusive `App` wrapper component:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import ToolboxApp from 'react-toolbox/lib/app';
import App from './my-app';

ReactDOM.render(
  <ToolboxApp>
    <App />
  </ToolboxApp>
, document.getElementById('app'));

```

## Customization

Since React Toolbox styles are written in CSS, it's pretty easy to customize your components. We have several ways:

### Via React Toolbox Loader

Thanks to the power of SASS, all components in React Toolbox are configured from a variables file. The best way to customize your build is to create a custom configuration SASS file overriding configuration variables like colors or sizes.

With [toolbox-loader](https://github.com/react-toolbox/toolbox-loader) you can tell webpack where your configuration file is and it will prepend your config to each SASS build. This will result in your customized CSS for React Toolbox Components. For now you can browse the configuration files and override what you want. 

### Via `className` property

Generally each component will have a `className` prop so you can pass the class name you want to keep in the root node of the resulting markup. All markup is styled with the lowest specificity level so you can just nest one level in your CSS and the result will be applied. Consider this example:

```jsx
const CustomButton = () => (
  <Button className='customized' label='Custom button' />
);
```

If you browse the resulting markup you will see *data attributes* like `data-react-toolbox="label"` so you can avoid directly styling tag names. You can now write your CSS:

```css
.customized > [data-react-toolbox="label"] {
  color: green;
  font-weight: bold;
}
```

## TypeScript

A TypeScript definition file `react-toolbox.d.ts` is available. It is referenced in `package.json` and should be picked up by the TypeScript compiler when importing from the npm package.

Note that to comply with the typings requirement, a triple-slash reference to `react.d.ts` is *NOT included*. You will need to reference [react.d.ts](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/react/react.d.ts) somewhere in your project.

## Authors and Contributors

The project is being initially developed and maintained by [Javier Velasco](http://javivelasco.com) and [Javier Jiménez](http://soyjavi.com) and the [contribution scene](https://github.com/react-toolbox/react-toolbox/graphs/contributors) is just getting warm. We want to create reference components so any contribution is very welcome.

To work in the project you'd need a `node` version supporting ES6 syntax. Although the project is built using Babel we use some ES6 features in the development server. Also, the package has been tested with `node 4.2.1`. Consider using [nvm](https://github.com/creationix/nvm) or [n](https://github.com/tj/n) to handle different node versions!

To start the documentation site locally, you'll need to install the dependencies from both the main package and the docs subproject:

```
git clone https://github.com/react-toolbox/react-toolbox.git
npm install
cd docs/
npm install 
npm start
```

Local documentation will then be available at `http://localhost:8081/`.

## License

This project is licensed under the terms of the [MIT license](https://github.com/react-toolbox/react-toolbox/blob/master/LICENSE).
