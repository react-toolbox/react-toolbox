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
