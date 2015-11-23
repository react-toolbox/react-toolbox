# Card

A [card](https://www.google.com/design/spec/components/cards.html) is a piece of paper with unique related data that serves as an entry point to more detailed information. For example, a card could contain a photo, text, and a link about a single subject.

<!-- example -->
```jsx
import Card from 'react-toolbox/lib/card';

const actions = [
  { label: 'Play', icon: 'play-arrow'},
  { label: 'Close' }
];

const TestCards = () => (
  <Card
    image='http://pitchfork-cdn.s3.amazonaws.com/longform/221/Deerhunter-Fading-Frontier640.jpg'
    text='A Deerhunter album rollout usually coincides with some pithy and provocative statements from Bradford Cox on pop culture...'
    title='Deerhunter - Fading Frontier'
    color="rgba(0,0,0,.4)"
    actions={actions}
  />
);
```

<!--component-docgen-start-->

## Card `<Card/>`
The base card component. This acts as the main card container
that all subcomponents are placed within.

### Properties
| Name | Type | Default | Description |
|:-----|:-----|:-----|:-----|
| `children` | `any` |  | Child components, usually Card subcomponents. |
| `className` | `string` |  | Additional class(es) for custom styling. |
| `raised` | `bool` |  | Increases the shadow depth to appear elevated. |

------------------------------------------------------------------

## CardActions `<CardActions/>`
This component is used as a container for supplemental
card actions. Supplemental actions within the card are
explicitly called out using icons, text, and UI controls,
typically placed at the bottom of the card.

### Properties
| Name | Type | Default | Description |
|:-----|:-----|:-----|:-----|
| `children` | `any` |  | Children to pass through the component. |
| `className` | `string` |  | Additional class(es) for custom styling. |

------------------------------------------------------------------

## CardMedia `<CardMedia/>`
Used for displaying media such as images or videos
on a card. Can also be used with a solid background
color instead of an image.

### Properties
| Name | Type | Default | Description |
|:-----|:-----|:-----|:-----|
| `aspectRatio` | `enum`(`'wide'`,`'square'`) |  | Forces a 16:9 or 1:1 aspect ratio respectively. Unset, the media area will have a flexible height. |
| `children` | `any` |  | Usually an image/video element or a `<CardTitle>` component. |
| `className` | `string` |  | Additional class(es) for custom styling. |
| `color` | `string` |  | Sets the background color |
| `contentOverlay` | `bool` |  | Creates a dark overlay underneath the child components. |
| `image` | `union`(`string`,`element`) |  | Can be used instead of children. Accepts an element or a URL string. |

------------------------------------------------------------------

## CardText `<CardText/>`
Basic card content container. Good for
small descriptions or other supplementary text.

### Properties
| Name | Type | Default | Description |
|:-----|:-----|:-----|:-----|
| `children` | `any` |  | Children to pass through the component. |
| `className` | `string` |  | Additional class(es) for custom styling. |

------------------------------------------------------------------

## CardTitle `<CardTitle/>`
A versatile title block that can be used in
various places on the card, including the media
area. This component can also display an avatar next
to the title content.

### Properties
| Name | Type | Default | Description |
|:-----|:-----|:-----|:-----|
| `avatar` | `union`(`string`,`element`) |  |  |
| `children` | `union`(`string`,`element`,`array`) |  | Children to pass through the component. |
| `className` | `string` |  | Additional class(es) for custom styling. |
| `subtitle` | `string` |  |  |
| `title` | `string` |  |  |

------------------------------------------------------------------

