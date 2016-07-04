import * as React from 'react';

export interface LayoutProps {
  className?:string
}

export interface NavDrawerProps {
  width?:'normal' | 'wide',
  active?:boolean,
  pinned?:boolean,
  permanentAt?:'sm'|'md'|'lg'|'xl'|'xxl'|'xxxl',
  onOverlayClick?:() => void,
  scrollY?:boolean,
  className?:string
}

export interface PanelProps {
  scrollY?:boolean,
  className?:string
}

export interface SidebarProps {
  width?:'1'|'2'|'3'|'4'|'5'|'6'|'7'|'8'|'9'|'10'|'11'|'12'|'25'|'33'|'50'|'66'|'75'|'100'
  pinned?:boolean,
  scrollY?:boolean,
  className?:string
}

export class Layout extends React.Component<LayoutProps, {}> {
  render():React.DOMElement<any, any>;
}

export class NavDrawer extends React.Component<NavDrawerProps, {}> {
  render():React.DOMElement<any, any>;
}

export class Panel extends React.Component<PanelProps, {}> {
  render():React.DOMElement<any, any>;
}

export class Sidebar extends React.Component<SidebarProps, {}> {
  render():React.DOMElement<any, any>;
}