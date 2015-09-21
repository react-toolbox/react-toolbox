/* global React */

import Button from '../../components/button';
import Dialog from '../../components/dialog';

export default React.createClass({
  displayName: 'DialogTest',

  getInitialState () {
    return {
      actions: [{
        label: 'Cancel', style: 'transparent', onClick: this.onClose
      }]
    };
  },

  onClose () {
    this.refs.dialog.hide();
  },

  onShow () {
    this.refs.dialog.show();
  },

  render () {
    return (
      <section>
        <h2>Dialog</h2>
        <p>lorem ipsum...</p>
        <Button type='raised' label='Show Dialog' onClick={this.onShow} />
        <Dialog ref='dialog' type='profile' title='Your profile' className='small' actions={this.state.actions}>
          <p>Welcome to your first Dialog</p>
        </Dialog>
      </section>
    );
  }
});
