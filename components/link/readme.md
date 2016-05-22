# Link

The link is a very simple component that acts mostly as a wrapper for the HTML anchor. It's not included in Material Design Specification but we provide it as an easy way to create links with icons and counters. Let's see an example:

<!-- example -->
```jsx
import Link from 'react-toolbox/lib/link';
import theme from 'react-toolbox/lib/link/theme';

const LinksTest = () => (
  <nav>
    <Link active href="/#/components/link" label="Work" count={4} icon='business' theme={theme} />
    <Link href="/#/components/link" label="Blog" icon='speaker_notes' theme={theme} />
    <Link href="/#/components/link" label="Explore" icon='explore' theme={theme} />
  </nav>
);
```

## Properties

You can add as many properties as you want to be directly transferred to the output anchor element. Apart from them you have the following properties:

| Name            | Type                  | Default         | Description|
|:-----|:-----|:-----|:-----|
| `active`        | `Boolean`             | `false`         | If true, adds active style to link.|
| `className`     | `String`              | `''`            | Sets a custom class name to add styles to the link.|
| `count`         | `Number`              |                 | Sets a count number.|
| `icon`          | `String` or `Element` |                 | An icon key string to include a `FontIcon` component in front of the text.|
| `label`         | `String`              |                 | The text string used for the text content of the link.|

## Theming

You can take a look to the `_config.scss` variables. The themed key for this component is `ToolboxLink`, it should implement the following interface:

| Name     | Description|
|:---------|:-----------|
| `active` | Added to the root element if the Link is active.|
| `icon`  | Used for the icon element if it's present.|
| `link`   | Used for the root element.|
