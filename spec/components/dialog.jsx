/* global React */

import Button from '../../components/button';
import Dialog from '../../components/dialog';

export default React.createClass({
  displayName: 'DialogTest',

  getInitialState () {
    return {
      actions: [{
        label: 'Close', type: 'flat', className:'primary', onClick: this.onClose
      }]
    };
  },

  onClose () {
    console.log('a');
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

        <Dialog
          ref='dialog'
          type='small'
          title='Your profile'
          actions={this.state.actions}
        >
          <p>Welcome to your first Dialog</p>
        </Dialog>
      </section>
    );
  }
});
