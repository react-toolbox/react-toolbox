import { PropTypes } from 'react';

export default PropTypes.oneOfType([
  PropTypes.instanceOf(Date),
  PropTypes.shape({
    from: PropTypes.instanceOf(Date),
    to: PropTypes.instanceOf(Date),
  }),
]);
