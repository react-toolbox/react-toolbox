import React from 'react';
import Button from '../../components/button';
import Snackbar from '../../components/snackbar';

class SnackbarTest extends React.Component {
  state = {
    active: false
  };

  handleSnackbarClick = () => {
    this.setState({active: false});
  };

  handleSnackbarTimeout = () => {
    this.setState({active: false});
  };

  handleClick = () => {
    this.setState({active: true});
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
          timeout={2000}
          onClick={this.handleSnackbarClick}
          onTimeout={this.handleSnackbarTimeout}
          type='warning'
        >
          Snackbar action <strong>cancel</strong>
        </Snackbar>
      </section>
    );
  }
}

export default SnackbarTest;
