import * as React from 'react';
export interface ActivableRendererOptions {
	/**
	 * @default 500
	 */
	delay?: number;
}
export interface ActivableRendererProps {
	active: boolean;
	children?: any;
	delay?: number
}
export default function ActivableRendererFactory<P>(options?: ActivableRendererOptions): (componentClass: React.ComponentClass<P>) => React.ComponentClass<P & ActivableRendererProps>