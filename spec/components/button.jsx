/*eslint-disable no-unused-vars*/
import React from 'react';
import Button from '../../components/button';

const ButtonTest = () => (
  <section>
    <h5>Buttons</h5>
    <p>lorem ipsum...</p>
    <Button kind="raised" primary label="Bookmark" icon="bookmark" />
    <Button kind="flat" accent label="Inbox" icon="inbox" />
    <Button kind="floating" primary icon="add" />
    <Button kind="floating" primary disabled icon="add" />
    <Button kind="floating" accent mini icon="add" />
    <Button kind="flat" primary icon="add" label="Add this" />
    <Button kind="raised" primary label="Bookmark" icon="bookmark" loading />
    <Button kind="flat" disabled icon="add" label="Add this" />
  </section>
);

export default ButtonTest;
