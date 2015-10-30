import React from 'react';
import Appbar from './components/appbar';
import DrawerComponents from './components/drawer_components';
import style from './style';

const Main = (props) => {
  return (
    <div>
      <Appbar />
      <section className={style.content}>
        <DrawerComponents />
        { props.children }
      </section>
    </div>
  );
};

export default Main;
