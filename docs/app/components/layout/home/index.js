import React from 'react';
import { Link } from 'react-router';
import Button from 'react-toolbox/button';
import {Card, CardTitle, CardMedia, CardText, CardActions} from 'react-toolbox/card';
import Logo from '../../logo';
import Navigation from '../../navigation';
import style from './style';

const GithubIcon = () => (
  <svg viewBox="0 0 284 277">
    <g><path d="M141.888675,0.0234927555 C63.5359948,0.0234927555 0,63.5477395 0,141.912168 C0,204.6023 40.6554239,257.788232 97.0321356,276.549924 C104.12328,277.86336 106.726656,273.471926 106.726656,269.724287 C106.726656,266.340838 106.595077,255.16371 106.533987,243.307542 C67.0604204,251.890693 58.7310279,226.56652 58.7310279,226.56652 C52.2766299,210.166193 42.9768456,205.805304 42.9768456,205.805304 C30.1032937,196.998939 43.9472374,197.17986 43.9472374,197.17986 C58.1953153,198.180797 65.6976425,211.801527 65.6976425,211.801527 C78.35268,233.493192 98.8906827,227.222064 106.987463,223.596605 C108.260955,214.426049 111.938106,208.166669 115.995895,204.623447 C84.4804813,201.035582 51.3508808,188.869264 51.3508808,134.501475 C51.3508808,119.01045 56.8936274,106.353063 65.9701981,96.4165325 C64.4969882,92.842765 59.6403297,78.411417 67.3447241,58.8673023 C67.3447241,58.8673023 79.2596322,55.0538738 106.374213,73.4114319 C117.692318,70.2676443 129.83044,68.6910512 141.888675,68.63701 C153.94691,68.6910512 166.09443,70.2676443 177.433682,73.4114319 C204.515368,55.0538738 216.413829,58.8673023 216.413829,58.8673023 C224.13702,78.411417 219.278012,92.842765 217.804802,96.4165325 C226.902519,106.353063 232.407672,119.01045 232.407672,134.501475 C232.407672,188.998493 199.214632,200.997988 167.619331,204.510665 C172.708602,208.913848 177.243363,217.54869 177.243363,230.786433 C177.243363,249.771339 177.078889,265.050898 177.078889,269.724287 C177.078889,273.500121 179.632923,277.92445 186.825101,276.531127 C243.171268,257.748288 283.775,204.581154 283.775,141.912168 C283.775,63.5477395 220.248404,0.0234927555 141.888675,0.0234927555" /></g>
  </svg>
);

const TwitterIcon = () => (
  <svg viewBox="0 0 274 223">
    <g><path d="M273.39,26.301 C263.331,30.762 252.521,33.777 241.175,35.133 C252.756,28.191 261.649,17.199 265.837,4.102 C255,10.529 242.996,15.197 230.22,17.713 C219.988,6.812 205.411,0 189.279,0 C158.302,0 133.188,25.113 133.188,56.088 C133.188,60.484 133.685,64.765 134.641,68.87 C88.025,66.531 46.696,44.201 19.032,10.267 C14.204,18.551 11.438,28.186 11.438,38.465 C11.438,57.924 21.341,75.092 36.391,85.15 C27.196,84.859 18.548,82.336 10.985,78.135 C10.981,78.369 10.981,78.604 10.981,78.84 C10.981,106.016 30.315,128.686 55.974,133.838 C51.267,135.12 46.312,135.805 41.196,135.805 C37.582,135.805 34.068,135.454 30.644,134.799 C37.781,157.083 58.495,173.299 83.039,173.752 C63.843,188.795 39.658,197.762 13.38,197.762 C8.853,197.762 4.388,197.497 0,196.979 C24.822,212.893 54.305,222.178 85.98,222.178 C189.148,222.178 245.564,136.711 245.564,62.592 C245.564,60.16 245.51,57.741 245.402,55.336 C256.36,47.428 265.87,37.549 273.39,26.301" /></g>
  </svg>
);


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
        <Card className={style.author}>
          <CardMedia aspectRatio='wide' image='images/javivelasco.jpg' />
          <CardTitle title="Javi Velasco" subtitle="@javivelasco" />
          <CardText>Software gardener • Film, music & comic lover • Frontend Engineer at Audiense  • Any biographer in the room?</CardText>
          <CardActions>
            <Button href='http://github.com/javivelasco' target='_blank'><GithubIcon /> Github</Button>
            <Button href='http://twitter.com/javivelasco' target='_blank' className={style.twitter}><TwitterIcon /> Twitter</Button>
          </CardActions>
        </Card>

        <Card className={style.author}>
          <CardMedia aspectRatio='wide' image='images/soyjavi.jpg' />
          <CardTitle title="Javi Jiménez" subtitle="@soyjavi" />
          <CardText>Creative Doer · A complicated #human who builds stuff · #author · #opensource lover · #traveller · with a dark past being CEO & CTO</CardText>
          <CardActions>
            <Button href='http://github.com/soyjavi' target='_blank'><GithubIcon /> Github</Button>
            <Button href='http://twitter.com/soyjavi' target='_blank' className={style.twitter}><TwitterIcon /> Twitter</Button>
          </CardActions>
        </Card>
      </ul>
    </section>

    <footer className={style.footer}>
      <p>React Toolbox © 2016</p>
      <small>Crafted with <span className={style.love}>ღ</span> between Spain and Thailand</small>
    </footer>
  </article>
);

export default Home;
