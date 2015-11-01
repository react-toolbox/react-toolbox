import React from 'react';
import { Card } from 'react-toolbox';

import Logo from '../../logo';
import Navigation from '../../navigation';
import Markdown from '../../markdown';

import style from './style';
import authors from './modules/authors';
import readme from './modules/readme.md';

const Home = () => {
  return (
    <article>
      <header className={style.header}>
        <Logo className={style.logo} />
        <h2 className={style.title}>React Toolbox</h2>
        <h4 className={style.subtitle}>Bootstrap your application with beautiful Material Design Components</h4>
        <Navigation className={style.navigation} />
      </header>
      <section className={style.content}>
        <Markdown className={style.documentation} markdown={readme}/>

        <ul className={style.authors}>
          { authors.map((author, index) => { return <Card key={index} {...author} />; }) }
        </ul>
      </section>
      <footer className={style.footer}>
        <small>React Toolbox ©</small>
      </footer>
    </article>
  );
};

export default Home;
