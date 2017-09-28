import { compose } from 'ramda';
import { defaultProps } from 'recompose';
import withClickOutside from 'react-toolbox-core/lib/hoc/withClickOutside';
import withActiveMount from 'react-toolbox-core/lib/hoc/withActiveMount';
import MenuNode from './MenuNode';
import withPortal from './withPortal';

const enhance = compose(
  withClickOutside({ shouldAttach: props => props.active }),
  withActiveMount({ delay: 400 }),
  defaultProps({ offsetX: 0, offsetY: 0 }),
  withPortal(),
);

export default enhance(MenuNode);
