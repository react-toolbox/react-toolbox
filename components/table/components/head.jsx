import React from 'react';

const Head = (props) => {
  return (
    <thead data-component-table-head className={props.className}>
      <tr>
      {
        Object.keys(props.model).map((key) => {
          return <th key={key}>{key}</th>
        })
      }
      </tr>
    </thead>
  );
};

Head.propTypes = {
  className: React.PropTypes.string,
  model: React.PropTypes.object
};

Head.defaultProps = {
  className: '',
  model: {}
};

export default Head;
