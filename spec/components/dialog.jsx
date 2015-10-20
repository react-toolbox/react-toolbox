import React from 'react';
import Button from '../../components/button';
import Dialog from '../../components/dialog';

export default class DialogTest extends React.Component {
  state = {
    title: 'Use Google\'s location service?',
    actions: [
      { label: 'Disagree', type: 'flat', className: 'primary', onClick: ::this.onClose },
      { label: 'Agree', type: 'flat', className: 'primary', onClick: ::this.onClose }]
  };

  onClose () {
    this.refs.dialog.hide();
  }

  onShow () {
    this.refs.dialog.show();
  }

  render () {
    return (
      <section>
        <h5>Dialog</h5>
        <p>lorem ipsum...</p>
        <Button type='raised' label='Show Dialog' onClick={::this.onShow} />
        <Dialog ref='dialog' type='small' title={this.state.title} actions={this.state.actions}>
          <p>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</p>
        </Dialog>
      </section>
    );
  }
};
