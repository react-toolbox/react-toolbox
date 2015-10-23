/*eslint-disable no-unused-vars*/
import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'react-toolbox/button';
import style from 'react-toolbox/commons';

const App = () => {
  return (
    <app >
      <Button label='Testing Toolbox' />
    </app>
  );
};

ReactDOM.render(<App/>, document.getElementById('app'));
