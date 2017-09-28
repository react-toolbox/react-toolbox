import clippingBoxFactory, {
  ORIGINS,
} from 'react-toolbox-core/lib/components/ClippingBox';
import InnerNode from './InnerNode';
import OutlineNode from './OutlineNode';
import WrapperNode from './WrapperNode';

const ClippingBox = clippingBoxFactory({
  passthrough: ['overrides'],
  InnerNode,
  OutlineNode,
  WrapperNode,
});

export default ClippingBox;
export { ORIGINS };
