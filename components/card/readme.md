# Card

A [Card](https://www.google.com/design/spec/components/cards.html) is a piece of paper with unique related data that serves as an entry point to more detailed information. For example, a card could contain a photo, text, and a link about a single subject.

Cards are composed of multiple subcomponents in React Toolbox. You can combine each of the subcomponents to create all different Material Design Cards given in the spec.

<!-- example -->
```jsx
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';

const dummyText = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.';

const TestCards = () => (
  <Card style={{width: '350px'}}>
    <CardTitle
      avatar="https://placeimg.com/80/80/animals"
      title="Avatar style title"
      subtitle="Subtitle here"
    />
    <CardMedia
      aspectRatio="wide"
      image="https://placeimg.com/800/450/nature"
    />
    <CardTitle
      title="Title goes here"
      subtitle="Subtitle here"
    />
    <CardText>{dummyText}</CardText>
    <CardActions theme={theme}>
      <Button label="Action 1" />
      <Button label="Action 2" />
    </CardActions>
  </Card>
);

return <TestCards />;
```

This component and all of its subcomponents are themeable by context using the key `RTCard`. This component theme can also include class modifiers for `Button` and `Avatar` component.

## Card

The base card component. This acts as the main card container
that all subcomponents are placed within.

### Properties
| Name | Type | Default | Description |
|:-----|:-----|:-----|:-----|
| `children` | `Any` |  | Child components, usually Card subcomponents. |
| `className` | `String` |  | Additional class(es) for custom styling. |
| `raised` | `Boolean` |  | Increases the shadow depth to appear elevated. |

### Theme

| Name     | Description|
|:---------|:-----------|
| `card`   | Class used for the root element.|
| `raised` | Added to the root element in case the card is raised.|

## CardTitle
A versatile title block that can be used in various places on the card, including the media area. This component can also display an avatar next to the title content.

### Properties
| Name | Type | Default | Description |
|:-----|:-----|:-----|:-----|
| `avatar` | `String` or `Element` |  | A string URL or Element to specify an avatar in the left side of the title. |
| `children` | `String`, `Element` or `Array` |  | Children to pass through the component. |
| `className` | `String` |  | Additional class(es) for custom styling. |
| `subtitle` | `String` |  | Text used for the sub header of the card. |
| `title` | `String` |  | Text used for the title of the card.  |

### Theme

| Name     | Description|
|:---------|:-----------|
| `large` | Added to the root element when the card has avatar.|
| `small` | Added to the root element when the card has no avatar.|
| `subtitle` | Added to the root element for subtitle.|
| `title` | Used in for the root element.|

## CardMedia

Used for displaying media such as images or videos on a card. Can also be used with a solid background color instead of an image.

### Properties
| Name | Type | Default | Description |
|:-----|:-----|:-----|:-----|
| `aspectRatio` | `enum`(`'wide'`,`'square'`) |  | Forces a 16:9 or 1:1 aspect ratio respectively. Unset, the media area will have a flexible height. |
| `children` | `Any` |  | Usually an image/video element or a `<CardTitle>` component. |
| `className` | `String` |  | Additional class(es) for custom styling. |
| `color` | `String` |  | Sets the background color |
| `contentOverlay` | `Boolean` |  | Creates a dark overlay underneath the child components. |
| `image` | `String`, `Element` |  | Can be used instead of children. Accepts an element or a URL string. |

### Theme

| Name     | Description|
|:---------|:-----------|
| `cardMedia` | Added to the element root.|
| `content` | Used for the content element.|
| `contentOverlay` | Added to content element if its overlayed.|
| `square` | Added to content element if its squared.|
| `wide` | Added to content element if its wide.|

## CardText
Basic card content container. Good for small descriptions or other supplementary text.

### Properties
| Name | Type | Default | Description |
|:-----|:-----|:-----|:-----|
| `children` | `Any` |  | Children to pass through the component. |
| `className` | `String` |  | Additional class(es) for custom styling. |

### Theme

| Name       | Description|
|:-----------|:-----------|
| `cardText` | Used for the main root element.|

## CardActions

This component is used as a container for supplemental card actions. Supplemental actions within the card are explicitly called out using icons, text, and UI controls, typically placed at the bottom of the card.

### Properties

| Name | Type | Default | Description |
|:-----|:-----|:-----|:-----|
| `children` | `Any` |  | Children to pass through the component. |
| `className` | `String` |  | Additional class(es) for custom styling. |

### Theme

| Name       | Description|
|:-----------|:-----------|
| `cardActions` | Used for a wrapper around actions as the root element.|
