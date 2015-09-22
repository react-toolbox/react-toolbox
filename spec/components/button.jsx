/* global React */

import Button from '../../components/button';

export default React.createClass({
  displayName: 'ButtonTest',

  onClick (ref, method){
    this.refs[ref][method]();
  },

  render () {
    return (
      <section>
        <h2>Buttons</h2>
        <p>lorem ipsum...</p>
        <Button className="accent" label="Flat button" />
        <Button className="primary" type="raised" label="Raised" />
        <Button className="accent" type="raised" label="Raised" icon="assignment_turned_in" />
        <Button className="primary" type="floating" icon="add" />
        <Button className="accent mini" type="floating" icon="add" />
      </section>
    );
  }
});
