# Avatar

The purpose of the `Avatar` component is to provide a wrapper around an image tag that fallbacks to a text when the image is broken or it can't be loaded for any reason.

## Structure

The rendering structure is composed by a `WrapperNode` which is the main element. As its `children` the component will render an `ImgNode` corresponding to the `img` along with a text provided by the `title` property and any possible children.

`ImgNode` will be rendered only when a image attribute is provided while `text` will be rendered either when the image fails or there is no image at all. The property `children` is always rendered.

```
  <WrapperNode>
    <ImgNode />
    {text}
    {children}
  </WrapperNode>
```

## Main Properties

| Name            | Type        | Default         | Description|
|:----------------|:------------|:----------------|:-----------|
| `alt`       | `string`    |                 | Corresponds to the `alt` attribute that will be passed down to the `ImgNode`. |
| `children`  | `ReactNode`    |                 | A `ReactNode` that will be rendered as children of the `WrapperNode`. |
| `className`     | `string`    |                | Additional class name that will be attached to the `WrapperNode`.|
| `cover`     | `boolean`   |                   | If true, the image will be displayed as a cover image to fill every space in the wrapper node.|
| `image` | `string`  |                 | Source of the image to be used in the avatar. |
| `title` | `string`  |                 | Source of the image to be used in the avatar. |

## `WrapperNode` Properties

| Name            | Type        | Default         | Description|
|:----------------|:------------|:----------------|:-----------|
| `className`     | `string`    |                | Additional class name passed as property in the component.|
| `cover`     | `boolean`   |                   | If true, the node should display the image as cover.|
| `errored`     | `boolean`    |            | Will be passed as true when the image load failed. |
| `image`     | `boolean`   |                   | The source of the image given as prop.|


## `ImgNode` Properties

| Name            | Type        | Default         | Description|
|:----------------|:------------|:----------------|:-----------|
| `alt`       | `string`    |            | Alt property given as a native replacement if the image fails. |
| `onError`     | `boolean`   |                   | A handler that should be called when there is an error loading the image.|
| `src`     | `string`    |            | Will be used to pass the source given in the `image` attribute. |
