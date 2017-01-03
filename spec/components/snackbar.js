import React from 'react';
import Button from '../../components/button';
import Snackbar from '../../components/snackbar';

class SnackbarTest extends React.Component {
  state = {
    active: false,
    opener: null
  };

  handleSnackbarClick = () => {
    this.setState({active: false});
  };

  handleSnackbarTimeout = () => {
    this.setState({active: false});
  };

  handleClick = (e) => {
    this.setState({active: true, opener: e.target});
  };

  render () {
    return (
      <section>
        <h5>Snackbars & Toasts</h5>
        <p>lorem ipsum...</p>
        <Button label='Show snackbar' primary raised onClick={this.handleClick} />
        <Snackbar
          action='Hide message'
          active={this.state.active}
          onClick={this.handleSnackbarClick}
          onTimeout={this.handleSnackbarTimeout}
          opener={this.state.opener}
          timeout={2000}
          type='warning'
        >
          Snackbar message. <strong>This text will be bolded</strong>
        </Snackbar>
      </section>
    );
  }
}

export default SnackbarTest;
