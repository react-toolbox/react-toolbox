This document defines a manifesto and the main Roadmap 🚵 ideas for [React Toolbox](www.react-toolbox.io). It's not a fixed document and of course it's open to change. You can leave your feedback in [this gist](https://gist.github.com/javivelasco/259d2087c2a8c3e8f2c5c720d1fd3f2e) or you can also do it [through an issue](https://github.com/react-toolbox/react-toolbox/issues/new).

## The Manifesto 

React Toolbox is a project intended to ship the *best* [Material Design](https://material.io/guidelines/) components for React. It is focused on the following principles:

- **Quality over quantity**: we rather develop a bunch components close to perfection than a lot of unmaintainable buggy components.
- **Pixel perfection**: every component should be nailed to the spec. We will pay attention to every single detail at both visual and interaction levels.
- **Flexibility**: components should be as decoupled as possible from opinionated styling libraries/tools. They should be easy to theme and customize.
- **Easy adoption**: the project should be integrated as easy as technology permits. The adoption has to be unobtrusive in a consumer project avoiding boilerplate.
- **Exhaustive testing**: every component should be intensively tested, keeping priority of testing tasks and code coverage on top.

## Where is this project going?

The current **stable version** is `1.x.x`. There will be *no active development* on this apart from accepting and releasing patches and small new features. It works with [SASS](http://sass-lang.com/) and [CSS Modules](https://github.com/css-modules/css-modules) and it can be integrated by enabling some boilerplate configuration in [Webpack](https://webpack.github.io/). The version **under active development** is released as `2.0.0-beta.x` from the `dev` branch. It will be officially released as an stable version as the following objectives are covered:

1. **Decouple styles**: although we consider CSS Modules + PostCSS a good approach for styling, it's far from being perfect. React Toolbox should be open to other alternatives such as [styled-components](https://styled-components.com/) and [other](https://github.com/rtsao/styletron) `css-in-js` [libraries](http://fela.js.org/) that vanish any need for configuration. To achieve this, every component should be refactored to an approach independent from the styling solution.
2. **Reduce selector priority**: we use [react-css-themr](https://github.com/javivelasco/react-css-themr) to customize components using objects implementing a shape of nodes classNames. This strategy works good but it implies reducing the css selector priority to the minimum. Most components have selector priority too high and they need to be refactored in order to make customization as easier. This can be done with 1.
3. **Simplify integration**: the project should be easy to adopt in any stack. To achieve this, we recently released [react-toolbox-themr](https://github.com/react-toolbox/react-toolbox-themr) to generate custom CSS builds. We should test and improve its API. Also, being open to `css-in-js` will help with this:  setup would no longer be needed.
4. **Refactor problematic components**: there are some components like `Autocomplete`, `Table` and `Dropdown` that are not flexible at all. They are based on collections passed by props and this is a huge caveat for most applications. Those components should be completely re-written. Some of them like `Layout` and `Table` are already done, but there is still a lot to do.
5. **Extract state**: `Autocomplete` or `Dropdown` are doing too much internally with state and this is a source of bugs. Every component should be modeled as stateless and optionally wrapped with [recompose](https://github.com/acdlite/recompose) (or something similar) to encapsulate and provide state. This make components more flexible and easy to test.
6. **Improve test coverage**: the project was initially set with a test suite based in [mocha](https://mochajs.org/). We find [jest](https://facebook.github.io/jest/) way more appropriated thanks to features like snapshot testing and its easy setup. We will migrate the test suite to Jest and write tests for every single component following the [boy scout rule](http://programmer.97things.oreilly.com/wiki/index.php/The_Boy_Scout_Rule).
7. **Improve documentation and playground**: there are some issues with the current documentation: too many clicks to load a component, no `require` implementation in the playground, no way to try out styling with css-modules... Also there are missing tutorials on customization and configuration and no structure into different pages. Documentation will be redesigned and filled with more pages that will be accesible through the repository.

All of this work to get an stable next version doesn't mean you can't use react-toolbox just now. The development on the `dev` branch will be under constant releases and, except from big API changes in refactored components, it will be easy to upgrade and to use. It's perfectly *safe* to start using `2.0.0-beta.x` **today**! Note that from now on we will put more effort on writing CHANGELOGS.

## FAQ

### How can I help and contribute to the project?

React Toolbox is **not funded** and officially is developed and maintained by [one single person](http://twitter.com/javivelasco) Time is limited 😞 and any help or contribution is very appreciated. You can help:

- Backing the project in Open Collective (pending approval) or [donating via Paypal](https://paypal.me/javivelasco).
- Reviewing, labeling, answering and closing issues.
- Fixing bugs documented in pending issues.
- Writing tests for existing components.
- Reviewing active Pull Requests.
- Giving feedback. Your opinion matters!

### CSS Modules or CSS in JS?

Using CSS Modules implies many benefits like caching, server side rendering or good performance. Also, it can solve issues like selector collisions or unwanted cascading. The downside is the amount of boilerplate needed to make it run, and the coupling it generates to build tools. This is pretty much fixed by [react-toolbox-themr](https://github.com/react-toolbox/react-toolbox-themr) but there are some issues like colocation or bundling that are well covered by css-in-js tools. This means that the primary approach it's still css modules but we will be progressively migrating components to an strategy that makes easy to switch to css-in-js. In the future it should be possible to create your own *react-toolbox-styletron* distribution without too much effort.

### How are you decoupling from styling?

We've found very interesting the abstraction of *component nodes*. Instead of considering a complex component composed by styled DOM nodes, you can think of a component that orchestrates many smaller components. Those smaller components are transformed into a single styled node. More or less the idea implemented in [styled-components](https://styled-components.com/). It would be something like this:

```jsx
const Button = ({ primary, secondary, label, icon }) => (
  <ButtonNode primary={primary} secondary={secondary}>
    <IconNode primary={primary} secondary={secondary} value={icon} />
    {label}
  </ButtonNode>
);
```

What this means is that the nodes that compose a component can be injected using Dependency Injection, so they can be styled with whatever strategy you want outside the component.

### How are you handling customization and theming?

The strategy of passing down CSS modules that get merged with nodes classnames as described in react-css-themr is still very powerful and it works with css-in-js (not inline styles of course). We are keeping this customization API but depending on the styling approach you can also use DI to fully customize component nodes. Priority of selectors would no longer be an issue after we migrate styles to flat classnames; only modifiers will be nested.

About theming, it depends on how the styling is handled. In general there would be a set of variables to modify project wide styling aspects. It could be with JS as in styled-components or with custom properties using postcss.

### When are you releasing?

There is no fixed date, sorry. Being an open source project, it depends on contributors and we don't always have as much time to dedicate as we would want. We are working on the project constantly with some peaks but the beta versions will be released being usable and without too many bugs so you don't have to wait for a final version to start using the new features!

### Is there any migration guide to 2.0?

Not really. At the end we are just providing components and there are no big changes on them apart from huge refactors of some specific components that will be coming. If should be enough by checking changelogs and new documentation. In any case if you feel like a migration guide is needed, feel free to leave for feedback.

### When will be released the new playground?

I [published a Tweet](https://twitter.com/javivelasco/status/765292988402630656) some time ago with a recording of the new playground. The core for this is ready but there are way bigger priorities than redesigning a site that is functional. Also, awesome [Danny Saltaren](http://dsaltaren.com/) is working in a new design for the site. As we update the documentation and get some objectives covered it will be eventually included.
