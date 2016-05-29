# Layout

A Layout is a container that can hold a main content area with an optional navigation drawer (on the left) and/or sidebar (on the right). According to the [material design spec](https://www.google.com/design/spec/layout/structure.html#structure-side-nav), the left drawer is typically used for navigation or identity-based content, while the right sidebar is secondary content related to the main content.

<!-- example -->
```jsx
import { AppBar, Checkbox, IconButton } from 'react-toolbox';
import { Layout, NavDrawer, Panel, Sidebar } from 'react-toolbox';

class LayoutTest extends React.Component {
    state = {
        drawerActive: false,
        drawerPinned: false,
        sidebarPinned: false
    };

    toggleDrawerActive = () => {
        this.setState({ drawerActive: !this.state.drawerActive });
    };

    toggleDrawerPinned = () => {
        this.setState({ drawerPinned: !this.state.drawerPinned });
    }

    toggleSidebar = () => {
        this.setState({ sidebarPinned: !this.state.sidebarPinned });
    };

    render() {
        return (
            <Layout>
                <NavDrawer active={this.state.drawerActive}
                    pinned={this.state.drawerPinned} permanentAt='xxxl'
                    onOverlayClick={ this.toggleDrawerActive }>
                    <p>
                        Navigation, account switcher, etc. go here.
                    </p>
                </NavDrawer>
                <Panel>
                    <AppBar><IconButton icon='menu' inverse={ true } onClick={ this.toggleDrawerActive }/></AppBar>
                    <div style={{ flex: 1, overflowY: 'auto', padding: '1.8rem' }}>
                        <h1>Main Content</h1>
                        <p>Main content goes here.</p>
                        <Checkbox label='Pin drawer' checked={this.state.drawerPinned} onChange={this.toggleDrawerPinned} />
                        <Checkbox label='Show sidebar' checked={this.state.sidebarPinned} onChange={this.toggleSidebar} />
                    </div>
                </Panel>
                <Sidebar pinned={ this.state.sidebarPinned } width={ 5 }>
                    <div><IconButton icon='close' onClick={ this.toggleSidebar }/></div>
                    <div style={{ flex: 1 }}>
                        <p>Supplemental content goes here.</p>
                    </div>
                </Sidebar>
            </Layout>
        );
    }
}
```

If you want to provide a theme for Layout subcomponents the key to use is `RTLayout`;

## Layout

The primary layout component. This acts as the main container that all subcomponents are placed within. The layout is typically placed so as to fill the entire screen, although it does not have to be.

### Breakpoints and Increments

The Layout's subcomponents can alter their appearance and behavior based on the current screen size. The layout uses the screen breakpoints described in the [material design spec](https://www.google.com/design/spec/layout/responsive-ui.html#responsive-ui-breakpoints), namely:

| Width | Abreviation | Typical Device |
|:-----|:-----|:-----|
| 480px | `xxs` | Phone (portrait) |
| 600px | `xs` | Small tablet, phone (landscape) |
| 720px | `sm-tablet` | Small tablet (portrait) |
| 840px | `sm` | Large tablet (portrait) |
| 960px | `md` | Small tablet (landscape) |
| 1024px | `lg-tablet` | Large tablet (landscape) |
| 1280px | `lg` | Large tablet (landscape), desktop |
| 1440px | `xl` | desktop |
| 1600px | `xxl` | desktop |
| 1920px | `xxxl` | desktop |

The components also make use of [standard increments](https://www.google.com/design/spec/layout/metrics-keylines.html#metrics-keylines-sizing-by-increments), which is a unit equal to the height of the action bar. At mobile sizes (< `xs`) the increment is 56px. On larger screens, it is 64px.

### Content Area Layout

The content areas of all three of the subcomponents (`NavDrawer`, `Panel`, and `Sidebar`) use flexbox column layouts set to fill the entire height of the containing `Layout`. The column layout lends itself well to the fixed header/scrolling content that will frequently inhabit these components. By default, these components also do not scroll content vertically so that you can control where scrolling occurs. (For example, see the content of the `Panel` in the sample.)

If the column layout does not suit your needs, simply fill the content area with an element with `flex` set to 1, and use whatever layout you like within it.

### Properties
| Name | Type | Default | Description |
|:-----|:-----|:-----|:-----|
| `children` | `Nodes` |  | A `Panel`, optionally preceded by a `NavDrawer` and/or followed by a `Sidebar` |
| `className` | `string` |  | Additional class(es) for custom styling. |

### Theme
The themed key the `Layout` in general is `ToolboxLayout`. For the `Layout` wrapper it should only provide one class interface:

| Name     | Description|
|:---------|:-----------|
| `layout` | Class used in the container to position and align inner items.|

## NavDrawer

The [navigation drawer](https://www.google.com/design/spec/patterns/navigation-drawer.html) slides in from the left and usually holds [the application's main navigation](https://www.google.com/design/spec/layout/structure.html#structure-side-nav). The drawer's width is based on the screen size:

| Breakpoint | Drawer Width | Notes |
|:-----|:-----|:-----|
| < `xs` | 280px or (Screen width - 85px) | whichever is smaller |
| > `xs` | 320px | |
| > `xs` | 400px | If property `width` is set to `wide` |

The drawer can be docked to the left side of the screen or can float temporarily as an overlay. You can control the drawer's display manually `active` and `pinned` properties, and can also specify a breakpoint at which the drawer automatically becomes permanently docked.

### Properties
| Name | Type | Default | Description |
|:-----|:-----|:-----|:-----|
| `width` | `enum`(`'normal'`,`'wide'`) | `normal` | 320px or 400px. Only applicable above the `sm` breakpoint. |
| `active` | `bool` | `false` | If true, the drawer will be shown as an overlay. |
| `pinned` | `bool` | `false` | If true, the drawer will be pinned open. `pinned` takes precedence over `active`. |
| `permanentAt` | `enum`(`'sm'`,`'md'`,`'lg'`,`'xl'`,`'xxl'`,`'xxxl'`) |  | The breakpoint at which the drawer is automatically pinned. |
| `scrollY` | `bool` | `false` | If true, the drawer will vertically scroll all content. |
| `onOverlayClick` | `Function`     |            | Callback function to be invoked when the overlay is clicked.|
| `className` | `string` |  | Additional class(es) for custom styling. |

### Theme
| Name     | Description|
|:---------|:-----------|
| `active` | Used when the drawer is active.|
| `drawerContent` | Used for the content of the drawer.|
| `lgPermanent` | Added to the root class for large drawer.|
| `mdPermanent` | Added to the root class for medium drawer.|
| `navDrawer` | Root class for the drawer.|
| `pinned` | Added to the root class if positioning is pinned.|
| `scrim` | Used as a wrapper for the drawer content.|
| `scrollY` | Added to the drawer content if its scrollable.|
| `smPermanent` | Added to the root class for small drawer.|
| `wide` | Added to the root class if width is wide.|
| `xlPermanent` | Added to the root class for extra big drawer.|
| `xxlPermanent` | Added to the root class for super big drawer.|
| `xxxlPermanent` | Added to the root class for largest possible drawer.|

## Panel

The `Panel` is the main content area within a `Layout`.  It is a full-height flexbox column that takes up all remaining horizontal space after the `NavDrawer` and `Sidebar` are laid out.

### Properties
| Name | Type | Default | Description |
|:-----|:-----|:-----|:-----|
| `scrollY` | `bool` | `false` | If true, the panel will vertically scroll all content. |
| `className` | `string` |  | Additional class(es) for custom styling. |

### Theme
| Name     | Description|
|:---------|:-----------|
| `panel` | Used as the root class of the panel component.|
| `scrollY` | Used in case the panel is scrollable.|

## Sidebar

The `Sidebar` is an extra drawer that docks to the right side of the `Layout`. The sidebar's width can be set either to a multiple of the "standard increment" (1 - 12 increments) or as a percentage of the parent `Layout` width (25%, 33%, 50%, 66%, 75%, 100%). Regardless of the width set, at mobile screen sizes the sidebar acts like a full-screen dialog that covers the entire screen (see [examples](https://www.google.com/design/spec/layout/structure.html#structure-side-nav)).

### Properties
| Name | Type | Default | Description |
|:-----|:-----|:-----|:-----|
| `width` | `enum`(`1`,`2`,`3`,`4`,`5`,`6`,`7`,`8`,`9`,`10`,`11`,`12`,`25`,`33`,`50`,`66`,`75`,`100`) | `5` | Width in standard increments (1-12) or percentage (25, 33, 50, 66, 75, 100) |
| `pinned` | `bool` | `false` | If true, the sidebar will be pinned open. |
| `scrollY` | `bool` | `false` | If true, the sidebar will vertically scroll all content. |
| `className` | `string` |  | Additional class(es) for custom styling. |

### Theme
| Name     | Description|
|:---------|:-----------|
| `pinned` | Added to the root class if sidebar is pinned.|
| `scrollY` | Add to the content of sidebar if its scrollable.|
| `sidebar` | Root class of the sidebar.|
| `sidebarContent` | Used in for the content element of the sidebar.|

## Nesting Layouts

The `Layout` is meant to be used near the top level of your application, so that it occupies the entire screen. However, it is possible to nest one layout inside another:

```jsx
<Layout>
    <NavDrawer>[navigation here]<NavDrawer>
    <Panel>
        <Layout>
            <Panel>
                [main content here]
            </Panel>
            <Sidebar>
                [supplemental info here]
            </Sidebar>
        </Layout>
    </Panel>
</Layout>
```

The main reason you would want to do something like this would be so that the navigation could be rendered at a high level, while the contents of the inner `Layout` would be controlled by react-router or something like that.
