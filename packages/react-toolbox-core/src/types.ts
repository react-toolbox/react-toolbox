import { StatelessComponent, ComponentClass } from 'react';

export type Component<P> = ComponentClass<P> | StatelessComponent<P>;
