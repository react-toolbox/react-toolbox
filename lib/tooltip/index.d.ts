import * as React from 'react';
export class TooltipComponent<P, S> extends React.Component<P, S> {
	getDecoratedComponentInstance(): React.Component<P, S>;
}

export interface TooltipComponentClass<P> extends React.ComponentClass<P> {
	new (props?: P, context?: any): TooltipComponent<P, any>;
}

export default function Tooltip<P>(componentClass: React.ComponentClass<P>): TooltipComponentClass<P>;