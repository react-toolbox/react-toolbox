'use client';

import { useState } from 'react';
import {
  AppBar,
  Button,
  Card,
  CardActions,
  CardText,
  CardTitle,
  Layout,
  List,
  ListDivider,
  ListItem,
  ListSubHeader,
  NavDrawer,
  Panel,
  Sidebar,
  Switch,
} from 'react-toolbox';

export default function LayoutExample() {
  const [drawerActive, setDrawerActive] = useState(false);
  const [drawerPinned, setDrawerPinned] = useState(false);
  const [sidebarActive, setSidebarActive] = useState(false);
  const [selected, setSelected] = useState('Collection');

  return (
    <Layout>
      <NavDrawer active={drawerActive} pinned={drawerPinned} onOverlayClick={() => setDrawerActive(false)} onEscKeyDown={() => setDrawerActive(false)}>
        <List selectable ripple>
          <ListSubHeader caption="React Toolbox" />
          {['Collection', 'Favorites', 'Archive'].map((label, index) => (
            <ListItem key={label} caption={label} leftIcon={['collections_bookmark', 'favorite_border', 'archive'][index]} onClick={() => { setSelected(label); setDrawerActive(false); }} />
          ))}
          <ListDivider />
          <ListItem caption="Component gallery" leftIcon="arrow_back" to="/components" />
        </List>
        <div className="gallery-drawer-content">
          <Switch label="Pin navigation" checked={drawerPinned} onChange={setDrawerPinned} />
          <Button label="Close navigation" onClick={() => { setDrawerActive(false); setDrawerPinned(false); }} />
        </div>
      </NavDrawer>
      <AppBar title={`My ${selected.toLowerCase()}`} leftIcon="menu" onLeftIconClick={() => setDrawerActive(value => !value)} rightIcon="more_vert" onRightIconClick={() => setSidebarActive(value => !value)} fixed />
      <Panel>
        <div className="layout-demo-content mx-auto max-w-[880px]">
          <p className="gallery-eyebrow">The complete composition</p>
          <h1 className="gallery-title">Space for your ideas.</h1>
          <p className="gallery-introduction mb-8">Layout, AppBar, NavDrawer, Panel, and Sidebar work together with their original responsive behavior.</p>
          <Card raised>
            <CardTitle title={selected} subtitle="Everything has its place" />
            <CardText>Open the navigation from the app bar, pin it to make room, or open the details sidebar. The content responds using the original layout transitions.</CardText>
            <CardActions>
              <Button label="Open navigation" primary onClick={() => setDrawerActive(true)} />
              <Button label="Open details" onClick={() => setSidebarActive(true)} />
            </CardActions>
          </Card>
          <div className="mt-8"><Button label="Back to component gallery" icon="arrow_back" href="/components" /></div>
        </div>
      </Panel>
      <Sidebar active={sidebarActive} width={5} onOverlayClick={() => setSidebarActive(false)} onEscKeyDown={() => setSidebarActive(false)}>
        <div className="gallery-drawer-content">
          <h2>Collection details</h2>
          <p>This is the original right sidebar. Its width, shadow, overlay, and motion come directly from React Toolbox.</p>
          <Button label="Close details" primary onClick={() => setSidebarActive(false)} />
        </div>
      </Sidebar>
    </Layout>
  );
}
