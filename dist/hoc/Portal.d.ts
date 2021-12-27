import * as React from 'react';
import ReactToolbox from '../index';

export interface PortalProps extends ReactToolbox.Props {
  container?: any;
  lockBody?: boolean;
}

export default class Portal extends React.Component<PortalProps, {}> { }
