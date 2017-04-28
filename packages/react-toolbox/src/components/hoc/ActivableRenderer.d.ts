import * as React from 'react';

export interface ActivableRendererFactoryOptions {
  delay?: number;
}

export default function ActivableRendererFactory<P>(options?: ActivableRendererFactoryOptions):
  (<TFunction extends React.ComponentClass<P>>(target: TFunction) => TFunction) &
  ((clazz: React.StatelessComponent<P>) => React.StatelessComponent<P>);
