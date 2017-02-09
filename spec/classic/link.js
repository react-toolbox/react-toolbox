import React from 'react';
import Link from '../../components/link';

const LinkTest = () => (
  <section>
    <h5>Links</h5>
    <p>lorem ipsum...</p>
    <Link label="Github" route="http://www.github.com" icon="bookmark" />
    <Link label="Inbox" route="http://mail.google.com" icon="inbox" />
  </section>
);

export default LinkTest;
