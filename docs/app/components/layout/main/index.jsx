import React from 'react';
import MainAppBar from './appbar';
import MainDrawer from './drawer';
import style from './style';

const Main = (props) => {
  return (
    <div>
      <MainAppBar />
      <section className={style.content}>
        <MainDrawer />
        { props.children }
      </section>
    </div>
  );
};

export default Main;
