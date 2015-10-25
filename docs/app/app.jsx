/*eslint-disable no-unused-vars*/
import React from 'react';
import ReactDOM from 'react-dom';
import style from 'react-toolbox/commons';
import code from './examples/example.txt';
import Playground from './components/playground';

const App = () => {
  return (
    <app className={style.app}>
      <Playground codeText={code} />
    </app>
  );
};

ReactDOM.render(<App/>, document.getElementById('app'));
