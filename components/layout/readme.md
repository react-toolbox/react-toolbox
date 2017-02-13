# Layout

A Layout is a container that can hold a main content area with an optional navigation drawer (on the left) and/or sidebar (on the right). According to the [material design spec](https://material.google.com/layout/structure.html#structure-side-nav), the left drawer is typically used for navigation or identity-based content, while the right sidebar is secondary content related to the main content.

<!-- example -->
```jsx
import React, { Component } from 'react';
import { Layout, NavDrawer, Sidebar, Panel } from '../../components/layout';
import { AppBar } from '../../components/app_bar';
import Checkbox from '../../components/checkbox';

class LayoutExample extends Component {
  state = {
    bodyScrolled: true,
    sideNavActive: false,
    sideNavPinned: false,
    sideNavClipped: false,
    rightSideNavActive: false,
    rightSideNavPinned: false,
    rightSideNavClipped: false
  };

  handleToggle = param => {
    this.setState({ [param]: !this.state[param] });
  }

  render () {
    const { sideNavActive, rightSideNavActive } = this.state;
    return (
      <Layout>
        <NavDrawer
          active={sideNavActive}
          clipped={this.state.sideNavClipped}
          onOverlayClick={this.handleToggle.bind(this, 'sideNavActive')}
          permanentAt="md"
          pinned={this.state.sideNavPinned}
        >
          <p>I'm a NavDrawer content.</p>
        </NavDrawer>

        <AppBar
          fixed
          rightIcon='more'
          leftIcon='menu'
          onLeftIconClick={this.handleToggle.bind(this, 'sideNavActive')}
          title="Super Layout with a large text to be covered!"
        />

        <Panel bodyScroll={this.state.bodyScrolled}>
          <section style={{ margin: '1.8rem'}}>
            <h5 style={{ marginBottom: 20 }}>SideNav State</h5>
            <Checkbox
              label='Pinned'
              checked={this.state.sideNavPinned}
              onChange={this.handleToggle.bind(this, 'sideNavPinned')}
            />

            <Checkbox
              label='Clipped'
              checked={this.state.sideNavClipped}
              onChange={this.handleToggle.bind(this, 'sideNavClipped')}
            />

            <Checkbox
              label="Right SideNav Active"
              checked={this.state.rightSideNavActive}
              onChange={this.handleToggle.bind(this, 'rightSideNavActive')}
            />

            <Checkbox
              label="Right SideNav Pinned"
              checked={this.state.rightSideNavPinned}
              onChange={this.handleToggle.bind(this, 'rightSideNavPinned')}
            />

            <Checkbox
              label="Right SideNav Clipped"
              checked={this.state.rightSideNavClipped}
              onChange={this.handleToggle.bind(this, 'rightSideNavClipped')}
            />

            <Checkbox
              label="Body scrolled"
              checked={this.state.bodyScrolled}
              onChange={this.handleToggle.bind(this, 'bodyScrolled')}
            />
          </section>
        </Panel>

        <Sidebar
          active={rightSideNavActive}
          onOverlayClick={this.handleToggle.bind(this, 'rightSideNavActive')}
          clipped={this.state.rightSideNavClipped}
          pinned={this.state.rightSideNavPinned}
          width={11}
          right
        >
          <p>I'm a Sidebar content.</p>
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

The Layout's subcomponents can alter their appearance and behavior based on the current screen size. The layout uses the screen breakpoints described in the [material design spec](https://material.google.com/layout/responsive-ui.html#responsive-ui-breakpoints), namely:

| Width | Abreviation | Typical Device |
|:-----|:-----|:-----|
| 480px | `xxs` | Phone (portrait) |
| 600px | `xs` | Small tablet, phone (landscape) |
| 720px | `smTablet` | Small tablet (portrait) |
| 840px | `sm` | Large tablet (portrait) |
| 960px | `md` | Small tablet (landscape) |
| 1024px | `lgTablet` | Large tablet (landscape) |
| 1280px | `lg` | Large tablet (landscape), desktop |
| 1440px | `xl` | desktop |
| 1600px | `xxl` | desktop |
| 1920px | `xxxl` | desktop |

The components also make use of [standard increments](https://material.google.com/layout/metrics-keylines.html#metrics-keylines-sizing-by-increments), which is a unit equal to the height of the action bar. At mobile sizes (< `xs`) the increment is 56px. On larger screens, it is 64px.

### Content Area Layout

The content areas of all three of the subcomponents (`NavDrawer`, `Panel`, and `Sidebar`) use flexbox column layouts set to fill the entire height of the containing `Layout`. The column layout lends itself well to the fixed header/scrolling content that will frequently inhabit these components. By default, these components also do not scroll content vertically so that you can control where scrolling occurs. (For example, see the content of the `Panel` in the sample.)

If the column layout does not suit your needs, simply fill the content area with an element with `flex` set to 1, and use whatever layout you like within it.

### Properties
| Name | Type | Default | Description |
|:-----|:-----|:-----|:-----|
| `children` | `Nodes` |  | Can hold a `Panel`, along with a `NavDrawer`, a `Sidebar` and an `AppBar` |
| `className` | `string` |  | Additional class(es) for custom styling. |

### Theme
The themed key the `Layout` in general is `ToolboxLayout`. We add classes to the root element depending on the parsed children:

| Name     | Description|
|:---------|:-----------|
| `appbarFixed` | Added to the root class if there is a fixed `AppBar` present.|
| `layout` | The root class that wraps the whole layout.|
| `navDrawerPinned` | Added to the root if there is a pinned `NavDrawer`.|
| `navDrawerClipped` | Added to the root if there is a clipped NavDrawer.|
| `sidebarPinned` | Added to the root if there is a pinned sidebar.|
| `sidebarClipped` | Added to the root if there is a clipped sidebar.|
| `sidebarWidth${width}` | Added to the root element in case there is a sidebar present. width correspond to the value passed to the `Sidebar`.|

Note that you can also pass namespaced properties under `appbar` to override styles of a nested `AppBar` inside the layout.

## NavDrawer

The [navigation drawer](https://material.google.com/patterns/navigation-drawer.html) slides in from the left and usually holds [the application's main navigation](https://material.google.com/layout/structure.html#structure-side-nav). The drawer's width is based on the screen size:

| Breakpoint | Drawer Width | Notes |
|:-----|:-----|:-----|
| < `xs` | 280px or (Screen width - 85px) | whichever is smaller |
| > `xs` | 320px | |
| > `xs` | 400px | If property `width` is set to `wide` |

The drawer can be docked to the left side of the screen or can float temporarily as an overlay. You can control the drawer's display manually `active` and `pinned` properties, and can also specify a breakpoint at which the drawer automatically becomes permanently docked. You can also use a `clipped` property when it's pinned so the `AppBar` would stick over the Drawer.

### Properties
| Name | Type | Default | Description |
|:-----|:-----|:-----|:-----|
| `active` | `bool` | `false` | If true, the drawer will be shown as an overlay. |
| `className` | `string` |  | Additional class(es) for custom styling. |
| `clipped` | `bool` | `false` | If true, when the `AppBar` gets pinned, it will stand over the `Drawer`. |
| `permanentAt` | `enum`(`'sm'`,`'smTablet'`,`'md'`,`'lg'`,`'lgTablet'`,`'xl'`,`'xxl'`,`'xxxl'`) |  | The breakpoint at which the drawer is automatically pinned. |
| `pinned` | `bool` | `false` | If true, the drawer will be pinned open. `pinned` takes precedence over `active`. |
| `onOverlayClick` | `Function`     |            | Callback function to be invoked when the overlay is clicked. It only works if the `Drawer` is actually displaying and Overlay|

### Theme

The `navDrawer` uses a `Drawer` component under the covers the theme is the same as for it but namespaced under `navDrawer`. It takes the following extra properties:

| Name     | Description|
|:---------|:-----------|
| `pinned` | Added to the root class when it is pinned.|
| `clipped` | Added to the root class when it is clipped.|

## Panel

The `Panel` is the main content area within a `Layout`.  By default we assume it is rendered in the body using the `document` scroll but you can use a `bodyScroll` to `false` property to make it look like a scrolled `div`.

### Properties
| Name | Type | Default | Description |
|:-----|:-----|:-----|:-----|
| `bodyScroll` | `Boolean` | | You can set it to true in case you are using a pinned Sidebar so it takes an scrolled `div` instead of using the document scroll. |
| `className` | `string` |  | Additional class(es) for custom styling. |

### Theme
| Name     | Description|
|:---------|:-----------|
| `bodyScroll` | Used in the root class in case the panel has bodyScroll.|
| `panel` | Used as the root class of the panel component.|

## Sidebar

The `Sidebar` is an extra drawer that docks to the right side of the `Layout`. The sidebar's width can be set either to a multiple of the "standard increment" (1 - 12 increments) or as a percentage of the parent `Layout` width (25%, 33%, 50%, 66%, 75%, 100%). Regardless of the width set, at mobile screen sizes the sidebar acts like a full-screen dialog that covers the entire screen (see [examples](https://material.google.com/layout/structure.html#structure-side-nav)).

### Properties
| Name | Type | Default | Description |
|:-----|:-----|:-----|:-----|
| `width` | `enum`(`1`,`2`,`3`,`4`,`5`,`6`,`7`,`8`,`9`,`10`,`11`,`12`,`25`,`33`,`50`,`66`,`75`,`100`) | `5` | Width in standard increments (1-12) or percentage (25, 33, 50, 66, 75, 100) |
| `pinned` | `bool` | `false` | If true, the sidebar will be pinned open. |
| `scrollY` | `bool` | `false` | If true, the sidebar will vertically scroll all content. |
| `className` | `string` |  | Additional class(es) for custom styling. |

### Theme

The `Sidebar` uses a `Drawer` component under the covers the theme is the same as for it but namespaced under `sidebar`. It takes the following extra properties:

| Name     | Description|
|:---------|:-----------|
| `clipped` | Added to the root class when it is clipped.|
| `pinned` | Added to the root class when it is pinned.|

## Hiding icon in `AppBar` when permanentAt rule is active

When screen size is large enough and `Layout` makes `NavDrawer` constantly visible based on `permanentAt` prop of `NavDrawer` it is useful to hide menu icon in `AppBar`. Here are the code changes you have to perform to hide an element depending on the value provided to `permanentAt` property (based on how `Layout` component does this itself):

```diff
import React from 'react';
import { Layout, AppBar } from 'react-toolbox';
+import isBrowser from 'react-toolbox/lib/utils/is-browser';
+import breakpoints from 'react-toolbox/lib/utils/breakpoints';
+import { getViewport } from 'react-toolbox/lib/utils/utils';

class MyComponent extends React.Component {
  state = {
    drawerActive: false,
    drawerPinned: false,
+    width: isBrowser() && getViewport().width
  }

  toggleDrawerActive = () => {
    this.setState({ drawerActive: !this.state.drawerActive });
  }

  toggleDrawerPinned = () => {
    this.setState({ drawerPinned: !this.state.drawerPinned });
  }

+  componentDidMount () {
+    if (!this.state.width) this.handleResize();
+    window.addEventListener('resize', this.handleResize);
+  }

+  componentWillUnmount () {
+    window.removeEventListener('resize', this.handleResize);
+  }

+  handleResize = () => {
+    this.setState({ width: getViewport().width });
+  }

  render() {
+    const permanentAt = 'lg';
+    const appBarIconVisible = this.state.width <= breakpoints[permanentAt];
   
    return (
      <Layout>
        <NavDrawer active={this.state.drawerActive}
-                   pinned={this.state.drawerPinned} permanentAt="lg"
+                   pinned={this.state.drawerPinned} permanentAt={permanentAt}
                   onOverlayClick={ this.toggleDrawerActive }>
           { /* yout nav */ }
        </NavDrawer>
        <Panel>
-          <AppBar title="Test" leftIcon="menu" onLeftIconClick={this.toggleDrawerActive}>
+          <AppBar title="Test" leftIcon={appBarIconVisible ? "menu" : null} onLeftIconClick={this.toggleDrawerActive}>
          </AppBar>
          <div>
            {this.props.children}
          </div>
        </Panel>
      </Layout>
    );
  }
}
```
