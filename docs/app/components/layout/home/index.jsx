/*eslint-disable no-unused-vars*/
import React from 'react';
import style from './style';
import Logo from '../../logo';
import Navigation from '../../navigation';

const Home = () => {
  return (
    <div>
      <header className={style.hero}>
        <Logo className={style.logo} />
        <h2 className={style.title}>React Toolbox</h2>
        <h4 className={style.subtitle}>Bootstrap your application with beautiful Material Design Components</h4>
        <Navigation className={style.navigation} />
      </header>
    </div>
  );
};

export default Home;
