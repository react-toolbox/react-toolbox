import '../app-bar/tokens.css';
import '../drawer/tokens.css';
export const pinnedClasses = [
  'rt-layout-pinned',
  '[.rt-layout-sidebarDrawer&]:[box-shadow:none]',
  '[.rt-layout-navDrawerDrawer&]:[box-shadow:none]',
].join(' ');

export const clippedClasses = [
  'rt-layout-clipped',
  '[.rt-layout-sidebarDrawer&]:h-[calc(100vh-var(--appbar-height))] [.rt-layout-sidebarDrawer&]:pt-[calc(0.5*var(--unit))] [.rt-layout-sidebarDrawer&]:top-(--appbar-height)',
  '[.rt-layout-navDrawerDrawer&]:h-[calc(100vh-var(--appbar-height))] [.rt-layout-navDrawerDrawer&]:pt-[calc(0.5*var(--unit))] [.rt-layout-navDrawerDrawer&]:top-(--appbar-height)',
  '[@media_screen_and_(max-width:_599.98px)_and_(orientation:_portrait)]:[.rt-layout-sidebarDrawer&]:h-[calc(100vh-var(--appbar-height-m-portrait))] [@media_screen_and_(max-width:_599.98px)_and_(orientation:_portrait)]:[.rt-layout-sidebarDrawer&]:top-(--appbar-height-m-portrait)',
  '[@media_screen_and_(max-width:_599.98px)_and_(orientation:_portrait)]:[.rt-layout-navDrawerDrawer&]:h-[calc(100vh-var(--appbar-height-m-portrait))] [@media_screen_and_(max-width:_599.98px)_and_(orientation:_portrait)]:[.rt-layout-navDrawerDrawer&]:top-(--appbar-height-m-portrait)',
  '[@media_screen_and_(max-height:_599.98px)_and_(orientation:_landscape)]:[.rt-layout-sidebarDrawer&]:h-[calc(100vh-var(--appbar-height-m-landscape))] [@media_screen_and_(max-height:_599.98px)_and_(orientation:_landscape)]:[.rt-layout-sidebarDrawer&]:top-(--appbar-height-m-landscape)',
  '[@media_screen_and_(max-height:_599.98px)_and_(orientation:_landscape)]:[.rt-layout-navDrawerDrawer&]:h-[calc(100vh-var(--appbar-height-m-landscape))] [@media_screen_and_(max-height:_599.98px)_and_(orientation:_landscape)]:[.rt-layout-navDrawerDrawer&]:top-(--appbar-height-m-landscape)',
].join(' ');
/** Shared static variants keep the drawer and its reserved space at the same width. */
export const sidebarWidthClasses = [
  '[--layout-sidebar-size:var(--drawer-mobile-width)]',
  '[--layout-sidebar-width:min(var(--layout-sidebar-size),calc(100vw-var(--standard-increment-mobile)))]',
  '[@media_screen_and_(min-width:_600px)]:[--layout-sidebar-size:var(--drawer-desktop-width)]',
  '[&[data-layout-sidebar-width]]:[--layout-sidebar-size:100%]',
  '[@media_screen_and_(min-width:_600px)_and_(orientation:_landscape)]:[&:is([data-layout-sidebar-width="1"],[data-layout-sidebar-width="2"],[data-layout-sidebar-width="3"],[data-layout-sidebar-width="4"],[data-layout-sidebar-width="5"],[data-layout-sidebar-width="6"],[data-layout-sidebar-width="7"],[data-layout-sidebar-width="8"],[data-layout-sidebar-width="9"])]:[--layout-sidebar-size:calc(var(--standard-increment-mobile)*var(--layout-sidebar-units))]',
  '[@media_screen_and_(min-width:_600px)_and_(orientation:_portrait)]:[&:is([data-layout-sidebar-width="1"],[data-layout-sidebar-width="2"],[data-layout-sidebar-width="3"],[data-layout-sidebar-width="4"],[data-layout-sidebar-width="5"],[data-layout-sidebar-width="6"],[data-layout-sidebar-width="7"],[data-layout-sidebar-width="8"],[data-layout-sidebar-width="9"])]:[--layout-sidebar-size:calc(var(--standard-increment-desktop)*var(--layout-sidebar-units))]',
  '[@media_screen_and_(min-width:_720px)]:[&:is([data-layout-sidebar-width="1"],[data-layout-sidebar-width="2"],[data-layout-sidebar-width="3"],[data-layout-sidebar-width="4"],[data-layout-sidebar-width="5"],[data-layout-sidebar-width="6"],[data-layout-sidebar-width="7"],[data-layout-sidebar-width="8"],[data-layout-sidebar-width="9"],[data-layout-sidebar-width="10"])]:[--layout-sidebar-size:calc(var(--standard-increment-desktop)*var(--layout-sidebar-units))]',
  '[@media_screen_and_(min-width:_840px)]:[&:is([data-layout-sidebar-width="11"],[data-layout-sidebar-width="12"])]:[--layout-sidebar-size:calc(var(--standard-increment-desktop)*var(--layout-sidebar-units))]',
  '[@media_screen_and_(min-width:_720px)]:[&:is([data-layout-sidebar-width="25"],[data-layout-sidebar-width="33"],[data-layout-sidebar-width="50"],[data-layout-sidebar-width="66"],[data-layout-sidebar-width="75"],[data-layout-sidebar-width="100"])]:[--layout-sidebar-size:var(--layout-sidebar-percent)]',
].join(' ');
