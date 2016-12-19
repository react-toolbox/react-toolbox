[![npm version](https://img.shields.io/npm/v/react-toolbox-themr.svg?style=flat-square)](https://www.npmjs.com/package/react-toolbox-themr)
[![Build Status](http://img.shields.io/travis/react-toolbox/react-toolbox-themr/master.svg?style=flat-square)](https://travis-ci.org/react-toolbox/react-toolbox-themr)
[![NPM Status](http://img.shields.io/npm/dm/react-toolbox-themr.svg?style=flat-square)](https://www.npmjs.com/package/react-toolbox-themr)

# React Toolbox Themr

A command line tool to help you extract [react-toolbox](www.react-toolbox.com) style modules to static files so you can integrate it in nearly any stack.

```
$ yarn add --dev react-toolbox-themr
```

Note it only works with **React Toolbox 2.0 beta**.

![react-toolbox-themr](https://cloud.githubusercontent.com/assets/1634922/21305836/285a092a-c5ce-11e6-8ad4-7b170dc97d1b.gif)

## Why?

[React Toolbox 2.0](https://github.com/react-toolbox/react-toolbox/releases) styles have been rewritten using [postcss](https://github.com/postcss/postcss). This gives us more flexibility and makes the library more powerful allowing things like live transforming in the browser. We still use [CSS Modules](https://github.com/css-modules/css-modules) thought, and some people find difficult to integrate the library in their current stack, specially when [Webpack](https://webpack.github.io/) is not included or accessible.

Sometimes it's annoying to configure react-toolbox to import CSS so this package will help you making easier to try out the library and providing an easy integration with tools like [react-create-app](https://github.com/facebookincubator/create-react-app). It will help you extracting the CSS modules into static files you can import in your application, making react-toolbox very easy to adopt.

## Usage

First of all you have to add `react-toolbox-themr` to your project as a development package. You can either use `npm` or `yarn`.

```
$ yarn add --dev react-toolbox-themr
```

Once installed you can define the configuration in the `package.json` file of your project or through the `--config <path/to/json>` option. If you want to use your `package.json` to store configuration, the `reactToolbox` key should be used on the top level to find your settings:

```json
"reactToolbox": {
  "include": [
    "BUTTON",
    "DATE_PICKER"
  ],
  "customProperties": {
    "animation-duration": "0.3s",
    "color-accent": "var(--palette-pink-a200)",
    "color-accent-dark": "var(--palette-pink-700)",
    "color-primary-contrast": "var(--color-dark-contrast)",
    "color-accent-contrast": "var(--color-dark-contrast)",
  },
  "output": "assets/react-toolbox"
}
```

Then you must add a script in your `package.json` to run the builder.

```json
"scripts": {
  "toolbox": "react-toolbox-themr"
}
```

After this, you can run from the console the command `yarn run toolbox` and the script will create an `assets/react-toolbox` folder and two different files:

- `theme.css` includes all CSS from react-toolbox for the components you have specified in the configuration.
- `theme.js` implements a javascript object (a css module) that tells react-toolbox components what are the `classNames` each included component needs to use.

As a final step you have to include the generated CSS file in your document just like any other CSS asset. Also, you have to use [react-css-themr](www.github.com/javivelasco/react-css-themr) `ThemeProvider` at the top of your app passing the theme.

```jsx
import theme from 'assets/react-toolbox/theme'
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';

const App = ({ children }) => (  
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
);

export default App;
```

Although `ThemeProvider` is exposed by react-toolbox, you can add your own importing directly from [react-css-themr](www.github.com/javivelasco/react-css-themr). Finally, *make sure* the components you use from react-toolbox are imported without bundled css. Check the documentation for more details.


That's all!

## Command line usage

As `react-toolbox-themr` is a command line utility, you can use it from the command line passing options inline like:

```
$ react-toolbox-themr -i BUTTON DATE_PICKER -o my-theme/
```

But we really encourage you to use either `package.json` or a custom configuration file so it's more clear to visualize your configuration. Passing configuration variables is allowed only via package of custom config file.


## Configuration options

All of these options have the same name if you use them in your `package.json`, a custom `json` file or directly through the command line. Some of them are aliased to be used from the command line but passing configuration variables is only allowed from a package of custom json file configuration. Everything is optional.

- `config`: Path to a custom configuration `json` file. Should be used only via command line.
- `path`: Path to `react-toolbox`. Usually you don't need to change but you can set your own if your setup is more complex. Aliased as `-p`.
- `include`: List of components to be included in the theme. Each component name must be capitalized. Aliased as `-i`.
- `output`: Path where both Javascript and CSS files will be generated. Aliased as `-o`.
- `javascript`: Path where the Javascript theme file will be generated. You can optionally include the name of the file. Takes precedence over `output`, aliased as `-j`.
- `styles`: Path where the CSS theme file will be generated. You can optionally include the name of the file. Takes precedence over `output`, aliased as `-s`.
- `customProperties`: An object where keys are custom properties names defined in react toolbox and values are references to other variables of absolute values. It can't be used from the command line. These variables override the defaults defined in React Toolbox.

## About

The project is originally authored by [Javi Velasco](www.twitter.com/javivelasco) as an effort of providing a better adoption experience for React Toolbox. Any comments, improvements or feedback are highly appreciated.

## License
This project is licensed under the terms of the [MIT license](https://github.com/react-toolbox/react-toolbox-themr/blob/master/LICENSE).
