import React from 'react';
import { Link } from 'react-router';
import { Card, Button } from 'react-toolbox';
import Logo from '../../logo';
import Navigation from '../../navigation';
import style from './style';
import authors from './modules/authors';

const Home = () => (
  <article>
    <header className={style.header}>
      <div className={style.github}>
        <iframe src='https://ghbtns.com/github-btn.html?user=react-toolbox&amp;repo=react-toolbox&amp;type=star&amp;count=true' frameBorder='0' scrolling='0' />
        <iframe src='https://ghbtns.com/github-btn.html?user=react-toolbox&amp;repo=react-toolbox&amp;type=fork&amp;count=true' frameBorder='0' scrolling='0' />
        <a className={style.donate} href='https://www.paypal.me/javivelasco' target='_blank'>
          <span className={style.legend}>support</span>
          <span className={style.paypal}>paypal</span>
        </a>
      </div>

      <Logo className={style.logo} />
      <h2 className={style.title}>React Toolbox</h2>
      <h4 className={style.subtitle}>Bootstrap your application with beautiful Material Design Components</h4>
      <Navigation className={style.navigation} />
    </header>

    <section className={style.content}>
      <p>
        React Toolbox is a set of React components that implements Google Material Design specification.
        It's built on top of some the trendiest proposals like CSS Modules (written in SASS), Webpack and ES6.
        The library harmoniously integrates with your Webpack workflow and it's easily customizable and very flexible.
      </p>

      <p>
        Check our awesome documentation (which is built using React Toolbox) and try all the components with
        live examples. We've created a playground so you don't need to install anything to fall in love with
        our components, so fun!
      </p>

      <Link to='/components'>
        <Button label='Try it now!' raised accent />
      </Link>
    </section>

    <section className={`${style.content}`}>
      <h3>About the authors</h3>
      <ul className={style.authors}>
      {
        authors.map((author, index) => {
          return <Card key={index} {...author} />;
        })
      }
      </ul>
    </section>

    <footer className={style.footer}>
      <p>React Toolbox © 2015</p>
      <small>Crafted with <span className={style.love}>ღ</span> between Spain and Thailand</small>
    </footer>
  </article>
);

export default Home;
