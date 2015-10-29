import React from 'react';
import Input from '../../components/input';

const InputTest = () => (
  <section>
    <h5>Inputs</h5>
    <p>lorem ipsum...</p>
    <Input type='text' label='Firstname' />
    <Input type='email' label='Label fixed' floating={false} />
    <Input type='text' label='Phone Number' />
    <Input type='text' label='Disabled field' disabled />
    <Input type='tel' label='With icon' icon='phone' />
    <Input type='email' label='With icon' icon='email' />
  </section>
);

export default InputTest;
