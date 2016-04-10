# Installation, usage and customization

React Toolbox is a set of [React](http://facebook.github.io/react/) components that implement [Google's Material Design specification](https://www.google.com/design/spec/material-design/introduction.html). It's powered by [CSS Modules](https://github.com/css-modules/css-modules) and harmoniously integrates with your [Webpack](http://webpack.github.io/) workflow. You can take a tour through our documentation website and try the components live!

## Installation

React Toolbox can be installed as an [npm package](https://www.npmjs.org/package/react-toolbox);

```
npm install --save react-toolbox
```

## Usage

Although there are other ways to use React Toolbox, the recommended way is to create a Webpack workflow with [Babel Loader](https://github.com/babel/babel-loader), [CSS Loader](https://github.com/webpack/css-loader) and [SASS Loader](https://github.com/jtangelder/sass-loader). A good starting point is [React Hot Webpack Boilerplate](https://github.com/gaearon/react-hot-boilerplate).

Once you have the workflow ready, you can just require and use the components:

```jsx
import React from 'react';
import Button from 'react-toolbox/lib/button';

const CustomButton = () => (
  <Button label="Hello world" raised accent />
);

export default CustomButton;
```

The previous code creates a React button component based on React toolbox button. It's important to notice that requiring a module from the exposed root of the package will import the **SASS** of the component.

## Roboto Font and Material Design Icons

React Toolbox assumes that you are importing [Roboto Font](https://www.google.com/fonts/specimen/Roboto) and [Material Design Icons](https://www.google.com/design/icons/).

In order to import the fonts for you, we'd need to include them in the CSS which is considered a bad practice. If you are not including them in your app to the linked sites and follow the instructions.

## Customization

Since React Toolbox styles are written in CSS it's pretty easy to customize your components. We have several ways:

### Via React Toolbox Loader

Thanks to the power of SASS, all components in React Toolbox are configured from a variables file. The best way to customize your build is to create a custom configuration SASS file overriding configuration variables like colors or sizes.

With [toolbox-loader](https://github.com/react-toolbox/toolbox-loader) you can tell webpack where your configuration file is and it will prepend your config to each SASS build. This will result in your customized CSS for React Toolbox Components. For now you can browse the configuration files and override what you want.

### Via `className` property

Generally each component will have a `className` prop so that you can apply a class name to the root node of the resulting markup. All markup is styled with the lowest specificity level so you can just nest one level in your CSS and the result will be applied. Consider this example:

```jsx
const CustomButton = () => (
  <Button className='customized' label='Custom button' />
);
```

If you browse the resulting markup you will see *data attributes* like `data-role="label"` which can be used to style components without using tag name selectors. You can now write your CSS:

```css
.customized > [data-react-toolbox="label"] {
  color: green;
  font-weight: bold;
}
```
