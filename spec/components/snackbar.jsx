import React from 'react';
import Button from '../../components/button';
import Snackbar from '../../components/snackbar';

class SnackbarTest extends React.Component {

  handleSnackbarClick = (event, instance) => {
    console.log('handleSnackbarClick', event, instance);
    this.setState({ active: false });
  };

  handleSnackbarTimeout = (event, instance) => {
    console.log('handleSnackbarClick', event, instance);
    this.setState({ active: false });
  };

  handleClick = () => {
    this.setState({ active: true });
  };

  state = {
    active: false
  };

  render () {
    return (
      <section>
        <h5>Snackbars & Toasts</h5>
        <p>lorem ipsum...</p>
        <Button label='Show snackbar' primary raised onClick={this.handleClick} />
        <Snackbar
          action='Hide'
          active={this.state.active}
          icon='question-answer'
          label='Snackbar action cancel'
          timeout={2}
          onClick={this.handleSnackbarClick}
          onTimeout={this.handleSnackbarTimeout}
          type='warning'
        />
      </section>
    );
  }
}

export default SnackbarTest;
