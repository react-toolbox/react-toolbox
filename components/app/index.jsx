import React from 'react';
import style from './style';

const App = (props) => {
  return (
    <app className={style.app}>
      {props.children}
    </app>
  );
};

export default App;
