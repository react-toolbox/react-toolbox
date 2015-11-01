import React from 'react';
import { Card } from 'react-toolbox';
import style from './style';
import Logo from '../../logo';
import Navigation from '../../navigation';

import authors from './modules/authors';

const Home = () => {
  return (
    <article>
      <header className={style.hero}>
        <Logo className={style.logo} />
        <h2 className={style.title}>React Toolbox</h2>
        <h4 className={style.subtitle}>Bootstrap your application with beautiful Material Design Components</h4>
        <Navigation className={style.navigation} />
      </header>
      <section className={style.content}>
        <h2>Authors</h2>

        <ul className={style.authors}>
          { authors.map((author, index) => { return <Card key={index} {...author} />; }) }
        </ul>
      </section>
      <footer>
        Copyright
      </footer>
    </article>
  );
};

export default Home;
