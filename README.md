#[React-Toolbox](http://)

[![Build Status](https://travis-ci.org/react-toolbox/react-toolbox.svg?branch=master)](https://travis-ci.org/react-toolbox/react-toolbox) 
[![Gitter](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/soyjavi/react-toolbox?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

*Current version: [0.7.29]()*

React Toolbox is a set of [React](http://facebook.github.io/react/) components that implement [Google's Material Design specification](https://www.google.com/design/spec/material-design/introduction.html). It's powered by [CSS Modules](https://github.com/css-modules/css-modules) and integrates harmfully with your [Webpack](http://webpack.github.io/) workflow. You can take a tour through our documentation website and try the components live!

## Installation

React Toolbox can be installed as an [npm package](https://www.npmjs.org/package/material-ui);

```
npm install --save react-toolbox
```

## Usage

Although there are other ways to use React Toolbox, the recommended way is to create a Webpack workflow with [Babel Loader](https://github.com/babel/babel-loader), [CSS Loader](https://github.com/webpack/css-loader) and [SASS Loader](https://github.com/jtangelder/sass-loader). A good starting point is [React Hot Webpack Boilerplate](https://github.com/gaearon/react-hot-boilerplate).

Once you have the workflow ready, you can just require and use the components:

```jsx
import React from 'react';
import Button from 'react-toolbox/button';

const CustomButton = () => (
  <Button label="Hello world" kind="raised" accent />
);

export default CustomButton;
```

The previous code creates a React button component based on React toolbox button. It's important to notice that requiring a module from the exposed root of the package will try to import the **ES6 JSX** and **SASS** of the component. If you want to still use CSS Modules but avoiding [Babel](https://babeljs.io/) and [SASS](http://sass-lang.com/) you will need to require from `react-toolbox/lib`.

We encourage you to work with webpack but if you want to use React Toolbox in an old fashioned way you must generate a build with all the css and javascript and include it in your `index.html`. Then you can use the components exposed in the `window` object.

## Customization

Since React Toolbox styles are written in CSS it's pretty easy to customize your components. We have several ways:

### Via React Toolbox Loader (coming soon)

Thanks to the power of SASS, all components in React Toolbox are configured from a variables file. The best way to customize your build is to create a custom configuration SASS file with the variables you want to modify during the build process.

With `react-toolbox-loader` so you can tell webpack where your configuration file is. It will prepend your configuration to each build belonging to RT components resulting in your customized CSS. More on this soon.

### Via `className` property

Generally each component will have a `className` prop so you can tell the class name you want to keep in the root node of the resulting markup. All markup is style with the lowest specificity level so you can just nest one level in your CSS and the result will be applied. Consider this example:

```jsx
const CustomButton = () => (
  <Button className='customized' label='Custom button' />
);
```

If you browse the resulting markup you will see *data attributes* like `data-role="label"` so you can avoid styling directly tag names. You can now write your CSS:

```css
.customized > [data-role="label"] {
  color: green;
  font-weight: bold;
}
```

## Authors and Contributors

The project is being initially developed and maintained by [Javier Velasco](http://javivelasco.com) and [Javier Jiménez](http://soyjavi.com) and the [contribution](https://github.com/react-toolbox/react-toolbox/graphs/contributors) is just getting warm.

We want to create reference components so any contribution is very welcome.

## License 
This project is licensed under the terms of the [MIT license](https://github.com/react-toolbox/react-toolbox/blob/master/LICENSE).
