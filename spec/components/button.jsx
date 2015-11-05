import React from 'react';
import Button from '../../components/button';

const ButtonTest = () => (
  <section>
    <h5>Buttons</h5>
    <p>lorem ipsum...</p>
    <Button kind='raised' primary label='Bookmark' icon='bookmark' tooltip='Bookmark Tooltip' />
    <Button kind='flat' accent label='Inbox' icon='inbox' />
    <Button kind='floating' primary icon='add' tooltip='Floating Tooltip' />
    <Button kind='floating' primary disabled icon='add' tooltip='Floating can not show' />
    <Button kind='floating' accent mini icon='add' />
    <Button kind='flat' primary icon='add' label='Add this' />
    <Button kind='raised' primary label='Bookmark' icon='bookmark' loading />
    <Button kind='flat' disabled icon='add' label='Add this' />
  </section>
);

export default ButtonTest;
