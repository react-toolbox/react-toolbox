import React from 'react';
import Button from '../../components/button';
import Snackbar from '../../components/snackbar';

export default React.createClass({

  displayName: 'ButtonTest',

  getInitialState () {
    return {
      snackbar: false,
      toast: false
    };
  },

  handleClick (event) {
    console.log('handleClick', event);
    this.setState({ active: false });
  },

  handleSnackbar () {
    this.setState({ active: true });
  },

  render () {
    return (
      <section>
        <h5>Snackbars & Toasts</h5>
        <p>lorem ipsum...</p>
        <Button label='Show snackbar' onClick={this.handleSnackbar} type='raised' />
        <Snackbar
          action={{label: 'Push', onClick: this.handleClick}}
          active={this.state.active}
          icon='question-answer'
          label='Snackbar action cancel'
          type='cancel'
        />
      </section>
    );
  }
});
