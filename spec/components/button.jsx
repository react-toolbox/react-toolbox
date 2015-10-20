import React from 'react';
import Button from '../../components/button';

const ButtonTest = () => (
  <section>
    <h5>Buttons</h5>
    <p>lorem ipsum...</p>
    <Button type="raised" className="primary" label="Bookmark" icon="bookmark" />
    <Button type="flat" className="accent" label="Inbox" icon="inbox" />
    <Button type="floating" className="primary" icon="add" />
    <Button type="floating" className="primary" disabled icon="add" />
    <Button type="floating" className="accent mini" icon="add" />
    <Button type="flat" className="primary" icon="add" label="Add this" />
    <Button type="raised" className="primary" label="Bookmark" icon="bookmark" loading />
    <Button type="flat" disabled className="" icon="add" label="Add this" />
  </section>
);

export default ButtonTest;
