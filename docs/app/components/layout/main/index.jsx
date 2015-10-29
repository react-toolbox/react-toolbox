/*eslint-disable no-unused-vars*/
import React from 'react';
import MainAppBar from './appbar';
import MainDrawer from './drawer';
import style from './style';

const Main = (props) => {
  return (
    <div>
      <MainAppBar />
      <section className={style.mainwrapper}>
        <MainDrawer />
        { props.children }
      </section>
    </div>
  );
};

export default Main;
