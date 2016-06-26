import * as React from 'react';

export interface RippleProps {
  centered?:boolean,
  className?:boolean,
  onRippleEnded:() => void,
  spread?:number,
  theme?:{
    ripple?:string,
    rippleActive?:string,
    rippleRestarting?:string,
    rippleWrapper?:string
  }
}

export class Ripple extends React.Component<RippleProps, {}> {
  render():React.DOMElement<any, any>;
}

export default Ripple;