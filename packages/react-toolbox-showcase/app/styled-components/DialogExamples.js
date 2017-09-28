import React, { Component } from 'react';
import Button from 'react-toolbox-sc/lib/Button';
import Dialog, { DialogActions, DialogBody } from 'react-toolbox-sc/lib/Dialog';

class DialogExamples extends Component {
  state = {
    active: false,
  }

  handleToggle = () => {
    this.setState({
      active: !this.state.active,
    });
  }

  render() {
    return (
      <section>
        <h5>Dialog</h5>
        <Button onClick={this.handleToggle}>Show it</Button>
        <Dialog active={this.state.active} size="small">
          <DialogBody>
            <h1>Use Google location service?</h1>
            <p>
              Let Google help apps <strong>determine location</strong>.
              This means sending anonymous location data to Google, even when no apps are running.
            </p>
          </DialogBody>
          <DialogActions>
            <Button primary onClick={this.handleToggle}>Disagree</Button>
            <Button primary onClick={this.handleToggle}>Agree</Button>
          </DialogActions>
        </Dialog>
      </section>
    );
  }
}

export default DialogExamples;
