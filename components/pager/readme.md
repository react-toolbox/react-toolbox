# Pager

Provides functionality of pagination control, actually the component is not defined at(https://www.google.com/design/spec/components), but designed by using standart components from material design. 
It is easy to use and configure, also it is highly customizable.

<!-- example -->
```jsx
import Pager from 'react-toolbox/lib/pager';
import FontIcon from 'react-toolbox/lib/font_icon';

const ProgressTest = () => {

    var onPageChange = function (oldPage, newPage)
    {
        //server call to update content according current page
        console.info("Previous page : " + oldPage + ", Selected page: " + newPage);
    }

    return (
      <Pager 
        prevButtonContent={ (<FontIcon value='chevron_left' />) }
        nextButtonContent={ (<FontIcon value='chevron_right' />) }
        rangeLeftButtonContent={(<FontIcon value='more_horiz' />)}
        rangeRightButtonContent={(<FontIcon value='more_horiz' />)}
        lastPage={29}
        currentPage={5}
        visiblePagesBlockSize={3}
        onPageChange={onPageChange}
      />
  );
};
```

If you want to provide a theme via context, the component key is `RTPager`.

## Properties

| Name          | Type        | Default         | Description|
|:-----|:-----|:-----|:-----|
| `prevButtonContent`              | `String`    | `\u003C`            | Used for the previous button content.|
| `nextButtonContent`              | `String`    | `\u003E`            | Used for the next button content.|
| `rangeLeftButtonContent`         | `String`    | `...`               | Used for the left range button content.|
| `rangeRightButtonContent`        | `String`    | `...`               | Used for the right range button content.|
| `currentPage`                    | `Number`    | `1`                 | A Number with the currently selected page.|
| `lastPage`                       | `Number`    | `1`                 | A Number of last page.|
| `visiblePagesBlockSize`          | `Number`    | `3`                 | A Number of pages visible in control except next, previous and ranges buttons, the minimum value is 2.|
| `onPageChange`                   | `Function`  |                     | Callback called when the page is changing.|
| `theme`                          | `String`    |                     | Classnames object defining the component style.|
| `pagerClassName`                 | `String`    |                     | This class will be applied to the root elemt.|
| `leftRightArrowButtonTypes`      | `Object`    | {raised: true}      | Defining default style of next, previous buttons.|
| `leftRightRangeButtonTypes`      | `Object`    | {flat: true}        | Defining default style of left, right range buttons.|
| `pagesButtonTypes`               | `Object`    | {flat: true}        | Defining default style of regular page buttons.|


## Theme

| Name     | Description|
|:---------|:-----------|
| `pager` | Used for the root element.|
| `active` | Used for the active page.|
| `leftRightArrowButton` | Used for the next and previous page buttons.|
| `leftRightRangeButton` | Used for the next and previous range pages buttons.|
| `pagesButton` | Used for the regular page buttons.|