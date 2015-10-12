import React from 'react';
import Input from '../../components/input';

export default React.createClass({
  displayName: 'InputTest',

  render () {
    return (
      <section>
        <h5>Inputs</h5>
        <p>lorem ipsum...</p>
        <Input type="text" label="Firstname" icon="bookmark" />
        <Input type="email" label="Label fixed" icon="bookmark" floating={false} />
        <Input type="text" label="Phone Number" icon="bookmark" />
        <Input type="text" label="Disabled field" disabled />
      </section>
    );
  }
});
