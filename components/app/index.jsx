import React from 'react';
import style from './style';

const App = (props) => {
  let className = style.root;
  if (props.className) {
    className += ` ${props.className}`;
  }

  return (
    <div className={className}>
      {props.children}
    </div>
  );
};

App.propTypes = {
  className: React.PropTypes.string
};

App.defaultProps = {
  className: ''
};

export default App;
