# Card

A [Card](https://www.google.com/design/spec/components/cards.html) is a piece of paper with unique related data that serves as an entry point to more detailed information. For example, a card could contain a photo, text, and a link about a single subject.

Cards are composed of multiple subcomponents in React Toolbox. You can combine each of the subcomponents to create all different Material Design Cards given in the spec.

<!-- example -->
```jsx
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import theme from 'react-toolbox/lib/card/theme';

const dummyText = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.';

const TestCards = () => (
  <Card theme={theme} style={{width: '350px'}}>
    <CardTitle
      avatar="https://placeimg.com/80/80/animals"
      title="Avatar style title"
      subtitle="Subtitle here"
      theme={theme}
    />
    <CardMedia
      aspectRatio="wide"
      image="https://placeimg.com/800/450/nature"
      theme={theme}
    />
    <CardTitle
      title="Title goes here"
      subtitle="Subtitle here"
      theme={theme}
    />
    <CardText theme={theme}>{dummyText}</CardText>
    <CardActions theme={theme}>
      <Button label="Action 1" />
      <Button label="Action 2" />
    </CardActions>
  </Card>
);

return <TestCards />;
```

<!--component-docgen-start-->

## Card

The base card component. This acts as the main card container
that all subcomponents are placed within.

### Properties
| Name | Type | Default | Description |
|:-----|:-----|:-----|:-----|
| `children` | `Any` |  | Child components, usually Card subcomponents. |
| `className` | `String` |  | Additional class(es) for custom styling. |
| `raised` | `Boolean` |  | Increases the shadow depth to appear elevated. |


Since the `Button` implements a ripple, it accepts theme properties for the ripple as well. If you want to compose the default style for the ripple, you just have to provide Ripple keys with custom styles in the theme object.


## CardTitle
A versatile title block that can be used in
various places on the card, including the media
area. This component can also display an avatar next
to the title content.

### Properties
| Name | Type | Default | Description |
|:-----|:-----|:-----|:-----|
| `avatar` | `String` or `Element` |  | A string URL or Element to specify an avatar in the left side of the title. |
| `children` | `String`, `Element` or `Array` |  | Children to pass through the component. |
| `className` | `String` |  | Additional class(es) for custom styling. |
| `subtitle` | `String` |  | Text used for the sub header of the card. |
| `title` | `String` |  | Text used for the title of the card.  |

## CardMedia

Used for displaying media such as images or videos
on a card. Can also be used with a solid background
color instead of an image.

### Properties
| Name | Type | Default | Description |
|:-----|:-----|:-----|:-----|
| `aspectRatio` | `enum`(`'wide'`,`'square'`) |  | Forces a 16:9 or 1:1 aspect ratio respectively. Unset, the media area will have a flexible height. |
| `children` | `Any` |  | Usually an image/video element or a `<CardTitle>` component. |
| `className` | `String` |  | Additional class(es) for custom styling. |
| `color` | `String` |  | Sets the background color |
| `contentOverlay` | `Boolean` |  | Creates a dark overlay underneath the child components. |
| `image` | `String`, `Element` |  | Can be used instead of children. Accepts an element or a URL string. |

## CardText
Basic card content container. Good for
small descriptions or other supplementary text.

### Properties
| Name | Type | Default | Description |
|:-----|:-----|:-----|:-----|
| `children` | `Any` |  | Children to pass through the component. |
| `className` | `String` |  | Additional class(es) for custom styling. |

## CardActions

This component is used as a container for supplemental
card actions. Supplemental actions within the card are
explicitly called out using icons, text, and UI controls,
typically placed at the bottom of the card.

### Properties
| Name | Type | Default | Description |
|:-----|:-----|:-----|:-----|
| `children` | `Any` |  | Children to pass through the component. |
| `className` | `String` |  | Additional class(es) for custom styling. |

## Theming

Each subcomponent takes it's own classes but since usually you'd want to include every card subcomponent, and also those styles are related to each other, we use the same themed key `ToolboxCard` for context styles. The interface is as follows:

| Name       | Description|
|:-----------|:-----------|
| `card`     | Used in `Card` as root class.|
| `cardActions` | Used in `CardActions` for the wrapper.|
| `cardMedia` | Used in `CardMedia` for the wrapper.|
| `cardText` | Used in `CardText` for text wrapper.|
| `content` | Used in `CardMedia` for inner content.|
| `contentOverlay` | Used in `CardMedia` for inner content if its overlayed.|
| `large` | Used in `CardTitle` when the card has avatar.|
| `raised`   | Used in `Card` for raised cards.|
| `small` | Used in `CardTitle` when the card has no avatar.|
| `square` | Used in `CardMedia` for square content.|
| `subtitle` | Used in `CardTitle` for subtitle.|
| `title` | Used in `CardTitle` for title main wrapper.|
| `wide` | Used in `CardMedia` for wide content.|

This component theme also includes modifiers for `Button` and for `Avatar` component.
