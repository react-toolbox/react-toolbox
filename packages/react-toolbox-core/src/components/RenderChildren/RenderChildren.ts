import { Children, SFC } from 'react';

const RenderChildren: SFC<{}> = ({ children }) => (
  Children.only(children)
);

export default RenderChildren;
