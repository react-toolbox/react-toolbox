import React from 'react';
import Button from '../../components/button';
import Snackbar from '../../components/snackbar';

class SnackbarTest extends React.Component {
  handleClick = (event, snackbar) => {
    console.log('handleClick', event, snackbar);
  };

  handleSnackbar = () => {
    this.refs.snackbar.show();
  };

  render () {
    return (
      <section>
        <h5>Snackbars & Toasts</h5>
        <p>lorem ipsum...</p>
        <Button label='Show snackbar' kind='raised' onClick={this.handleSnackbar} />
        <Snackbar
          ref='snackbar'
          action='Dismiss'
          icon='question-answer'
          label='Snackbar action cancel'
          onClick={this.handleClick}
          type='cancel'
        />
      </section>
    );
  }
}

export default SnackbarTest;
