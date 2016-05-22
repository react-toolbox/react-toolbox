import React from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';

const ListSubHeader = ({ caption, className, theme }) => (
  <h5 className={classnames(theme.subheader, className)}>{caption}</h5>
);

ListSubHeader.propTypes = {
  caption: React.PropTypes.string,
  className: React.PropTypes.string,
  theme: React.PropTypes.object
};

ListSubHeader.defaultProps = {
  className: ''
};

export default themr('ToolboxList')(ListSubHeader);
